const { imgurFileHandler } = require('../helpers/file-helpers')
const { Op } = require('sequelize')
const { User, Matcha, Category, MatchaComment } = require('../models')
const { getUser, getUserData, AllMatcha, MatchaDistrict, MatchaCategory, MatchaDistrictAndCategory, getMatchedMatchas, getMatchedCollectComment, getMatchedCommentRecommend, getMatchedCollectRecommend, getMatchedRecommend, getMatchedCollect, getMatchedComment } = require('../helpers/helper')

const homeController = {
  get:async (req, res, next) => {
    try {
      const { user } = await getUserData(req)
      const matcha = await AllMatcha()
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
  },
  search:async (req, res, next) => {
    const { user } = await getUserData(req)
    const keyword = req.body.keyword.trim()
    const matcha = await Matcha.findAll({
      where: {
        name: { [Op.substring]: keyword }
      },
      attributes: [ 'id', 'image', 'name', 'address', 'district' ],
      raw: true,
      order: [['district', 'ASC']]
    })
    res.render('index',{ matcha, user })
  },
  filter:async (req, res, next) => {
    try {
      const { district, category, commented, collected, recommended } = req.body
      const { user } = await getUserData(req)
      let matcha
      if(!collected && !commented && !recommended) {
        if(!district && !category) { 
          matcha = await AllMatcha() 
        }else if(!category) {
          matcha = await MatchaDistrict(district) 
        }else if(!district) {
          matcha = await MatchaCategory(category)
        }else {
          matcha = await MatchaDistrictAndCategory(district, category)
        }
      }else if(!collected && !commented) {
        if(!district && !category) { 
          matcha = await AllMatcha()
          matcha = await getMatchedRecommend(matcha)
        }else if(!category) {
          matcha = await MatchaDistrict(district)
          matcha = await getMatchedRecommend(matcha)
        }else if(!district) {
          matcha = await MatchaCategory(category)
          matcha = await getMatchedRecommend(matcha)
        }else {
          matcha = await MatchaDistrictAndCategory(district, category)
          matcha = await getMatchedRecommend(matcha) 
        }
      }else if(!recommended && !commented) {
        if(!district && !category) { 
          matcha = await AllMatcha()
          matcha = await getMatchedCollect(matcha)
        }else if(!category) {
          matcha = await MatchaDistrict(district)
          matcha = await getMatchedCollect(matcha)
        }else if(!district) {
          matcha = await MatchaCategory(category)
          matcha = await getMatchedCollect(matcha)
        }else {
          matcha = await MatchaDistrictAndCategory(district, category)
          matcha = await getMatchedCollect(matcha)
        }
      }else if(!recommended && !collected) {
        if(!district && !category) { 
          matcha = await AllMatcha()
          matcha = await getMatchedComment(matcha)
        }else if(!category) {
          matcha = await MatchaDistrict(district)
          matcha = await getMatchedComment(matcha)
        }else if(!district) {
          matcha = await MatchaCategory(category)
          matcha = await getMatchedComment(matcha)
        }else {
          matcha = await MatchaDistrictAndCategory(district, category)
          matcha = await getMatchedComment(matcha) 
        }
      }else if(!commented) {
        if(!district && !category) { 
          matcha = await AllMatcha()
          matcha = await getMatchedCollectRecommend(matcha)
        }else if(!category) {
          matcha = await MatchaDistrict(district)
          matcha = await getMatchedCollectRecommend(matcha)
        }else if(!district) {
          matcha = await MatchaCategory(category)
          matcha = await getMatchedCollectRecommend(matcha)
        }else {
          matcha = await MatchaDistrictAndCategory(district, category)
          matcha = await getMatchedCollectRecommend(matcha)
        }
      }else if(!collected) {
        if(!district && !category) { 
          matcha = await AllMatcha()
          matcha = await getMatchedCommentRecommend(matcha)
        }else if(!category) {
          matcha = await MatchaDistrict(district)
          matcha = await getMatchedCommentRecommend(matcha)
        }else if(!district) {
          matcha = await MatchaCategory(category)
          matcha = await getMatchedCommentRecommend(matcha)
        }else {
          matcha = await MatchaDistrictAndCategory(district, category)
          matcha = await getMatchedCommentRecommend(matcha)
        }
      }else if(!recommended) {
        if(!district && !category) { 
          matcha = await AllMatcha()
          matcha = await getMatchedCollectComment(matcha)
        }else if(!category) {
          matcha = await MatchaDistrict(district)
          matcha = await getMatchedCollectComment(matcha)
        }else if(!district) {
          matcha = await MatchaCategory(category)
          matcha = await getMatchedCollectComment(matcha)
        }else {
          matcha = await MatchaDistrictAndCategory(district, category)
          matcha = await getMatchedCollectComment(matcha)
        }
      }else {
        if(!district && !category) { 
          matcha = await AllMatcha()
          matcha = await getMatchedMatchas(matcha)
        }else if(!category) {
          matcha = await MatchaDistrict(district)
          matcha = await getMatchedMatchas(matcha)
        }else if(!district) {
          matcha = await MatchaCategory(category)
          matcha = await getMatchedMatchas(matcha)
        }else {
          matcha = await MatchaDistrictAndCategory(district, category)
          matcha = await getMatchedMatchas(matcha)
        }
      }
      res.render('index',{ matcha, user })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = homeController