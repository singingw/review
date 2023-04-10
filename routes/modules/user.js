const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('home')
})
router.get('/logout', (req, res) => {
  req.logout( (err) =>{
    if (err) { return next(err) }
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/user/login')
  })
})

module.exports = router