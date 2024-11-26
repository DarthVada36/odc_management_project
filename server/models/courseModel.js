import { DataTypes } from 'sequelize';
import connectionDb from '../database/connectionDb.js';

const Course = connectionDb.define('Course', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    external_id: {
        type: DataTypes.STRING, // Para sincronización futura con el CMS
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    schedule: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tickets: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0, // No puede ser negativo
        },
    },
});

export default Course; // Exportamos el modelo
