const express = require('express')
const router = express.Router()
const { imgurFileHandler } = require('../../helpers/file-helpers')
const { MatchaComment } = require('../../models')
const { getUser } = require('../../helpers/helper')

router.post('/add/:matchaId', async (req, res) => {
  try {
    const { description } = req.body
    if (!description) throw new Error('description is required!')
    const matchaId = req.params.matchaId
    const userId = getUser(req).id

    const { file } = req 
    const filePath = await imgurFileHandler(file)

    await MatchaComment.create({
      description,
      matchaId,
      userId,
      image: filePath || null
    })
    res.redirect(`/matchas/matcha/${matchaId}`)
  } catch (err) {
    next(err)
  }
})

module.exports = router