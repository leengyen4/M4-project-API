'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Spot } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 Spot Ave',
        city: 'Apple Valley',
        state: 'Utah',
        country: 'United States',
        lat: 36.1716,
        lng: 115.1391,
        name: 'The Place',
        description: 'Welcome to The Place, a beautiful retreat in the heart',
        price: 250
      },
      {
        ownerId: 1,
        address: '234 Spot Ave',
        city: 'Rocky Mount',
        state: 'North Carolina',
        country: 'United States',
        lat: 36.1716,
        lng: 115.1391,
        name: 'The Oasis',
        description: 'The Oasis is your perfect escape in Rocky Mount',
        price: 200
      },
      {
        ownerId: 2,
        address: '345 Spot Ave',
        city: 'Phoenix',
        state: 'Arizona',
        country: 'United States',
        lat: 36.1716,
        lng: 115.1391,
        name: 'The Cool Place',
        description: 'Experience luxury at The Cool Place in Phoenix',
        price: 600
      },
      {
        ownerId: 2,
        address: '456 Spot Ave',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States',
        lat: 36.1716,
        lng: 115.1391,
        name: 'The Great Place',
        description: 'Discover The Great Place in Los Angeles, a perfect blend of luxury and convenience.',
        price: 450
      },
      {
        ownerId: 3,
        address: '567 Spot Ave',
        city: 'Las Vegas',
        state: 'Nevada',
        country: 'United States',
        lat: 36.1716,
        lng: 115.1391,
        name: 'The Cheap Place',
        description: 'The Cheap Place offers unbeatable value in Las Vegas.',
        price: 34
      },
      {
        ownerId: 3,
        address: '678 Spot Ave',
        city: 'Burbank',
        state: 'California',
        country: 'United States',
        lat: 36.1716,
        lng: 115.1391,
        name: 'The Okay Place',
        description: 'Stay at The Okay Place in Burbank for a comfortable and affordable experience',
        price: 50
      },
      {
        ownerId: 4,
        address: '620 Grove Lane',
        city: 'Burbank',
        state: 'California',
        country: 'United States',
        lat: 36.1716,
        lng: 115.1391,
        name: 'The Awesome Place',
        description: 'A great place to stay with your family',
        price: 300
      },

    ], { validate: true }, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
