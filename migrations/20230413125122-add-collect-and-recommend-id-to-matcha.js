'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Matchas', 'collect_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Collects',
        key: 'id',
      }
    })
    await queryInterface.addColumn('Matchas', 'recommend_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Recommends',
        key: 'id',
      }
    })  
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Matchas', 'collect_id')
    await queryInterface.removeColumn('Matchas', 'recommend_id')
  }
}