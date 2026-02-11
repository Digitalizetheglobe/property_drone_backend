export default (sequelize, DataTypes) => {
  const Project = sequelize.define("Project", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    buildingName: { type: DataTypes.STRING, allowNull: false }, // Mandatory
    slug: { type: DataTypes.STRING, allowNull: false }, // Mandatory
    unitNo: { type: DataTypes.STRING, allowNull: true },
    floor: { type: DataTypes.STRING, allowNull: true },
    propertyType: { type: DataTypes.STRING, allowNull: true },
    propertySubtype: { type: DataTypes.STRING, allowNull: true },
    location: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },
    seoTitle: { type: DataTypes.STRING, allowNull: true },
    seoDescription: { type: DataTypes.TEXT, allowNull: true },
    seoKeywords: { type: DataTypes.STRING, allowNull: true },
    multipleProjectImages: { type: DataTypes.JSON, allowNull: true }, // Added field
  });

  return Project;
};
