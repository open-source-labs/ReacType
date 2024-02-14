const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
import cors from 'cors';
import bodyParser from 'body-parser';
const { json, urlencoded } = bodyParser;
const { makeExecutableSchema } = require('@graphql-tools/schema');
import express from 'express';
import cookieParser from 'cookie-parser';
import config from '../config.js';
const { API_BASE_URL, DEV_PORT } = config;
import path from 'path';
import userController from './controllers/userController';
import cookieController from './controllers/cookieController';
import sessionController from './controllers/sessionController';
import projectController from './controllers/projectController';
import marketplaceController from './controllers/marketplaceController';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const RL1 = {
  asd: { 'cnlw8UmsqIHXaM-CAAAD': 'asd', '0NRthNygM3s6WL_ZAAAH': 'asdf' }
};

const app = express();

const PORT = process.env.PORT || DEV_PORT;
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());

import stylesRouter from './routers/stylesRouter';

// options: origin: allows from localhost when in dev or the app://rse when using prod, credentials: allows credentials header from origin (needed to send cookies)
app.use(
  cors({
    origin: [`http://localhost:8080`, 'app://rse', API_BASE_URL],
    credentials: true
  })
);

// TODO: github Oauth still needs debugging
// on initial login, redirect back to app is not working correctly when in production environment
// subsequent logins seem to be working fine, however

// NOTE from v13.0 team: GitHub OAuth works fine in Electron production app and the backend for Electron production app is deployed on Heroku at https://reactype-caret.herokuapp.com/ (get credentials from instructor )

// V.15 Team: Github Oauth and Google Oauth works! (starts here)
const passport = require('passport');
const passportSetup = require('./routers/passport-setup');
const session = require('express-session');
import authRoutes from './routers/auth';

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

import { createServer } from 'http';
import { Server } from 'socket.io';

//creating an HTTP server and setting up socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  transports: ['websocket'],
  cors: {
    origin: ['http://localhost:5656', 'http://localhost:8080', API_BASE_URL]
  }
});

const roomLists = {};

