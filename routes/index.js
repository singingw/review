const express = require('express')
const router = express.Router()
const comment = require('./modules/comment')
const matchas = require('./modules/matcha')
const home = require('./modules/home')
const user = require('./modules/user')
const auth = require('./modules/auth')
const upload = require('../middleware/multer') 
const { authenticator } = require('../middleware/auth')
const { ErrorHandler } = require('../middleware/error-handler')

router.use('/comment', authenticator, upload.single('image'), comment)
router.use('/matchas', authenticator, upload.single('image'), matchas)
router.use('/user', user)
router.use('/auth', auth)
router.use('/', authenticator, upload.single('image'), home)
router.use('/', ErrorHandler)

module.exports = router