const express = require('express')
const router = express.Router()
const { imgurFileHandler } = require('../../helpers/file-helpers')
const { User, Matcha } = require('../../models')
const { getUser } = require('../../helpers/helper')

router.get('/', async (req, res) => {
  try {
    const userId = getUser(req).id
    const user = await User.findOne({ 
      where: { id:userId },
      raw: true
    })
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
})
router.put('/edit/user', async (req, res) => {
  const { name } = req.body
  if (!name) throw new Error('name is required!')
  const userId = getUser(req).id
  try {
    const { file } = req 
    const filePath = await imgurFileHandler(file)
    const user = await User.findByPk(userId)
    
    await user.update({
      name,
      image: filePath || user.image
    })
    res.redirect(`/`)
  } catch (err) {
      console.error(err)
  }
})


module.exports = router