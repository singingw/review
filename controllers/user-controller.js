const { Matcha } = require('../models')
const { getUserData } = require('../helpers/helper')

const userController = {
  login:async (req, res, next) => {
    try {
      const matcha = await Matcha.findAll({
        attributes: [ 
          'id', 'image', 'name', 'address', 'district' 
        ],
        raw: true,
        order: [['district', 'ASC']]
      })
      res.render('index',{ matcha })
    } catch (err) {
        next(err)
    }
  },
  logout:async (req, res, next) => {
    req.logout( (err) =>{
      if (err) { return next(err) }
      req.flash('success_msg', '你已經成功登出。')
      res.redirect('/user/login')
    })
  }
}

module.exports = userController