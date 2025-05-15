export default (sequelize, DataTypes) => {

  const Property = sequelize.define("Property", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    // Use explicit table name mapping to avoid conflicts
    propertyName: { 
      type: DataTypes.STRING, 
      allowNull: false,
      field: 'propertyName' // This is the column name in the database
    },
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
    // In property.model.js, add these fields to the model definition
   }, {
    // By setting freezeTableName, you ensure Sequelize doesn't pluralize the table name
    freezeTableName: true,
    // Set the exact table name
    tableName: 'Properties'
  });

  return Property;
};