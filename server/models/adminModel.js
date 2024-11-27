import { DataTypes } from 'sequelize';
import connectionDb from '../database/connectionDb.js';

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
    role: {
        type: DataTypes.ENUM('admin', 'superadmin'),
        allowNull: false,
        defaultValue: 'admin',
    },
});

export default Admin; 
