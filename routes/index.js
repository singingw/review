const express = require('express')
const router = express.Router()
const matcha = require('./modules/matcha')
const home = require('./modules/home')
const user = require('./modules/user')
const auth = require('./modules/auth')
const upload = require('../middleware/multer') 
const { authenticator } = require('../middleware/auth')
const { ErrorHandler } = require('../middleware/error-handler')

router.use('/matcha', authenticator, upload.single('image'), matcha)
router.use('/user', user)
router.use('/auth', auth)
router.use('/', authenticator, home)
router.use('/', ErrorHandler)

module.exports = router