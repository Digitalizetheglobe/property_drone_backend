import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const WebUser = sequelize.define('WebUser', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id',
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'username',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'email',
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

export default WebUser;

