export default (sequelize, DataTypes) => {
    const UserProperty = sequelize.define("UserProperty", {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        propertyCategory: {
            type: DataTypes.STRING, // Residential / Commercial
            allowNull: false,
        },
        propertyType: {
            type: DataTypes.STRING, // Apartment, Villa, etc.
            allowNull: true,
        },
        buildingName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        locality: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bhk: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        area: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        areaUnit: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        furnishing: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        shareWithAgents: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: "Pending", // Pending, Verified, Rejected
        }
    });

    return UserProperty;
};
