'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Collect, { foreignKey: 'collectId' })
      User.belongsTo(models.Recommend, { foreignKey: 'recommendId' })
      User.belongsTo(models.MatchaComment, { foreignKey: 'MatchaCommentId' })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true,
  })
  return User
}