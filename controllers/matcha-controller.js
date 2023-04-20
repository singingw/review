const { imgurFileHandler } = require('../helpers/file-helpers')
const { User, Matcha, Category, Collect, Recommend, MatchaComment, GeneralComment } = require('../models')
const { getUser, getUserData } = require('../helpers/helper')

const matchaController = {
  getMatcha:async (req, res, next) => {
    try {
      const { user, userId } = await getUserData(req)
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
      if (!matcha) throw new Error('找不到此抹茶資訊')
      const matchaComment = await MatchaComment.findAll({
          where: { matchaId },
          attributes: ['id', 'description', 'image', 'userId', 'createdAt'],
          include: [{
            model: User,
            attributes: ['name', 'image']
          }],
          nest: true,
          raw: true,
          order: [['created_at', 'DESC']]
      })
      const generalComment = await GeneralComment.findAll({
          where: { matchaId },
          attributes: ['id', 'description', 'rating', 'userId', 'createdAt'],
          include: [{
            model: User,
            attributes: ['name', 'image']
          }],
          nest: true,
          raw: true,
          order: [['created_at', 'DESC']]
      })
      const recommend = await Recommend.findOne({
        where: { userId, matchaId }
      })   
      const collect = await Collect.findOne({
        where: { userId, matchaId }
      })
      const recommendCount = await Recommend.count({
        where: { matchaId }
      })
      res.render('home', { user, matcha, collect, recommend, recommendCount, matchaComment, generalComment })
    } catch (err) {
      next(err)
    }
  },
  getCreate:async (req, res, next) => {
    try {
      const { user } = await getUserData(req)
      res.render('create', { user })
    } catch (err) {
      next(err)
    }
  },
  create:async (req, res, next) => {
      try {
      const { name, tel, address, openingHours, website, district, category } = req.body
      if (!name) throw new Error('name is required!')
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
  },
  getedit:async (req, res, next) => {
    try {
      const { user } = await getUserData(req)
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
      res.render('edit',{ matcha, user })
    } catch (err) {
      next(err)
    }
  },
  edit:async (req, res, next) => {
    try {
      const { name, tel, address, openingHours, website, district, category } = req.body
      if (!name) throw new Error('name is required!')
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
  },
  collect:async (req, res, next) => {
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
        await Collect.create({ userId, matchaId })
      }
      res.redirect(`/matchas/matcha/${matchaId}`)
    } catch (err) {
      next(err)
    }
  },
  recommend:async (req, res, next) => {
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
        await Recommend.create({ userId, matchaId })
      }
      res.redirect(`/matchas/matcha/${matchaId}`)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = matchaController