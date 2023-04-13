'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Recommend extends Model {

    static associate(models) {
      Recommend.hasMany(models.Matcha, { foreignKey: 'recommendId' })
      Recommend.hasMany(models.User, { foreignKey: 'recommendId' })
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