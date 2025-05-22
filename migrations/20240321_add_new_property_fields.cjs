'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Properties', 'propertyType', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Properties', 'youtubeUrl', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Properties', 'googleMapUrl', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Properties', 'propertyCategory', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Properties', 'beds', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.addColumn('Properties', 'baths', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Properties', 'propertyType');
    await queryInterface.removeColumn('Properties', 'youtubeUrl');
    await queryInterface.removeColumn('Properties', 'googleMapUrl');
    await queryInterface.removeColumn('Properties', 'propertyCategory');
    await queryInterface.removeColumn('Properties', 'beds');
    await queryInterface.removeColumn('Properties', 'baths');
  }
}; 