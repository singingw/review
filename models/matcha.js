'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Matcha extends Model {

    static associate(models) {
      // define association here
    }
  }
  Matcha.init({
    name: DataTypes.STRING,
    tel: DataTypes.STRING,
    address: DataTypes.STRING,
    openingHours: DataTypes.STRING,
    image: DataTypes.STRING,
    website: DataTypes.STRING,
    district: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Matcha',
    tableName: 'Matchas',
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['district']
      }
    ]
  })
  return Matcha
}
