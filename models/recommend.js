'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Recommend extends Model {
    static associate(models) {
      Recommend.belongsTo(models.Matcha, { foreignKey: 'matchaId' })
      Recommend.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Recommend.init({
    userId: DataTypes.INTEGER,
    matchaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Recommend',
    tableName: 'Recommends',
    underscored: true,
  })
  return Recommend
}