'use strict';

const constants = require('../lib/constants')

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('tasks', [{
      title: 'First task',
      status: constants.STATUS.DONE,
      expiration: '2022-04-26 00:44:24',
      createdAt: '2022-04-20 12:25:03',
      updatedAt: '2022-04-20 12:25:03',
    },{
      title: 'Another task',
      status: constants.STATUS.IN_PROGRESS,
      expiration: '2022-04-26 00:44:24',
      createdAt: '2022-04-20 12:25:03',
      updatedAt: '2022-04-20 12:25:03',
    },{
      title: 'Do the thing!',
      status: constants.STATUS.TODO,
      expiration: '2022-04-26 00:44:24',
      createdAt: '2022-04-20 12:25:03',
      updatedAt: '2022-04-20 12:25:03',
    }], {});
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  }
};
