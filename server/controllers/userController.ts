// middleware functions create a new user and verify users
import { Users } from '../models/reactypeModels';
import bcrypt from 'bcryptjs';
import { newUserError, UserController } from '../interfaces';

/**
 * Generates a random password.
 * 
 * @returns {string} A randomly generated password.
 */
const randomPassword = (): string => {
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
};

const userController: UserController = {
  /**
   * Middleware function to get user details.
   *
   * @callback GetUserMiddleware
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function in the stack.
   * @returns {Promise<void>}
   */
  getUser: async (req, res, next): Promise<void> => {
    try {
      const { username } = req.body;
      const user = await Users.findOne({ username });
      res.locals.user = user;
      return next();
    } catch (err) {
      return next({
        log: 'error caught in getUsername middleware',
        status: 400,
        message: { err: 'cannot get username' }
      });
    }
  },

  /**
   * Middleware function to create a new user.
   *
   * @callback CreateUserMiddleware
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function in the stack.
   * @returns {void | import('express').Response} Returns void or an Express Response object.
   */
  createUser: (req, res, next): void | import('express').Response => {
    let email, username, password;
    // use this condition for Oauth login
    if (res.locals.signUpType === 'oauth') {
      email = res.locals.githubEmail;
      username = email;
      password = randomPassword();
      res.locals.githubPassword = password;
    } else {
      ({ email, username, password } = req.body);
    }

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
    Users.create(
      { username, password, email },
      (err: newUserError, newUser) => {
        // handle error of creating a new user
        if (err) {
          if (res.locals.signUpType === 'oauth') {
            return next();
          }
          if (err.keyValue?.email) {
            return res.status(400).json('Email Taken');
          }
          if (err.keyValue?.username && res.locals.signUpType === 'oauth') {
            res.locals.githubPassword = password;
            return next();
          }
          if (err.keyValue?.username) {
            return res.status(400).json('Username Taken');
          }
          return next({
            log: `Error in userController.createUser: ${err}`,
            message: {
              err: 'Error in userController.createUser. Check server logs for details'
            }
          });
        }
        // if no error found when creating a new user, send back user ID in res.locals
        res.locals.id = newUser.id;
        // send back username to store on cookies for forking projects
        res.locals.username = username;
        return next();
      }
    );
  },

  /**
   * Middleware function to verify user credentials.
   * Obtain username and password from the request body, then locates the appropriate user in the database.
   * Then authenticates the submitted password against the password stored in the database.
   *
   * @callback VerifyUserMiddleware
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function in the stack.
   * @returns {void | import('express').Response} Returns void or an Express Response object.
   */
  verifyUser: (req, res, next): void | import('express').Response => {
    let { username, password, isFbOauth } = req.body;
    // handle Oauth
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
            err: `Error in userController.verifyUser, check server logs for details`
          }
        });
      }
      if (user && (res.locals.signUpType === 'oauth' || isFbOauth)) {
        res.locals.id = user.id;
        return next();
      }
      if (user) {
        // bcrypt compare function checks input password against hashed password
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (isMatch) {
            // if password matches, save user id for following middleware
            res.locals.id = user.id;
            res.locals.username = username;
            return next();
          }
          // if hashed password is not matched saved password in db, send 400 response
          return res.status(400).json('Incorrect Password');
        });
      } else {
        return res.status(400).json('Invalid Username');
      }
    });
  },

  /**
   * Middleware function to update user password.
   *
   * @callback UpdatePasswordMiddleware
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function in the stack.
   * @returns {Promise<void | import('express').Response>} Returns a promise resolving to void or an Express Response object.
   */
  updatePassword: async (
    req,
    res,
    next
  ): Promise<void | import('express').Response> => {
    try {
      if (!req.body.password) {
        return res.status(400).json({ error: 'Password is required.' });
      }
      const user = await Users.findOne({ username: res.locals.user.username });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      const isSame = await bcrypt.compare(req.body.password, user.password);
      if (isSame) {
        return res.status(400).json({
          error: 'New password must be different from the current password.'
        });
      }
      const salt = await bcrypt.genSalt(10); // generate a salt
      const encryptedPW = await bcrypt.hash(req.body.password, salt); // encrypt the password
      const updatedUser = await Users.findOneAndUpdate(
        { username: res.locals.user.username },
        { password: encryptedPW },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: 'User update failed.' });
      }
      res.locals.id = updatedUser._id;
      return next();
    } catch (err) {
      return next({
        log: 'error caught in updatePassword middleware',
        status: 400,
        message: { err: 'Cannot update password' }
      });
    }
  }
};

export default userController;
