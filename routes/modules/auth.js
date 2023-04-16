const express = require('express')
const router = express.Router()
const authController = require('../../controllers/auth-controller')

router.get('/google', authController.get)
router.get('/google/callback', authController.callback)

module.exports = router