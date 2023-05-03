const passport = require('passport');
const passportGithub2 = require('passport-github2');
import user from '../models/Oauth-model';
import GoogleStrategy from 'passport-google-oauth20';
import config from '../../config';

const GitHubStrategy = passportGithub2.Strategy;
const { API_BASE_URL } = config;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  user.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: `${API_BASE_URL}/auth/github/callback`,
      proxy: true
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      user
        .findOne({
          githubId: profile.id
        })
        .then((currentUser) => {
          if (currentUser) {
            console.log('user is: ', currentUser);
            return done(null, currentUser);
          } else {
            user
              .create({
                username: profile.displayName + '(Github)',
                githubId: profile.id
              })
              .then((data) => {
                console.log('user added successfully: ', data);
                return done(null, data);
              })
              .catch((data) =>
                console.log('issue with adding user to database', data)
              );
          }
        });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${API_BASE_URL}/auth/google/callback`,
      proxy: true
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      user
        .findOne({
          googleId: profile.id
        })
        .then((currentUser) => {
          if (currentUser) {
            console.log('user is: ', currentUser);
            return done(null, currentUser);
          } else {
            user
              .create({
                username: profile.displayName + '(Google)',
                googleId: profile.id
              })
              .then((data) => {
                console.log('user added successfully: ', data);
                return done(null, data);
              })
              .catch((data) =>
                console.log('issue with adding user to database', data)
              );
          }
        });
    }
  )
);

export default passport;
