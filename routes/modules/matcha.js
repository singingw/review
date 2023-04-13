const express = require('express')
const router = express.Router()
const { imgurFileHandler } = require('../../helpers/file-helpers')
const { Matcha,Category,Collect } = require('../../models')
const { getUser } = require('../../helpers/helper')

router.get('/matcha/:matchaId', async (req, res) => {
  try {
    const matchaId = req.params.matchaId
    const userId = getUser(req).id
    const matcha = await Matcha.findOne({
      where: { id: matchaId },
      raw: true
    })
    if (!matcha) throw new Error('找不到此抹茶資訊')
    const collect = await Collect.findOne({
      where: { userId, matchaId }
    })
    if(collect != null) res.render('home',{matcha,collect})
    res.render('home',{matcha})
  } catch (err) {
      console.error(err)
  }
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
router.post('/collect/:matchaId', async (req, res) => {
  try {
    const matchaId = req.params.matchaId
    const userId = getUser(req).id
    const collect = await Collect.findOne({
      where: { userId, matchaId }
    })
    if (collect){
      await Collect.destroy({
        where: { userId, matchaId }
      })
    }else{
      await Collect.create({
        userId, 
        matchaId
      })
    }
    res.redirect(`/matchas/matcha/${matchaId}`)
  } catch (err) {
      console.error(err)
  }
})
module.exports = router