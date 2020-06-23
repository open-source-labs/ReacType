const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 8080;

// handle parsing request body
app.use(express.json());
// cookie parser
app.use(cookieParser());

// statically serve everything in build folder
app.use('/', express.statice(path.resolve(__dirname, '../build')));

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
