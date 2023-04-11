const express = require('express')
const router = express.Router()
const { Matcha,Category } = require('../../models')

router.get('/', (req, res) => {
  res.render('index')
})
router.get('/create', (req, res) => {
  res.render('create')
})
router.post('/create', async (req, res) => {
  const { name, tel, address, openingHours, website, district, category } = req.body
  if (!name) throw new Error('name is required!')
  try {
    const existingCategory = await Category.findOne({ 
      where: { name:category },
      raw: true
    })
    await Matcha.create({
      name,
      tel,
      address,
      openingHours,
      website,
      district,
      categoryId:existingCategory.id
    })
    req.flash('success_messages', 'successfully created')
    res.redirect('index')
  } catch (error) { console.error(error) }
})

module.exports = router