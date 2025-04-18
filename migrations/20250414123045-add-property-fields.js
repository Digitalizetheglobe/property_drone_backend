'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Properties', 'propertyTypes', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'possession'
    });
    
    await queryInterface.addColumn('Properties', 'bookmark', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      after: 'propertyTypes'
    });
    
    await queryInterface.addColumn('Properties', 'propertyCategory', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'bookmark'
    });
    
    await queryInterface.addColumn('Properties', 'filed', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      after: 'propertyCategory'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Properties', 'propertyTypes');
    await queryInterface.removeColumn('Properties', 'bookmark');
    await queryInterface.removeColumn('Properties', 'propertyCategory');
    await queryInterface.removeColumn('Properties', 'filed');
  }
};