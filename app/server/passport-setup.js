const passport = require('passport');
const githubStrategy = require('passport-github2').Strategy;
const { Users } = require('./models/reactypeModels');

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
      callbackURL: 'https://localhost:8080/github/callback',
      scope: ['user:email']
    },
    (accessToken, refreshToken, profile, next) => {
      const { username } = profile;
      const password = profile._json.node_id;
      const email = profile.emails[0].value;

      console.log('Username, pw, email are', username, password, email);
      // check database to see if user exists
      Users.findOne({ username }, (err, user) => {
        console.log('Inside find User');
        if (!user) {
          console.log('User not found, creating new user in DB...');
          // if new user, create user account with following variables given to us from github oauth
          Users.create(
            {
              username,
              password: profile.id,
              email: profile.emails[0].value
            },
            (err, user) => {
              console.log('Creating user from github', user);
              return next(err, user);
            }
          );
        } else {
          console.log('User already in DB, moving on...');
          return next(err, user);
        }
      });
    }
  )
);
