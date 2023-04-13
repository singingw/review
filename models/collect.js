'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Collect extends Model {

    static associate(models) {
      Collect.hasMany(models.Matcha, { foreignKey: 'collectId' })
      Collect.hasMany(models.User, { foreignKey: 'collectId' })
    }
  }
  Collect.init({
    userId: DataTypes.INTEGER,
    matchaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Collect',
    tableName: 'Collects',
    underscored: true,
  })
  return Collect
}