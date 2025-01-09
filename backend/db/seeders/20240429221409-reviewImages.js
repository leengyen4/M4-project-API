'use strict';

/** @type {import('sequelize-cli').Migration} */

const { ReviewImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: 'testUrl'
      },
      {
        reviewId: 2,
        url: 'testUrl'
      },
      {
        reviewId: 3,
        url: 'testUrl'
      },
      {
        reviewId: 4,
        url: 'testUrl'
      },
      {
        reviewId: 5,
        url: 'testUrl'
      },
      {
        reviewId: 6,
        url: 'testUrl'
      },
    ], { validate: true }, options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
