export default (sequelize, DataTypes) => {
    const AdminUser = sequelize.define("AdminUser", {
      id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
      },
      userName: { 
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true 
      },
      email: { 
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: { 
        type: DataTypes.STRING, 
        allowNull: false 
      },
      role: {
        type: DataTypes.ENUM('admin', 'superadmin'),
        defaultValue: 'admin'
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    });
  
    return AdminUser;
  };