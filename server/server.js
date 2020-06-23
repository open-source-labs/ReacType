const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController')
const cookieController = require('./controllers/cookieController')
const app = express();
const PORT = 8080;

// connect to mongo db
mongoose
  .connect(process.env.MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
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
app.use('/build', express.static(path.resolve(__dirname, '../build')));

// app.get('/', cookieController.setCookie, (req, res) => {
//   res.status(200).sendFile('../build/index.html');
// })

app.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).json(res.locals.newUser)
})

app.post('/login', userController.verifyUser, (req, res) => {
  return res.status(200).json(res.locals.id)
})

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

// starts server on PORT
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
