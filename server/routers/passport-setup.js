const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy
const user = require('../models/Oauth-model');
const GoogleStrategy = require('passport-google-oauth20')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  user.findById(id)
  .then(user=>{
    done(null, user)
  })
})

passport.use(
  new GitHubStrategy(
    {
      clientID: 'c8e71b09f18a095c4c1e',
      clientSecret: '075c7b27061ccecd9258258e1d3749423309afa3',
      callbackURL: `http://localhost:5656/auth/github/callback`
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      user.findOne({
        githubId: profile.id
      })
      .then(currentUser => {
        if (currentUser) {
          console.log('user is: ', currentUser)
          return done(null, currentUser)
        } else {
          user.create({
            username: profile.displayName+'(Github)',
            githubId: profile.id
          })
          .then(data=>{
            console.log('user added successfully: ', data);
            return done(null, data)
          })
          .catch(data=>console.log('issue with adding user to database', data))
        }
      })
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: '374131547814-d5umgbo4d5ftof4ctk2h1rfvn5v3jr10.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: `http://localhost:5656/auth/google/callback`
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      user.findOne({
        googleId: profile.id
      })
      .then(currentUser => {
        if (currentUser) {
          console.log('user is: ', currentUser)
          return done(null, currentUser)
        } else {
          user.create({
            username: profile.displayName+'(Google)',
            googleId: profile.id
          })
          .then(data=>{
            console.log('user added successfully: ', data);
            return done(null, data)
          })
          .catch(data=>console.log('issue with adding user to database', data))
        }
      })
    }
  )
);