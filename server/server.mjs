// const { ApolloServer } = require('@apollo/server');//changed for v4
import { ApolloServer } from '@apollo/server';

//v4 Apollo imports
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
const {json, urlencoded} = bodyParser;

//possibly redundant
// const {makeExecutableSchema} = require('@graphql-tools/schema');
import { makeExecutableSchema } from '@graphql-tools/schema';

// const express = require('express');
// const cookieParser = require('cookie-parser');
import express from 'express';
import cookieParser from 'cookie-parser';

//const passport = require('passport');
//const GitHubStrategy = require('passport-github2').Strategy;

// const { DEV_PORT } = require('../config');
import DEV_PORT from '../config.js';

// const path = require('path');
import path from 'path';

// const userController = require('./controllers/userController');
// const cookieController = require('./controllers/cookieController');
// const sessionController = require('./controllers/sessionController');
// const projectController = require('./controllers/projectController');

import userController from './controllers/userController.js';
import cookieController from './controllers/cookieController.js';
import sessionController from './controllers/sessionController.js';
import projectController from './controllers/projectController.js';

// docker stuff
import { fileURLToPath } from 'url';
import { dirname } from 'path';


// env file
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const PORT = process.env.PORT || DEV_PORT;
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());

// Routes
// const stylesRouter = require('./routers/stylesRouter');
import stylesRouter from './routers/stylesRouter.js';

// enable cors
// options: origin: allows from localhost when in dev or the app://rse when using prod, credentials: allows credentials header from origin (needed to send cookies)
app.use(
  cors({
    origin: [`http://localhost:8080`, 'app://rse'],
    credentials: true
  })
);

// TODO: github Oauth still needs debugging
// on initial login, redirect back to app is not working correctly when in production environment
// subsequent logins seem to be working fine, however

// NOTE from v13.0 team: GitHub OAuth works fine in Electron production app and the backend for Electron production app is deployed on Heroku at https://reactype-caret.herokuapp.com/ (get credentials from instructor )

// V.15 Team: Github Oauth and Google Oauth works! (starts here)
// const passport = require('passport');
import passport from 'passport';
// const passportSetup = require('./routers/passport-setup.js')
import passportSetup from './routers/passport-setup.js'
// const session = require('express-session');
import session from 'express-session'
// const authRoutes = require('./routers/auth.js')
import authRoutes from './routers/auth.js'

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24*60*60*1000 }
}))

app.use(passport.initialize());
app.use(passport.session());

// go to other files
// 8080 only for the container
app.use('/auth', authRoutes)

// attempt at websockets
// const httpServer = require('http').createServer(app);
import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer(app)
// const io = require('socket.io')(httpServer)
const io = new Server(httpServer, {
  transports: ['websocket'],
  cors: {
    origin: ['http://localhost:5656', 'http://localhost:8080']
  }
})

io.on('connection', socket => {
  console.log(socket.id)
  socket.on('custom-event', (string, redux_store) => {
    console.log(string)
    console.log(redux_store)
    socket.broadcast.emit('receive message', redux_store)
  });

  socket.on('error', (error) => {
    console.error(`Socket error: ${error}`);
  });
})



// for Oauth which is currently not working
// app.get(
//   '/github/callback',
//   sessionController.gitHubResponse,
//   sessionController.gitHubSendToken,
//   userController.createUser,
//   userController.verifyUser,
//   cookieController.setSSIDCookie,
//   sessionController.startSession,
//   (req, res) => {
//     if (isDev) {
//       return res
//         .status(200)
//         .redirect(`http://localhost:8080?=${res.locals.ssid}`);
//     } else {
//       return res.status(200).redirect(`app://rse?=${res.locals.ssid}`);
//     }
//   }
// );

// app.get('/github/callback', passport.authenticate('github'), function(
//   req,
//   res
// ) {
//   console.log(req.user);
//   res.redirect('http://localhost:8080');
// });

/*
GraphQl Router
*/
/* ******************************************************************* */

// Query resolvers
// const Query = require('./graphQL/resolvers/query');
import Query from './graphQL/resolvers/query.js';
// const {Query} = query;

// Mutation resolvers
// const Mutation = require('./graphQL/resolvers/mutation');
import Mutation from './graphQL/resolvers/mutation.js';
// const {Mutation} = mutation;

// package resolvers into one variable to pass to Apollo Server
const resolvers = {
  Query,
  Mutation
};

// app.use(
//   '/demoRender',
//   express.static(path.join(__dirname, './assets/renderDemo.css'))
// );

// Re-direct to route handlers:
app.use('/user-styles', stylesRouter);

// schemas used for graphQL

// const typeDefs = require('./graphQL/schema/typeDefs.js');
import typeDefs from './graphQL/schema/typeDefs.js';

// const { dirname } = require('node:path');

// instantiate Apollo server and attach to Express server, mounted at 'http://localhost:PORT/graphql'

//use make exacutable schema to allow schema to be passed to new server
const schema = makeExecutableSchema({typeDefs, resolvers});

const server = new ApolloServer({schema});
//V3 syntax
// (async function() {
//   await server.start()
//   server.applyMiddleware({ app, path: '/graphql' });
// }());

//v4 syntax
await server.start()
app.use(
  '/graphql',
  cors(),
  json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

/** ****************************************************************** */

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
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => res.status(200).json({ sessionId: res.locals.ssid })
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
// serve index.html on the route '/'
const isDocker = process.env.IS_DOCKER === 'true';
console.log('this is running on docker: ', isDocker)

//if in production mode, statically serve everything in the build folder on the route '/dist'
if (process.env.NODE_ENV == 'production'){
  app.use('/dist', express.static(path.join(__dirname, '/app/dist')))
}

app.get('/', (req, res) => {
  const indexPath = isDocker
    ? path.join(__dirname, '../index-prod.html')
    : path.join(__dirname, '../index.html');
  return res.status(200).sendFile(indexPath);
});

app.get('/bundle.js', (req, res) => {
  return res.status(200).sendFile(path.join(process.cwd(), 'bundle.js'));
})

if (isDocker){
  app.get('/main.css', (req, res) => {
    return res.status(200).sendFile(path.join(process.cwd(), 'main.css'));
  })
}

app.get('/test', (req, res) => {
  res.send('test request is working');
})

// only for testing purposes in the dev environment
// app.get('/', function(req, res) {
//   res.send('Houston, Caret is in orbit!');
// });

app.use('http://localhost:8080/*', (req, res) => {
  res.status(404).send('not a valid page (404 page)')
})
// catch-all route handler
app.use('/*', (req, res) => res.status(404).send('Page not found'));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware',
    status: 500,
    message: { err: 'An error occurred' }
  };

  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

// starts server on PORT
httpServer.listen(5656, () => console.log(`Server listening on port: ${PORT.DEV_PORT}`))

if (isTest) module.exports = app;
// export default app;
