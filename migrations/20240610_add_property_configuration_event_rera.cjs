"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Properties", "configurationTypology", {
      type: Sequelize.JSON,
      allowNull: true,
    });
    await queryInterface.addColumn("Properties", "event", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Properties", "reraNumber", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Properties", "configurationTypology");
    await queryInterface.removeColumn("Properties", "event");
    await queryInterface.removeColumn("Properties", "reraNumber");
  },
}; 