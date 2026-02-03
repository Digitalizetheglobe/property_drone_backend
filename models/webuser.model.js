import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const WebUser = sequelize.define('WebUser', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'email',
  },
  number: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'number',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'password',
  },
  // Add more fields to match your previous/expected schema if needed
}, {
  tableName: 'web_users',
  timestamps: true, // createdAt, updatedAt
});

// Force sync to ensure schema matches model (specifically for name/username change)
WebUser.sync({ alter: true }).then(() => {
  console.log("WebUser table synced");
}).catch(err => {
  console.error("Error syncing WebUser table:", err);
});

export default WebUser;

