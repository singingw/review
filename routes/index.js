const express = require('express')
const router = express.Router()
const matcha = require('./modules/matcha')
const home = require('./modules/home')
const user = require('./modules/user')
const auth = require('./modules/auth')
const { authenticator } = require('../middleware/auth')

router.use('/matcha',authenticator, matcha)
router.use('/user', user)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router