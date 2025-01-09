'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SpotImage.belongsTo(models.Spot, { foreignKey: 'spotId' })
    }
  }
  SpotImage.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'SpotImage',
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
  return SpotImage;
};
