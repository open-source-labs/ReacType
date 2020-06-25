const Session = require('../models/sessionModel');
const sessionController = {};

// isLoggedIn finds appropriate session for this request in database, then verifies whether or not the session is still valid
sessionController.isLoggedIn = (req, res, next) => {
  // find cookie with current user's ssid value
  Session.findOne({ cookieId: req.cookies.ssid }, (err, session) => {
    if (err) {
      return next({
        log: `Error in sessionController.isLoggedIn: ${err}`,
        message: {
          err: `Error in sessionController.isLoggedIn, check server logs for details`
        }
      });
      // no session found, redirect to signup page
    } else if (!session) {
      return res.redirect('/signup');
    } else {
      // session found, move onto next middleware
      return next();
    }
  });
};

// startSession - create and save a new session into the database
sessionController.startSession = (req, res, next) => {
  console.log('Inside startSession');
  // first check if user is logged in already
  Session.findOne({ cookieId: res.locals.id }, (err, session) => {
    if (err) {
      return next({
        log: `Error in sessionController.startSession find session: ${err}`,
        message: {
          err: `Error in sessionController.startSession find session, check server logs for details`
        }
      });
      // if session doesn't exist, create a session
      // if valid user logged in/signed up, res.locals.id should be user's id generated from mongodb, which we will set as this session's cookieId
    } else if (!session) {
      Session.create({ cookieId: res.locals.id }, err => {
        if (err) {
          return next({
            log: `Error in sessionController.startSession create session: ${err}`,
            message: {
              err: `Error in sessionController.startSession create session, check server logs for details`
            }
          });
        }
        console.log('Successful startSession');
        return next();
      });
      // if session exists, move onto next middleware
    } else {
      console.log('Session exists, moving on');
      return next();
    }
  });
};
module.exports = sessionController;
