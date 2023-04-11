'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Matchas', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Matchas', 'category_id')
  }
};
