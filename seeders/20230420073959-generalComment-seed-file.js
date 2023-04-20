'use strict'

const matchaList = require('../matcha.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT id, name FROM Users',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const matchas = await queryInterface.sequelize.query(
      'SELECT id, name FROM Matchas',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await Promise.all(matchaList.map(async list => {
      const { generalComment } = list
      const general = generalComment.map(list => {
        const matcha = matchas.find(m => m.name === list.matcha)
        const user = users.find(u => u.name === list.user)

        return {
          description: list.description,
          user_id: user.id,
          matcha_id: matcha.id,
          rating: list.rating,
          created_at: new Date(),
          updated_at: new Date(),
        }
      })
      await queryInterface.bulkInsert('GeneralComments', general)
    }))
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('GeneralComments', null, {})
  }
}