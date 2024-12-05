import { DataTypes } from 'sequelize';
import connectionDb from '../database/connectionDb.js';

const Minor = connectionDb.define('Minor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    enrollment_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'enrollments',
            key: 'id',
        },
        allowNull: false,
    },
});

export default Minor;
