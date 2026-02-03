import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import WebUser from './webuser.model.js';

const PropertyComparison = sequelize.define('PropertyComparison', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    webUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'webUserId',
        references: {
            model: WebUser,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    propertyId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'propertyId'
    },
    propertyData: {
        type: DataTypes.JSON,
        allowNull: false,
        field: 'propertyData'
    },
    addedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'addedAt'
    }
}, {
    tableName: 'property_comparisons',
    timestamps: false,
    underscored: false,
    indexes: [
        {
            unique: true,
            fields: ['webUserId', 'propertyId'],
            name: 'unique_webuser_property'
        }
    ]
});

// Define associations
PropertyComparison.belongsTo(WebUser, { foreignKey: 'webUserId', as: 'webUser' });
WebUser.hasMany(PropertyComparison, { foreignKey: 'webUserId' });

export default PropertyComparison;

