'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class MatchaComment extends Model {
    static associate(models) {
      MatchaComment.belongsTo(models.Matcha, { foreignKey: 'matchaId' })
      MatchaComment.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  MatchaComment.init({
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    matchaId: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MatchaComment',
    tableName: 'MatchaComments',
    underscored: true,
  })
  return MatchaComment
}