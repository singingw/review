const { User } = require('../models')

function getUser(req) {
  return req.user;
}

async function getUserData(req) {
  const userId = req.user.id
  const user = await User.findOne({ 
    where: { id:userId },
    raw: true
  })
  return { userId, user }
}

module.exports = {
  getUser,
  getUserData
}