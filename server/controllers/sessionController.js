require('dotenv').config();
const fetch = require('node-fetch');
const { Sessions } = require('../models/reactypeModels');
const sessionController = {};
// isLoggedIn finds appropriate session for this request in database, then verifies whether or not the session is still valid
sessionController.isLoggedIn = (req, res, next) => {
  let cookieId;
  if (req.cookies.ssid) {
    cookieId = req.cookies.ssid;
  } else {
    cookieId = req.body.userId;
  }

  // find session from request session ID in mongodb
  Sessions.findOne({ cookieId }, (err, session) => {
    if (err) {
      return next({
        log: `Error in sessionController.isLoggedIn: ${err}`,
        message: {
          err: `Error in sessionController.isLoggedIn, check server logs for details`,
        },
      });
      // no session found, redirect to signup page
    } else if (!session) {
      return res.redirect('/');
    } else {
      // session found, move onto next middleware
      return next();
    }
  });
};

// startSession - create and save a new session into the database
sessionController.startSession = (req, res, next) => {
  // first check if user is logged in already
  Sessions.findOne({ cookieId: res.locals.id }, (err, session) => {
    if (err) {
      return next({
        log: `Error in sessionController.startSession find session: ${err}`,
        message: {
          err: `Error in sessionController.startSession find session, check server logs for details`,
        },
      });
      // if session doesn't exist, create a session
      // if valid user logged in/signed up, res.locals.id should be user's id generated from mongodb, which we will set as this session's cookieId
    } else if (!session) {
      Sessions.create({ cookieId: res.locals.id }, (err, session) => {
        if (err) {
          return next({
            log: `Error in sessionController.startSession create session: ${err}`,
            message: {
              err: `Error in sessionController.startSession create session, check server logs for details`,
            },
          });
        } else {
          res.locals.ssid = session.cookieId;
          return next();
        }
      });
      // if session exists, move onto next middleware
    } else {
      res.locals.ssid = session.cookieId;
      return next();
    }
  });
};

//
sessionController.gitHubResponse = (req, res, next) => {
  // console.log(req)
  const { code } = req.query;
  // console.log('code =>', code);
  if (!code) return next({
    log: 'Undefined or no code received from github.com',
    message: 'Undefined or no code received from github.com',
    status: 400
  });
  fetch(
    `https://github.com/login/oauth/access_token`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_ID,
        client_secret: process.env.GITHUB_SECRET,
        code
      })
    })
    .then(res => res.json())
    .then(token => {
      res.locals.token = token['access_token'];
      return next();
    })
    .catch(err => res.status(500).json({message: `${err.message} in gitHubResponse`}))
}

sessionController.gitHubSendToken = (req, res, next) => {
  const { token } = res.locals;
  fetch(
    `https://api.github.com/user/emails`,{
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `token ${token}`
      },
    })
    .then(res => res.json())
    .then(data => {
      res.locals.githubEmail = data[0]['email'];
      res.locals.signUpType = 'oauth';
      return next();
    })
    .catch(err =>{ 
      if (err.message === `Cannot read property 'email' of undefined`) {
        return res.status(400).json({message: `${err.message} in gitHubSendToken`});
      } else {
        return res.status(500).json({message: `${err.message} in gitHubSendToken`});
      }
    });
}

// creates a session when logging in with github
sessionController.githubSession = (req, res, next) => {
  // req.user is passed in from passport js -> serializeuser/deserializeuser
  const cookieId = req.user._id;
  Sessions.findOne({ cookieId }, (err, session) => {
    if (err) {
      return next({
        log: `Error in sessionController.githubSession find session: ${err}`,
        message: {
          err: `Error in sessionController.githubSession find session, check server logs for details`,
        },
      });
    } else if (!session) {
      Sessions.create({ cookieId }, (err, session) => {
        if (err) {
          return next({
            log: `Error in sessionController.githubSession create session: ${err}`,
            message: {
              err: `Error in sessionController.githubSession create session, check server logs for details`,
            },
          });
        } else {
          res.locals.id = session.cookieId;
          return next();
        }
      });
    } else {
      res.locals.id = session.cookieId;
      return next();
    }
  });
};

module.exports = sessionController;
