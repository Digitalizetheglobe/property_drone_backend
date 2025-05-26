export default (sequelize, DataTypes) => {
  const RealEstateBasic = sequelize.define("RealEstateBasic", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { 
      type: DataTypes.STRING, 
      allowNull: false,
      field: 'title'
    },
    description: { 
      type: DataTypes.TEXT, 
      allowNull: false,
      field: 'description'
    },
    keywords: { 
      type: DataTypes.STRING, 
      allowNull: false,
      field: 'keywords'
    },
    images: { 
      type: DataTypes.JSON, 
      allowNull: true,
      field: 'images'
    }
  }, {
    freezeTableName: true,
    tableName: 'RealEstateBasics'
  });

  return RealEstateBasic;
}; 