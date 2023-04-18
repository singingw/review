const { User, Matcha, Recommend, Category, Collect, MatchaComment } = require('../models')

function getUser(req) {
  return req.user
}
async function getUserData(req) {
  const userId = req.user.id
  const user = await User.findOne({ 
    where: { id:userId },
    raw: true
  })
  return { userId, user }
}

async function AllMatcha() {
  const matcha = await Matcha.findAll({
    attributes: [ 
      'id', 'image', 'name', 'address', 'district' 
    ],
    raw: true,
    order: [['district', 'ASC']]
  })
  return matcha
}
async function MatchaDistrict(district) {
  const matcha = await Matcha.findAll({
    where: { district },
    attributes: [ 
      'id', 'image', 'name', 'address', 'district' 
    ],
    raw: true,
    order: [['district', 'ASC']]
  })
  return matcha
}
async function MatchaCategory(category) {
  const matcha = await Matcha.findAll({
    attributes: [ 
      'id', 'image', 'name', 'address', 'district' 
    ],
    include: [{
      model: Category,
      where: { name: category },
      attributes: ['name']
    }],
    raw: true,
    order: [['district', 'ASC']]
  })
  return matcha
}
async function MatchaDistrictAndCategory(district, category) {
  const matcha = await Matcha.findAll({
    where: { district: district },
    attributes: [ 
      'id', 'image', 'name', 'address', 'district' 
    ],
    include: [{
      model: Category,
      where: { name: category },
      attributes: ['name']
    }],
    raw: true,
    order: [['district', 'ASC']]
  })
  return matcha
}
async function MatchaObject(matcha) {
  const matchaObj = {}
  matcha.forEach((m) => {
    matchaObj[m.id] = m
  })
  return matchaObj
}
async function Recommended(matchaObj) {
  const recommend = await Recommend.findAll({
    raw: true
  })
  const matchedRecommend = recommend.map((r) => {
    const matcha = matchaObj[r.matchaId]
    return matcha
  }).filter(matcha => matcha !== undefined)
  return matchedRecommend
}
async function Collected(matchaObj) {
  const collect = await Collect.findAll({
    raw: true
  })
  const matchedCollected = collect.map((c) => {
    const matcha = matchaObj[c.matchaId]
    return matcha
  }).filter(matcha => matcha !== undefined)
  return matchedCollected
}
async function Commented(matchaObj) {
  const comment = await MatchaComment.findAll({
    attributes: ['id', 'matchaId'],
    raw: true
  })
  const matchedCommented = comment.map((c) => {
    const matcha = matchaObj[c.matchaId]
    return matcha
  }).filter(matcha => matcha !== undefined)
  return matchedCommented
}

async function MatchedMatcha(matcha, matched) {
  const matchedMatcha = matcha.filter((matcha) => {
    return matched.some((matched) => {
      return matched.id === matcha.id
    })
  })
  return matchedMatcha
}
async function MatchedMatchas(matchedRecommend, matchedCollected, matchedCommented) {
  const matchedMatcha = matchedRecommend.filter((r) => {
    return matchedCollected.includes(r) && matchedCommented.includes(r)
  })
  return matchedMatcha
}
async function getMatchedMatchas(matcha) {
  const matchaObj = await MatchaObject(matcha)
  const collect = await Collected(matchaObj)
  const commented = await Commented(matchaObj)
  const recommend = await Recommended(matchaObj)
  const matchedMatchas = await MatchedMatchas(commented, collect, recommend)
  return matchedMatchas
}
async function getMatchedCollectComment(matcha) {
  const matchaObj = await MatchaObject(matcha)
  const commented = await Commented(matchaObj)
  const collect = await Collected(matchaObj)
  const matchedMatcha = await MatchedMatcha(commented, collect)
  return matchedMatcha
}
async function getMatchedCommentRecommend(matcha) {
  const matchaObj = await MatchaObject(matcha)
  const commented = await Commented(matchaObj)
  const recommend = await Recommended(matchaObj)
  const matchedMatcha = await MatchedMatcha(commented, recommend)
  return matchedMatcha
}
async function getMatchedCollectRecommend(matcha) {
  const matchaObj = await MatchaObject(matcha)
  const collect = await Collected(matchaObj)
  const recommend = await Recommended(matchaObj)
  const matchedMatcha = await MatchedMatcha(collect, recommend)
  return matchedMatcha
}

async function getMatchedRecommend(matcha) {
  const matchaObj = await MatchaObject(matcha)
  const recommend = await Recommended(matchaObj)
  return recommend
}
async function getMatchedCollect(matcha) {
  const matchaObj = await MatchaObject(matcha)
  const collect = await Collected(matchaObj)
  return collect
}
async function getMatchedComment(matcha) {
  const matchaObj = await MatchaObject(matcha)
  const comment = await Commented(matchaObj)
  return comment
}

module.exports = {
  getUser,
  getUserData,
  AllMatcha,
  MatchaDistrict,
  MatchaCategory,
  MatchaDistrictAndCategory,
  getMatchedMatchas,
  getMatchedCollectComment,
  getMatchedCommentRecommend,
  getMatchedCollectRecommend,
  getMatchedRecommend,
  getMatchedCollect,
  getMatchedComment
}