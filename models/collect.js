'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Collect extends Model {
    static associate(models) {
      Collect.belongsTo(models.Matcha, { foreignKey: 'matchaId' })
      Collect.belongsTo(models.User, { foreignKey: 'userId' })
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