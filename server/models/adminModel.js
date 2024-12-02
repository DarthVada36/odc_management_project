import { DataTypes } from 'sequelize';
import connectionDb from '../database/connectionDb.js';
// import bcrypt from 'bcryptjs';


const Admin = connectionDb.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Roles',
      key: 'id',
    },
    allowNull: false,
  },
});

// Hook para encriptar contraseña antes de guardar
// Admin.beforeCreate(async (admin) => {
//   const saltRounds = 10;
//   admin.password = await bcrypt.hash(admin.password, saltRounds);
// });

export default Admin;
