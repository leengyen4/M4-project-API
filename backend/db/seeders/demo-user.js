'use strict';

/** @type {import('sequelize-cli').Migration} */

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'user@user.io',
        username: 'user1',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'John',
        lastName: 'Smith'
      },
      {
        email: 'user1@user.io',
        username: 'user2',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Kem',
        lastName: 'Pizano'
      },
      {
        email: 'user2@user.io',
        username: 'user3',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Tim',
        lastName: 'Wilson'
      },
      {
        email: 'demo@demo.com',
        username: 'demo',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Demo',
        lastName: 'User'
      }
    ], { validate: true }, options);
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['user1', 'user2', 'user3'] }
    }, {});
  }
};
