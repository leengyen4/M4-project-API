'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Review } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review: 'Absolutely loved this place! The view was amazing and the amenities were top-notch.',
        stars: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: 'The spot was decent but a bit noisy at night.',
        stars: 3
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Great location and friendly host. Would definitely stay again.',
        stars: 4
      },
      {
        spotId: 2,
        userId: 1,
        review: 'Fantastic experience. The room was clean and well-maintained.',
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Nice place but the bed was a bit uncomfortable.',
        stars: 3
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Had a wonderful stay! Perfect for a weekend getaway.',
        stars: 5
      },
      {
        spotId: 3,
        userId: 1,
        review: 'This spot exceeded our expectations. The decor was beautiful.',
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
        review: 'It was okay, nothing special. Could use some updates.',
        stars: 3
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Loved everything about this place. Will recommend to friends.',
        stars: 5
      },
      {
        spotId: 4,
        userId: 1,
        review: 'Great value for the price. Had everything we needed.',
        stars: 4
      },
      {
        spotId: 4,
        userId: 2,
        review: 'Not the best experience. The place was a bit dirty.',
        stars: 2
      },
      {
        spotId: 4,
        userId: 3,
        review: 'Cozy and comfortable. Felt like home.',
        stars: 4
      },
      {
        spotId: 5,
        userId: 1,
        review: 'Perfect spot for our family vacation. Lots of space and very clean.',
        stars: 5
      },
      {
        spotId: 5,
        userId: 2,
        review: 'Average stay. Could be better with some improvements.',
        stars: 3
      },
      {
        spotId: 5,
        userId: 3,
        review: 'Good location but the WiFi was slow.',
        stars: 3
      }
    ], { validate: true }, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
