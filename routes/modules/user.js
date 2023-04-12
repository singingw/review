const express = require('express')
const router = express.Router()
const { Matcha } = require('../../models')

router.get('/login', async (req, res) => {
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
})
router.get('/logout', (req, res) => {
  req.logout( (err) =>{
    if (err) { return next(err) }
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/user/login')
  })
})

module.exports = router