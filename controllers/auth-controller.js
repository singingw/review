const passport = require('passport')

const authController = {
  get:passport.authenticate('google', {
    scope: ['email', 'profile']
  }),
  callback:passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/user/login'
  })
}

module.exports = authController