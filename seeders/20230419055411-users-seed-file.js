'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'matcha',
      email: 'matcha@example.com',
      image: 'https://i.imgur.com/F6Qbp8i.jpeg',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'user1',
      email: 'user1@example.com',
      image: 'https://i.imgur.com/PeaawVF.png',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'user2',
      email: 'user2@example.com',
      image: 'https://i.imgur.com/IkNCyGL.jpeg',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {})
  }
}