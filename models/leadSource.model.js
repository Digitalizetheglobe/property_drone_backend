export default (sequelize, DataTypes) => {
  const LeadSource = sequelize.define("LeadSource", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    timestamps: true,
  });
  return LeadSource;
};
