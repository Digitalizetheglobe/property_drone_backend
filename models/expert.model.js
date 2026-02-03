import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Expert = sequelize.define('Expert', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.JSON, // Storing as JSON to keep structure similar to blogImage ({ filename, path, originalName })
            allowNull: true,
        },
        experience: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        properties: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        locations: {
            type: DataTypes.JSON, // Storing array of strings
            defaultValue: [],
        },
        isExpert: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        initials: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bgColor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        contactNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    return Expert;
};
