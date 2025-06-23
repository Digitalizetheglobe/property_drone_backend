import { DataTypes } from "sequelize";

const RealEstateModel = (sequelize) => {
  const RealEstate = sequelize.define(
    "RealEstate",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      keywords: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      images: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );

  return RealEstate;
};

export default RealEstateModel; 