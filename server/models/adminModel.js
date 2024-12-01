import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import connectionDb from '../database/connectionDb.js';

const Admin = connectionDb.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Roles',
      key: 'id',
    },
  },
});

// Hook para encriptar contraseña antes de guardar
Admin.beforeCreate(async (admin) => {
  const saltRounds = 10;
  admin.password = await bcrypt.hash(admin.password, saltRounds);
});

export default Admin;
