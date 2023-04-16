const { imgurFileHandler } = require('../helpers/file-helpers')
const { User, Matcha, Category, MatchaComment } = require('../models')
const { getUser, getUserData } = require('../helpers/helper')

const homeController = {
  get:async (req, res, next) => {
    try {
      const { user } = await getUserData(req)
      const matcha = await Matcha.findAll({
        attributes: [ 
          'id', 'image', 'name', 'address', 'district' 
        ],
        raw: true,
        order: [['district', 'ASC']]
      })
      res.render('index',{ matcha, user })
    } catch (err) {
      next(err)
    }
  },
  feeds:async (req, res, next) => {
    try {
      const { user } = await getUserData(req)
      const matcha = await Matcha.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']],
        include: [{
          model: Category,
          attributes: ['name']
        }],
        nest: true,
        raw: true
      })
      const matchaComment = await MatchaComment.findAll({
        limit: 10,
        include: [User, Matcha, ],
        order: [['createdAt', 'DESC']],
        nest: true,
        raw: true
      })
      res.render('feeds',{ user, matcha, matchaComment })
    } catch (err) {
      next(err)
    }
  },
  editUser:async (req, res, next) => {
    try {
      const { name } = req.body
      if (!name) throw new Error('name is required!')
      const userId = getUser(req).id
      const user = await User.findByPk(userId)
      const { file } = req 
      const filePath = await imgurFileHandler(file)
      
      await user.update({
        name,
        image: filePath || user.image
      })
      res.redirect('back')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = homeController