// middleware functions create a new user and verify users

const Users = require('../models/userModel');

const userController = {};
const bcrypt = require('bcryptjs');

userController.createUser = (req, res, next) => {
  console.log('Creating user...');
  const { email, username, password } = req.body;
  // error handling if username or password is missing
  if (!username) {
    return res.status(400).json('No username input');
  }
  if (!email) {
    return res.status(400).json('No email input');
  }
  if (!password) {
    return res.status(400).json('No password input');
  }

  // create user using username and password
  Users.create({ email, username, password, projects: [] }, (err, newUser) => {
    if (err) {
      return next({
        log: `Error in userController.createUser: ${err}`,
        message: {
          err: `Error in userController.createUser. Check server logs for details`
        }
      });
    } else {
      // this id property will be used in other middleware for cookie
      console.log('Successful createUser');
      res.locals.id = newUser.id;
      return next();
    }
  });
};

// verifyUser - Obtain username and password from the request body, locate
// the appropriate user in the database, and then authenticate the submitted password against the password stored in the database.

userController.verifyUser = (req, res, next) => {
  console.log('Verifying user...');
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).json('No username input');
  }
  if (!password) {
    return res.status(400).json('No password input');
  }
  Users.findOne({ username }, (err, user) => {
    if (err) {
      return next({
        log: `Error in userController.verifyUser: ${err}`,
        message: {
          err: `Error in userController.verifyUser, check server logs for details`
        }
      });
    } else if (user) {
      // bcrypt compare function checks input password against hashed password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // if password matches, save user id for following middleware
          console.log('Successful verifyUser');
          res.locals.id = user.id;
          return next();
        } else {
          // if password does not match, redirect to ?
          return res.status(400).json('Incorrect password');
        }
      });
    } else {
      return res.status(400).json('No such user found');
    }
  });
};

module.exports = userController;
