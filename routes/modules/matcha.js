const express = require('express')
const router = express.Router()
const matchaController = require('../../controllers/matcha-controller')

router.get('/matcha/:matchaId', matchaController.getMatcha)
router.get('/create', matchaController.getCreate)
router.post('/create', matchaController.create)
router.get('/edit/:matchaId', matchaController.getedit)
router.put('/edit/:matchaId', matchaController.edit)
router.post('/collect/:matchaId', matchaController.collect)
router.post('/recommend/:matchaId', matchaController.recommend)

module.exports = router