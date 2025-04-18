export default (sequelize, DataTypes) => {
  const Project = sequelize.define("Project", {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      buildingName: { type: DataTypes.STRING, allowNull: false }, // Mandatory
      slug: { type: DataTypes.STRING, allowNull: false }, // Mandatory
      unitNo: { type: DataTypes.STRING, allowNull: true },
      location: { type: DataTypes.STRING, allowNull: true },
      city: { type: DataTypes.STRING, allowNull: true },
      seoTitle: { type: DataTypes.STRING, allowNull: true },
      seoKeywords: { type: DataTypes.STRING, allowNull: true },
      multipleProjectImages: { type: DataTypes.JSON, allowNull: true }, // Added field
  });

  return Project;
};
