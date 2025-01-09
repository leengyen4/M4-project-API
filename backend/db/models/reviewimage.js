'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ReviewImage.belongsTo(models.Review, { foreignKey: 'reviewId' })
    }
  }
  ReviewImage.init({
    reviewId: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ReviewImage',
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
  return ReviewImage;
};
