// middleware functions create a new user and verify users
const { Users } = require('../models/reactypeModels');

const userController = {};
const bcrypt = require('bcryptjs');

const randomPassword = () => {
  function getRandomSpecialChar() {
    const code = Math.round(Math.random() * (38 - 37) + 37);
    return String.fromCharCode(code);
  }
  function getRandomDigit() {
    const code = Math.round(Math.random() * (57 - 48) + 48);
    return String.fromCharCode(code);
  }
  function getRandomLetter() {
    const code = Math.round(Math.random() * (90 - 65) + 65);
    return String.fromCharCode(code);
  }
  let password = '';
  for (let i = 0; i < 6; i += 1) {
    password += getRandomLetter() + getRandomDigit() + getRandomSpecialChar(); 
  }
  return password;
}

userController.createUser = (req, res, next) => {
  
  let { email, username, password } = req.body;
  if (res.locals.signUpType === 'oauth') {
    email = res.locals.githubEmail; 
    username = email;
    password = randomPassword();
  } 
  // error handling if username or password is missing
  // TODO: make this more vague for security purposes

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
  Users.create({ username, password, email }, (err, newUser) => {
    if (err) {
      if (err.keyValue.email && res.locals.signUpType === 'oauth') {
        return next();
      }
      if (err.keyValue.email) {
        return res.status(400).json('Email Taken');
      }
      if (err.keyValue.username && res.locals.signUpType === 'oauth') {
        res.locals.githubPassword = password;
        return next();
      }
      if (err.keyValue.username) {
        return res.status(400).json('Username Taken');
      }
      return next({
        log: `Error in userController.createUser: ${err}`,
        message: {
          err: `Error in userController.createUser. Check server logs for details`,
        },
      });
    } else {
      // this id property will be used in other middleware for cookie
      res.locals.id = newUser.id;
      return next();
    }
  });
};

// verifyUser - Obtain username and password from the request body, locate
// the appropriate user in the database, and then authenticate the submitted password against the password stored in the database.

userController.verifyUser = (req, res, next) => {
  let { username, password, isFbOauth } = req.body;
  if (res.locals.signUpType === 'oauth') {
    username = res.locals.githubEmail;
    password = res.locals.githubPassword;
  }
  if (!username) {
    return res.status(400).json('No Username Input');
  }
  if (!password) {
    return res.status(400).json('No Password Input');
  }
  Users.findOne({ username }, (err, user) => {
    if (err) {
      return next({
        log: `Error in userController.verifyUser: ${err}`,
        message: {
          err: `Error in userController.verifyUser, check server logs for details`,
        },
      });
    } 
    else if (user && (res.locals.signUpType === 'oauth' || isFbOauth)) {
      res.locals.id = user.id;
      return next();
    } 
    else if (user) {
      // bcrypt compare function checks input password against hashed password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // if password matches, save user id for following middleware
          res.locals.id = user.id;
          return next();
        } else {
          return res.status(400).json('Incorrect Password');
        }
      });
    } else {
      return res.status(400).json('Invalid Username');
    }
  });
};

// userController.doesUserExist = (req, res, next) => {
//   const { email } = req.body;
//   Users.findOne({ email }, (err, user) => {
//     if (err) return next({
//       log: `Error in userController.doesUserExist: ${err}`,
//         message: {
//           err: `Error in userController.doesUserExist, check server logs for details`,
//         },
//     });
//     else if(!user) {
//       console.log('email NOT found', user);
//       res.locals.userExists = false;
//       return next();
//     } 
//     else {
//       console.log('email found', user);
//       res.locals.userExists = true;
//       return next();
//     }
//   })
// }

// userController.isOauth = (req, res, next) => {
//   const { signUpType } = res.localsbody;
//   if (signUpType === 'oauth'){
//     return next();
//   } else {
//     return next();
//   }
// }

module.exports = userController;
