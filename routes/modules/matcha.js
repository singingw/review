const express = require('express')
const router = express.Router()
const { imgurFileHandler } = require('../../helpers/file-helpers')
const { Matcha,Category } = require('../../models')

router.get('/matcha/:matchaId', (req, res) => {
  res.render('home')
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
    const { file } = req 
    const filePath = await imgurFileHandler(file)

    await Matcha.create({
      name,
      tel,
      address,
      openingHours,
      website,
      district,
      categoryId: existingCategory.id,
      image: filePath || null
    })
    res.redirect('/')
  } catch (err) {
      next(err)
  }
})

module.exports = router