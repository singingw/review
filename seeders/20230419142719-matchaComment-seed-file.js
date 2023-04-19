'use strict'

const matchaList = require('../matcha.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const matchas = await queryInterface.sequelize.query(
      'SELECT id, name FROM Matchas',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const comments = matchaList.map(list => {
      const { matchaComment } = list
      const matcha = matchas.find(m => m.name === matchaComment.matcha)
      
      return {
        description: matchaComment.description,
        user_id: users[0].id,
        matcha_id: matcha.id,
        image: matchaComment.image,
        created_at: new Date(),
        updated_at: new Date(),
      }
    })
    await queryInterface.bulkInsert('MatchaComments', comments)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('MatchaComments', null, {})
  }
}
