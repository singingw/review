'use strict'

const matchaList = require('../matcha.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = await queryInterface.sequelize.query(
      'SELECT id, name FROM Categories',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const matchas = matchaList.map(matcha => {
      const category = categories.find(c => c.name === matcha.category)
      
      return {
        name: matcha.name,
        tel: matcha.tel,
        address: matcha.address,
        opening_hours: matcha.openingHours,
        image: matcha.image,
        website: matcha.website,
        district: matcha.district,
        created_at: new Date(),
        updated_at: new Date(),
        category_id: category.id
      }
    })
    await queryInterface.bulkInsert('Matchas', matchas)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Matchas', null, {})
  }
}
