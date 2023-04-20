const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { User } = require('../models')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  
  //Google 驗證
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    User.findOne({ where: { email } })
      .then(user => {
        if (user) {
          return done(null, user)
        } else {
          User.create({
            image: 'https://i.imgur.com/Ws5HXdf.jpeg',
            name,
            email
          }).then(user => {
            return done(null, user)
          }).catch(err => {
            return done(err, false)
          })
        }
      }).catch(err => {
        return done(err, false)
      })
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
  User.findOne({ where: { id } })
    .then(user => done(null, user))
    .catch(err => done(err, null))
  })
}