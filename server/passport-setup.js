// this file is currently unused as github oauth still needs debugging
// keep for future when github oauth redirect is figured out

const passport = require('passport');
const githubStrategy = require('passport-github2').Strategy;
const { Users } = require('./models/reactypeModels');
const PORT = require('./server.js');
const isDev = process.env.NODE_ENV === 'development';
let serverUrl = 'https://reactype-caret.herokuapp.com';
if (isDev) {
  serverUrl = 'http://localhost:5000';
}

passport.serializeUser((user, done) => {
  /*
  From the user take just the id (to minimize the cookie size) and just pass the id of the user
  to the done callback
  PS: You dont have to do it like this its just usually done like this
  */
  done(null, user);
});

passport.deserializeUser((user, done) => {
  /*
  Instead of user this function usually recives the id
  then you use the id to select the user from the db and pass the user obj to the done callback
  PS: You can later access this data in any routes in: req.user
  PS: For this project, the entire user was passed
  */
  done(null, user);
});

passport.use(
  new githubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: `${serverUrl}/github/callback`,
      scope: ['user:email'],
    },
    (accessToken, refreshToken, profile, next) => {
      const { username } = profile;
      const password = profile._json.node_id;
      const email = profile.emails[0].value;

      // check database to see if user exists
      Users.findOne({ username }, (err, user) => {
        if (!user) {
          // if new user, create user account with following variables given to us from github oauth
          Users.create(
            {
              username,
              password: profile.id,
              email: profile.emails[0].value,
            },
            (err, user) => {
              return next(err, user);
            }
          );
        } else {
          return next(err, user);
        }
      });
    }
  )
);
