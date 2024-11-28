import { DataTypes } from 'sequelize';
import connectionDb from '../database/connectionDb.js';

const Role = connectionDb.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Role;
