'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('todos', {
      id:{
          type: Sequelize.DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      title: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
      },
      description: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('todos');
  }
};
