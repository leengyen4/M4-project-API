'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: 'userId' })
      Booking.belongsTo(models.Spot, { foreignKey: 'spotId' })
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
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
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
  }, {
    sequelize,
    modelName: 'Booking',
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
  return Booking;
};
