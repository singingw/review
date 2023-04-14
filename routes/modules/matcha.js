const express = require('express')
const router = express.Router()
const { imgurFileHandler } = require('../../helpers/file-helpers')
const { Matcha,Category,Collect,Recommend } = require('../../models')
const { getUser } = require('../../helpers/helper')

router.get('/matcha/:matchaId', async (req, res) => {
  try {
    const matchaId = req.params.matchaId
    const userId = getUser(req).id
    const matcha = await Matcha.findOne({
      where: { id: matchaId },
      include: [{
        model: Category,
        attributes: ['name']
      }],
      nest: true,
      raw: true
    })
    if (!matcha) throw new Error('找不到此抹茶資訊')
    const recommend = await Recommend.findOne({
      where: { userId, matchaId }
    })   
    const collect = await Collect.findOne({
      where: { userId, matchaId }
    })
    let recommendCount = await Recommend.count({
      where: { matchaId }
    })
    if (collect != null && recommend != null) { 
      res.render('home', { matcha, collect, recommend, recommendCount })
    } else if (collect != null || recommend != null) {
      if (recommend != null) {
        res.render('home', { matcha, recommend, recommendCount })
      } else {
        res.render('home', { matcha, collect, recommendCount })
      }
    } else {
      res.render('home', { matcha, recommendCount })
    }
  } catch (err) {
    next(err)
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
router.get('/edit/:matchaId', async (req, res) => {
  try {
    const matchaId = req.params.matchaId
    const matcha = await Matcha.findOne({
      where: { id: matchaId },
      include: [{
          model: Category,
          attributes: ['name']
      }],
      nest: true,
      raw: true
    })
    res.render('edit',{matcha})
  } catch (err) {
    next(err)
  }
})
router.put('/edit/:matchaId', async (req, res) => {
  const { name, tel, address, openingHours, website, district, category } = req.body
  if (!name) throw new Error('name is required!')
  try {
    const existingCategory = await Category.findOne({ 
      where: { name:category },
      raw: true
    })
    const matchaId = req.params.matchaId
    const matcha = await Matcha.findByPk(matchaId)

    const { file } = req 
    const filePath = await imgurFileHandler(file)

    await matcha.update({
      name,
      tel,
      address,
      openingHours,
      website,
      district,
      categoryId: existingCategory.id,
      image: filePath || matcha.image
    })
    res.redirect(`/matchas/matcha/${matchaId}`)
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
    next(err)
  }
})
router.post('/recommend/:matchaId', async (req, res) => {
  try {
    const matchaId = req.params.matchaId
    const userId = getUser(req).id
    const recommend = await Recommend.findOne({
      where: { userId, matchaId }
    })
    if (recommend){
      await Recommend.destroy({
        where: { userId, matchaId }
      })
    }else{
      await Recommend.create({
        userId, 
        matchaId
      })
    }
    res.redirect(`/matchas/matcha/${matchaId}`)
  } catch (err) {
    next(err)
  }
})
module.exports = router