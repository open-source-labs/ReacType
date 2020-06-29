const express = require('express');
const https = require('https');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');
const { session } = require('electron');
const app = express();
const PORT = 8080;

// connect to mongo db
mongoose
  .connect(process.env.MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    // stop deprecation warning for findOneAndUpdate and findOneAndDelete queries
    useFindAndModify: false,
    // sets the name of the DB that our collections are part of
    dbName: 'ReacType'
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

// handle parsing request body
app.use(express.json());
// cookie parser
app.use(cookieParser());

// statically serve everything in build folder
app.use('/', express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.post(
  '/signup',
  userController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    return res.status(200).json({ sessionId: res.locals.ssid });
  }
);

app.post(
  '/login',
  userController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    return res.status(200).json({ sessionId: res.locals.ssid });
  }
);

app.post(
  '/saveProject',
  sessionController.isLoggedIn,
  userController.saveProject,
  (req, res) => {
    return res.status(200).json(res.locals.savedProject);
  }
);

app.get(
  '/getProjects',
  sessionController.isLoggedIn,
  userController.getProjects,
  (req, res) => {
    return res.status(200).json(res.locals.projects);
  }
);

app.get('/github/callback', sessionController.startSession, (req, res) => {
  return res.status(200);
});

// catch-all route handler
app.use('*', (req, res) => {
  return res.status(404).send('Page not found');
});

// Global error handler
app.use((err, req, res, next) => {
  console.log('invoking global error handler');
  const defaultErr = {
    log: 'Express error handler caught unknown middleware',
    status: 500,
    message: { err: 'An error occurred' }
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//starts server on PORT
// app.listen(PORT, () => {
//   console.log(`Server listening on port: ${PORT}`)
// })

// For security, if serving app from a server, it should be https
// https working now, but still needs nodeIntegration on to work <- Electron throws security issue warning because of this

https
  .createServer(
    {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt'))
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
