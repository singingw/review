const express = require('express')
const router = express.Router()
const commentController = require('../../controllers/comment-controller')

router.post('/add/:matchaId', commentController.add)

module.exports = router