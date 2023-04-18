const express = require('express')
const router = express.Router()
const homeController = require('../../controllers/home-controller')

router.get('/', homeController.get)
router.get('/feeds', homeController.feeds)
router.put('/edit/user', homeController.editUser)
router.post('/search', homeController.search)
router.post('/filter', homeController.filter)

module.exports = router