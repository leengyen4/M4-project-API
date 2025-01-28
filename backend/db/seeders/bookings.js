'use strict';

const { Booking } = require('../models');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: '2024-05-01',
        endDate:  '2024-05-03'
      },
      {
        spotId: 1,
        userId: 1,
        startDate: '2024-05-04',
        endDate: '2024-05-06'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2024-05-07',
        endDate: '2024-05-09'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2024-05-10',
        endDate: '2024-05-12'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2024-05-07',
        endDate: '2024-05-09'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2024-05-10',
        endDate: '2024-05-12'
      },
    ], { validate: true }, options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
