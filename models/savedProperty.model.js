import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import WebUser from './webuser.model.js';

const SavedProperty = sequelize.define('SavedProperty', {
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
    savedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'savedAt'
    }
}, {
    tableName: 'saved_properties',
    timestamps: false,
    underscored: false,
    indexes: [
        {
            unique: true,
            fields: ['webUserId', 'propertyId'],
            name: 'unique_webuser_saved_property'
        }
    ]
});

export default SavedProperty;