io.on('connection', (client) => {
  client.on(
    'creating a room',
    async (
      userName: string,
      roomCode: string,
      roomPassword: string,
      method: string
    ) => {
      try {
        let userList,
          hostID,
          correctPassword = false;

        if (roomLists[roomCode] && method === 'CREATE') {
          io.emit('room is already taken');
          return;
        }

        if (!roomLists[roomCode] && method === 'CREATE') {
          roomLists[roomCode] = {};
          roomLists[roomCode][client.id] = { userName, password: roomPassword };

          userList = Object.keys(roomLists[roomCode]);
          hostID = userList[0];

          console.log('rooms', roomLists);

          io.emit('user created a new room');
        } else if (method === 'JOIN') {
          userList = Object.keys(roomLists[roomCode]);
          hostID = userList[0];

          if (roomLists[roomCode][hostID].password === roomPassword) {
            roomLists[roomCode][client.id] = {
              userName,
              password: roomPassword
            };

            correctPassword = true;
            io.emit('correct password');
          } else {
            io.emit('wrong password');
          }
        }

        const newClientID = userList[userList.length - 1];
        const hostState = await io
          .timeout(5000)
          .to(hostID) // sends only to host
          .emitWithAck('requesting state from host');

        const newClientResponse = await io
          .timeout(5000)
          .to(newClientID) // sends only to new client
          .emitWithAck('server emitting state from host', hostState[0]);

        if (newClientResponse[0].status === 'confirmed') {
          client.join(roomCode); //client joining a room
          io.to(roomCode).emit(
            'updateUserList',
            Object.values(roomLists[roomCode]) // send updated userList to all users in room
          );
        }

        io.to(roomCode).emit('new chat message', {
          userName,
          message: `${userName} left chat room`,
          type: 'activity'
        });
      } catch (error) {
        console.log(
          'Request Timeout: Client failed to request state from host.',
          error
        );
      }
    }
  );

  client.on('mouse connection', (data) => {
    io.emit('mouseCursor', { line: data.line, id: client.id });
  });

  //disconnecting functionality
  client.on('disconnecting', () => {
    const roomCode = Array.from(client.rooms)[1]; //grabbing current room client was in when disconnecting
    const userName = roomLists[roomCode][client.id];
    delete roomLists[roomCode][client.id];
    //if room empty, delete room from room list
    if (!Object.keys(roomLists[roomCode]).length) {
      delete roomLists[roomCode];
    } else {
      //else emit updated user list
      io.to(roomCode).emit('updateUserList', {
        userList: Object.values(roomLists[roomCode])
      });
      io.to(roomCode).emit('new chat message', {
        userName,
        message: `${userName} left chat room`,
        type: 'activity'
      });
    }
  });

  client.on('addChildAction', (roomCode: string, childData: object) => {
    if (roomCode) {
      client.to(roomCode).emit('child data from server', childData);
    }
  });

  client.on('changeFocusAction', (roomCode: string, focusData: object) => {
    if (roomCode) {
      //server send the focus data to everyone in room
      client.to(roomCode).emit('focus data from server', focusData);
    }
  });

  client.on('deleteChildAction', (roomCode: string, deleteData: object) => {
    //console.log('delete data received on server', deleteData);
    if (roomCode) {
      // server send delete data to everyone in room
      client.to(roomCode).emit('delete data from server', deleteData);
    }
  });

  client.on('clearCanvasAction', async (roomCode: string, userName: string) => {
    if (roomCode) {
      // server send clear canvas to everyone in the room if action is from the host
      if (userName === Object.values(roomLists[roomCode])[0]) {
        io.to(roomCode).emit(
          'clear canvas from server',
          Object.values(roomLists[roomCode])
        );
      }
    }
  });

  client.on(
    'deleteElementAction',
    (roomCode: string, deleteElementData: object) => {
      if (roomCode) {
        client
          .to(roomCode)
          .emit('delete element data from server', deleteElementData);
      }
    }
  );

  client.on('updateChildAction', (roomCode: string, updateData: object) => {
    if (roomCode) {
      // server send update data to everyone in room
      client.to(roomCode).emit('update data from server', updateData);
    }
  });

  client.on('updateCSSAction', (roomCode: string, cssData: object) => {
    if (roomCode) {
      // server send updated css to everyone in room
      client.to(roomCode).emit('update css data from server', cssData);
    }
  });

  client.on(
    'changePositionAction',
    (roomCode: string, itemPositionData: object) => {
      if (roomCode) {
        // server send item position to everyone in room
        client
          .to(roomCode)
          .emit('item position data from server', itemPositionData);
      }
    }
  );

  client.on('addComponentAction', (roomCode: string, newComponent: object) => {
    if (roomCode) {
      // server send new component to everyone in room
      client.to(roomCode).emit('new component data from server', newComponent);
    }
  });

  client.on('addElementAction', (roomCode: string, newElement: object) => {
    if (roomCode) {
      // server send new element to everyone in room
      client.to(roomCode).emit('new element data from server', newElement);
    }
  });

  client.on('addStateAction', (roomCode: string, componentState: object) => {
    if (roomCode) {
      // server send new component state to everyone in room
      client
        .to(roomCode)
        .emit('new component state data from server', componentState);
    }
  });

  client.on(
    'deleteStateAction',
    (roomCode: string, componentStateDelete: object) => {
      if (roomCode) {
        // server send delete component data to everyone in room
        client
          .to(roomCode)
          .emit(
            'delete component state data from server',
            componentStateDelete
          );
      }
    }
  );

  client.on(
    'addPassedInPropsAction',
    (roomCode: string, passedInProps: object) => {
      if (roomCode) {
        // server send new p.I.P. to everyone in room
        client
          .to(roomCode)
          .emit('new PassedInProps data from server', passedInProps);
      }
    }
  );

  client.on(
    'deletePassedInPropsAction',
    (roomCode: string, passedInPropsDelete: object) => {
      if (roomCode) {
        // server send delete p.I.P data to everyone in room
        client
          .to(roomCode)
          .emit('PassedInProps delete data from server', passedInPropsDelete);
      }
    }
  );

  client.on('addContextAction', (roomCode: string, context: object) => {
    if (roomCode) {
      // server send new context to everyone in room
      client.to(roomCode).emit('new context from server', context);
    }
  });

  client.on(
    'addContextValuesAction',
    (roomCode: string, contextVal: object) => {
      if (roomCode) {
        // server send new context value to everyone in room
        client.to(roomCode).emit('new context value from server', contextVal);
      }
    }
  );

  client.on(
    'deleteContextAction',
    (roomCode: string, contextDelete: object) => {
      if (roomCode) {
        // server send delete context data to everyone in room
        client
          .to(roomCode)
          .emit('delete context data from server', contextDelete);
      }
    }
  );

  client.on('assignContextActions', (roomCode: string, data: object) => {
    if (roomCode) {
      // server send assign context data to everyone in room
      client.to(roomCode).emit('assign context data from server', data);
    }
  });

  //remote cursor
  client.on('cursorData', (roomCode: string, remoteData: object) => {
    // server send updated cursor data to everyone in room
    client.to(roomCode).emit('remote cursor data from server', remoteData);
  });
});

