'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class GeneralComment extends Model {
    static associate(models) {
      GeneralComment.belongsTo(models.Matcha, { foreignKey: 'matchaId' })
      GeneralComment.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  GeneralComment.init({
    description: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    matchaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GeneralComment',
    tableName: 'GeneralComments',
    underscored: true,
  })
  return GeneralComment
}