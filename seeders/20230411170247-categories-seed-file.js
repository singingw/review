'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories',
      ['下午茶', '工作室', '餐廳', '西點']
        .map(item => {
          return {
            name: item,
            created_at: new Date(),
            updated_at: new Date()
          }
        }
        ), {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', {})
  }
}