import Query from './graphQL/resolvers/query';
import Mutation from './graphQL/resolvers/mutation';

const resolvers = {
  Query,
  Mutation
};

// Re-direct to route handlers:
app.use('/user-styles', stylesRouter);

import typeDefs from './graphQL/schema/typeDefs';

// instantiate Apollo server and attach to Express server, mounted at 'http://localhost:PORT/graphql'

//use make exacutable schema to allow schema to be passed to new server
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.post(
  '/signup',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => res.status(200).json({ sessionId: res.locals.ssid })
);

app.post(
  '/login',
  userController.verifyUser,
  userController.getUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => res.status(200).json({ sessionId: res.locals.ssid })
);
//confirming whether user is logged in for index.tsx rendering
app.get('/loggedIn', sessionController.isLoggedIn, (req, res) =>
  res.status(200).json(res.locals.loggedIn)
);

app.get(
  '/logout',
  cookieController.deleteCookies,
  sessionController.endSession,
  (req, res) => res.status(200).json(res.locals.deleted)
);

// user must be logged in to get or save projects, otherwise they will be redirected to login page
app.post(
  '/saveProject',
  sessionController.isLoggedIn,
  projectController.saveProject,
  (req, res) => res.status(200).json(res.locals.savedProject)
);

app.post(
  '/getProjects',
  sessionController.isLoggedIn,
  projectController.getProjects,
  (req, res) => res.status(200).json(res.locals.projects)
);

app.delete(
  '/deleteProject',
  sessionController.isLoggedIn,
  projectController.deleteProject,
  (req, res) => res.status(200).json(res.locals.deleted)
);

//Publish to Marketplace
app.post(
  '/publishProject',
  sessionController.isLoggedIn,
  marketplaceController.publishProject,
  (req, res) => res.status(200).json(res.locals.publishedProject)
);

//Unpublish from Marketplace
app.patch(
  '/unpublishProject',
  sessionController.isLoggedIn,
  marketplaceController.unpublishProject,
  (req, res) => res.status(200).json(res.locals.unpublishedProject)
);

//Get from Marketplace
app.get(
  '/getMarketplaceProjects',
  // sessionController.isLoggedIn, //Maybe don't need to check if they have a session since guests should still see?
  marketplaceController.getPublishedProjects,
  (req, res) => res.status(200).json(res.locals.publishedProjects)
);

// Clone from marketplace
app.get(
  '/cloneProject/:docId',
  sessionController.isLoggedIn,
  marketplaceController.cloneProject,
  (req, res) => res.status(200).json(res.locals.clonedProject)
);

// serve index.html on the route '/'
const isDocker = process.env.IS_DOCKER === 'true';
console.log('this is running on docker: ', isDocker);

//if in production mode, statically serve everything in the build folder on the route '/dist'
if (process.env.NODE_ENV == 'production') {
  app.use('/dist', express.static(path.join(__dirname, '/app/dist')));
}

app.get('/', (req, res) => {
  const indexPath = isDocker
    ? path.join(__dirname, '../index-prod.html')
    : path.join(__dirname, '../index.html');
  return res.status(200).sendFile(indexPath);
});

app.get('/bundle.js', (req, res) => {
  return res.status(200).sendFile(path.join(process.cwd(), 'bundle.js'));
});

if (isDocker) {
  app.get('/main.css', (req, res) => {
    return res.status(200).sendFile(path.join(process.cwd(), 'main.css'));
  });
}

app.get('/test', (req, res) => {
  res.send('test request is working');
});

app.use('/*', (req, res) => res.status(404).send('Page not found'));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware',
    status: 500,
    message: { err: 'An error occurred' }
  };

  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj);
});

// starts server on PORT
if (!isTest) {
  httpServer.listen(5656, () =>
    console.log(`Server listening on port: ${DEV_PORT}`)
  );
}

// if (isTest) module.exports = app;
export default app;
