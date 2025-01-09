'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: 'userId' })
      Review.belongsTo(models.Spot, { foreignKey: 'spotId' })
      Review.hasMany(models.ReviewImage, { foreignKey: 'reviewId', as: 'ReviewImages' })
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    review: DataTypes.STRING,
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
    getterMethods: {
      createdAt() {
        const date = this.getDataValue('createdAt');
        return date ? date.toISOString().replace('T', ' ').slice(0, 19) : null
      },
      updatedAt() {
        const date = this.getDataValue('updatedAt');
        return date ? date.toISOString().replace('T', ' ').slice(0, 19) : null
      }
    }
  });
  return Review;
};
