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

/**
 * Passport strategy for GitHub OAuth authentication.
 *
 * @param {string} accessToken - Access token provided by GitHub for authentication.
 * @param {string} refreshToken - Refresh token provided by GitHub for authentication.
 * @param {object} profile - User profile data retrieved from GitHub.
 * @param {Function} done - Callback function to be called when authentication process is completed.
 */
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: `${API_BASE_URL}/auth/github/callback`,
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      user
        .findOne({
          githubId: profile.id
        })
        .then((currentUser) => {
          if (currentUser) {
            console.log('user is: ', currentUser);
            return done(null, currentUser);
          }
          let initials;
          if (profile.displayName) {
            initials = profile.displayName.match(/\b\w/g).join('');
          } else {
            initials = profile._json.login.match(/\b\w/g).join('');
          }

          const nums = profile.id.slice(0, 5);
          user
            .create({
              username: initials + nums + '(Github)',
              githubId: profile.id
            })
            .then((data) => {
              console.log('user added successfully: ', data);
              return done(null, data);
            })
            .catch((data) =>
              console.log('issue with adding user to database', data)
            );
        });
    }
  )
);

/**
 * Passport strategy for Google OAuth authentication.
 *
 * @param {string} accessToken - Access token provided by Google for authentication.
 * @param {string} refreshToken - Refresh token provided by Google for authentication.
 * @param {object} profile - User profile data retrieved from Google.
 * @param {Function} done - Callback function to be called when authentication process is completed.
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${API_BASE_URL}/auth/google/callback`,
      proxy: true
    },
    function (accessToken, refreshToken, profile, done) {
      user
        .findOne({
          googleId: profile.id
        })
        .then((currentUser) => {
          if (currentUser) {
            console.log('user is: ', currentUser);
            return done(null, currentUser);
          } else {
            const initials = profile.displayName.match(/\b\w/g).join('');
            const nums = profile.id.slice(0, 5);
            user
              .create({
                username: initials + nums + '(Google)',
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
