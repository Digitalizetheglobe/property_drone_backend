export default (sequelize, DataTypes) => {

  const Property = sequelize.define("Property", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    // Use explicit table name mapping to avoid conflicts
    propertyName: { 
      type: DataTypes.STRING, 
      allowNull: false,
      field: 'propertyName' // This is the column name in the database
    },
    propertyType: { type: DataTypes.STRING, allowNull: true },
    youtubeUrl: { type: DataTypes.STRING, allowNull: true },
    googleMapUrl: { type: DataTypes.STRING, allowNull: true },
    propertyCategory: { type: DataTypes.STRING, allowNull: true },
    beds: { type: DataTypes.INTEGER, allowNull: true },
    baths: { type: DataTypes.INTEGER, allowNull: true },
    topology: { type: DataTypes.STRING, allowNull: true },
    carpetArea: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: true },
    location: { type: DataTypes.STRING, allowNull: true },
    tentativeBudget: { type: DataTypes.STRING, allowNull: true },
    possession: { type: DataTypes.STRING, allowNull: true },
    multipleImages: { 
      type: DataTypes.JSON, 
      allowNull: true,
      field: 'multipleImages' // This is the column name in the database
    },
    slug: { type: DataTypes.STRING, allowNull: false },
    seoDescription: { type: DataTypes.STRING, allowNull: true },
    seoTitle: { type: DataTypes.STRING, allowNull: true },
    seoKeywords: { type: DataTypes.STRING, allowNull: true },
    configurationTypology: {
      type: DataTypes.JSON,
      allowNull: true,
      field: 'configurationTypology'
    },
    event: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'event'
    },
    reraNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'reraNumber'
    },
   }, {
    // By setting freezeTableName, you ensure Sequelize doesn't pluralize the table name
    freezeTableName: true,
    // Set the exact table name
    tableName: 'Properties'
  });

  return Property;
};