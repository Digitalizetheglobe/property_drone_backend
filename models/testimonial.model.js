import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Testimonial = sequelize.define('Testimonial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  testimonial: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    field: 'is_active',
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'testimonials',
  timestamps: true,
  underscored: true
});

export default Testimonial;

