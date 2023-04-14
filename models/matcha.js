'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Matcha extends Model {
    static associate(models) {
      Matcha.belongsTo(models.Category, { foreignKey: 'categoryId' })
      Matcha.hasMany(models.Collect, { foreignKey: 'matchaId' })
      Matcha.hasMany(models.Recommend, { foreignKey: 'matchaId' })
      Matcha.hasMany(models.MatchaComment, { foreignKey: 'matchaId' })
    }
  }
  Matcha.init({
    name: DataTypes.STRING,
    tel: DataTypes.STRING,
    address: DataTypes.STRING,
    openingHours: DataTypes.STRING,
    image: DataTypes.STRING,
    website: DataTypes.STRING,
    district: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
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
