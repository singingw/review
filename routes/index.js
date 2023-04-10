const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/auth/google', passport.authenticate('google', {
  scope: ['email', 'profile']
}))
router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/', (req, res) => {
  res.render('index')
})
router.get('/users/login', (req, res) => {
  res.render('home')
})
module.exports = router