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
  // if valid user logged in/signed up, res.locals.id should be user's id generated from mongodb
  console.log('Inside startSession');
  Session.create({ cookieId: res.locals.id }, err => {
    if (err) {
      return next({
        log: `Error in sessionController.startSession: ${err}`,
        message: {
          err: `Error in sessionController.startSession, check server logs for details`
        }
      });
    }
    console.log('Successful startSession');
    return next();
  });
};

module.exports = sessionController;
