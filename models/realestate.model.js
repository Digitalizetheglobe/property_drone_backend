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
        allowNull: true,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      metaTitle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      metaDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      metaKeyword: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      canonical: {
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