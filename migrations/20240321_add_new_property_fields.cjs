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

    await queryInterface.addColumn('Properties', 'landParcel', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Properties', 'carParking', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Properties', 'reraNo', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Properties', 'towerName', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Properties', 'storeys', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.addColumn('Properties', 'amenities', {
      type: Sequelize.JSON,
      allowNull: true,
      defaultValue: []
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Properties', 'propertyType');
    await queryInterface.removeColumn('Properties', 'youtubeUrl');
    await queryInterface.removeColumn('Properties', 'googleMapUrl');
    await queryInterface.removeColumn('Properties', 'propertyCategory');
    await queryInterface.removeColumn('Properties', 'beds');
    await queryInterface.removeColumn('Properties', 'baths');
    await queryInterface.removeColumn('Properties', 'landParcel');
    await queryInterface.removeColumn('Properties', 'carParking');
    await queryInterface.removeColumn('Properties', 'reraNo');
    await queryInterface.removeColumn('Properties', 'towerName');
    await queryInterface.removeColumn('Properties', 'storeys');
    await queryInterface.removeColumn('Properties', 'amenities');
  }
}; 