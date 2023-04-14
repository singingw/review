'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'collect_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Collects',
        key: 'id',
      }
    })
    await queryInterface.addColumn('Users', 'recommend_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Recommends',
        key: 'id',
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'collect_id')
    await queryInterface.removeColumn('Users', 'recommend_id')
  }
}