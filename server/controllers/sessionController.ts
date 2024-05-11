import fetch from 'node-fetch';
import { Sessions } from '../models/reactypeModels';
import dotenv from 'dotenv';
import { SessionController, SessionCookie } from '../interfaces';

dotenv.config();
// here we are cheching that the user making the request is login in and has a valid cookieId
const sessionController: SessionController = {
  /**
   * Middleware function to check if the user is logged in.
   *
   * @callback IsLoggedInMiddleware
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function in the stack.
   * @returns {Promise<void>}
   */
  isLoggedIn: async (req, res, next): Promise<void> => {
    // if (process.env.NODE_ENV === 'test') {
    //   // Skip authentication checks in test environment
    //   return next();
    // } else {
    try {
      let cookieId;
      if (req.cookies) {
        // if the request cookies exist then it assigns it to cookieId
        cookieId = req.cookies.ssid;
      } else {
        // else it creates a new cookieId for the user based on the userId
        cookieId = req.body.userId;
      }
      // find session from request session ID in mongodb
      const session = await Sessions.findOne({ cookieId });
      if (!session) {
        res.locals.loggedIn = false;
        return next();
      }
      res.locals.loggedIn = true;
      return next();
    } catch (err) {
      return next({
        log: `Error in sessionController.isLoggedIn: ${err}`,
        message: {
          err: 'Error in sessionController.isLoggedIn, check server logs for details'
        }
      });
    }
  },

  /**
   * Middleware function to create and save a new session into the database.
   *
   * @callback StartSessionMiddleware
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function in the stack.
   * @returns {void}
   */
  startSession: (req, res, next): void => {
    // first check if user is logged in already
    Sessions.findOne({ cookieId: res.locals.id || req.user.id }, (err, ses) => {
      if (err) {
        return next({
          log: `Error in sessionController.startSession find session: ${err}`,
          message: {
            err: 'Error in sessionController.startSession find session, check server logs for details'
          }
        });
        // if session doesn't exist, create a session
        // if valid user logged in/signed up, res.locals.id should be user's id generated from mongodb, which we will set as this session's cookieId
      }
      if (!ses) {
        Sessions.create(
          //checking if logged in via the login form (res.locals.id) or oauth(req.user.id)
          { cookieId: res.locals.id || req.user.id },
          (error, session: SessionCookie) => {
            if (error) {
              return next({
                log: `Error in sessionController.startSession create session: ${error}`,
                message: {
                  err: 'Error in sessionController.startSession create session, check server logs for details'
                }
              });
            }
            res.locals.ssid = session.cookieId;
            return next();
          }
        );
        // if session exists, move onto next middleware
      } else {
        res.locals.ssid = ses.cookieId;
        return next();
      }
    });
  },

  /**
   * Middleware function to end the current session.
   *
   * @callback EndSessionMiddleware
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - The next middleware function in the stack.
   * @returns {void}
   */
  endSession: (req, res, next): void => {
    //finding then deleting the session
    Sessions.findOneAndDelete(
      { cookieId: req.cookies.ssid },
      null,
      (err, deleted) => {
        if (err) {
          return next({
            log: `Error in sessionController.endSession: ${err}`,
            message: {
              err: 'Error in sessionController.endSession, check server logs for details'
            }
          });
        }
        res.locals.deleted = deleted;
        return next();
      }
    );
  }

  //don't think this code is used DW17
  // gitHubResponse: (req, res, next) => {
  //   const { code } = req.query;
  //   if (!code) {
  //     console.log('code not found');
  //     return next({
  //       log: 'Undefined or no code received from github.com',
  //       message: 'Undefined or no code received from github.com',
  //       status: 400
  //     });
  //   }
  //   fetch(
  //     `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_ID}&client_secret=${process.env.GITHUB_SECRET}&code=${code}`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         accept: 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         client_id: process.env.GITHUB_ID,
  //         client_secret: process.env.GITHUB_SECRET,
  //         code: code
  //       })
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((token) => {
  //       res.locals.token = token['access_token'];
  //       return next();
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ message: `${err.message} in gitHubResponse` });
  //     });
  // },

  // gitHubSendToken: (req, res, next) => {
  //   const { token } = res.locals;
  //   fetch(`https://api.github.com/user/public_emails`, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/vnd.github.v3+json',
  //       Authorization: `token ${token}`
  //     }
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       res.locals.githubEmail = data[0]['email'];
  //       res.locals.signUpType = 'oauth';
  //       console.log(
  //         'github email:',
  //         res.locals.githubEmail,
  //         'signup type:',
  //         res.locals.signUpType
  //       );
  //       return next();
  //     })
  //     .catch((err) => {
  //       if (err.message === `Cannot read property 'email' of undefined`) {
  //         return res
  //           .status(400)
  //           .json({ message: `${err.message} in gitHubSendToken` });
  //       } else {
  //         return res
  //           .status(500)
  //           .json({ message: `${err.message} in gitHubSendToken` });
  //       }
  //     });
  // },

  // // creates a session when logging in with github
  // githubSession: (req, res, next) => {
  //   // req.user is passed in from passport js -> serializeuser/deserializeuser
  //   const cookieId = req.user.id;
  //   Sessions.findOne({ cookieId }, (err, session: SessionCookie) => {
  //     if (err) {
  //       return next({
  //         log: `Error in sessionController.githubSession find session: ${err}`,
  //         message: {
  //           err: `Error in sessionController.githubSession find session, check server logs for details`
  //         }
  //       });
  //     } else if (!session) {
  //       Sessions.create({ cookieId }, (err, session: SessionCookie) => {
  //         if (err) {
  //           return next({
  //             log: `Error in sessionController.githubSession create session: ${err}`,
  //             message: {
  //               err: `Error in sessionController.githubSession create session, check server logs for details`
  //             }
  //           });
  //         } else {
  //           res.locals.id = session.cookieId;
  //           return next();
  //         }
  //       });
  //     } else {
  //       res.locals.id = session.cookieId;
  //       return next();
  //     }
  //   });
  // }
};

export default sessionController;
