const express = require('express')
const router = express.Router()
const { Matcha } = require('../../models')

router.get('/', (req, res) => {
  res.render('index')
})
router.get('/create', (req, res) => {
  res.render('create')
})
router.post('/create', (req, res) => {
  const { name, tel, address, openingHours, website, district } = req.body
  //if (!name) throw new Error('name is required!')
  Matcha.create({
    name,
    tel,
    address,
    openingHours,
    website,
    district
  })
    .then(() => {
      req.flash('success_messages', 'successfully created')
      res.redirect('index')
    })
    .catch(err => console.error(err))
})

module.exports = router