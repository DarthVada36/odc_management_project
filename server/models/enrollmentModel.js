import { DataTypes } from 'sequelize';
import connectionDb from '../database/connectionDb.js';

const Enrollment = connectionDb.define('Enrollment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    gender: {
        type: DataTypes.ENUM('mujer', 'hombre', 'otros generos', 'NS/NC'),
        allowNull: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 0,
            max: 120,
        },
    },
    is_first_activity: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    id_admin: {
        type: DataTypes.INTEGER,
        references: {
            model: 'admins',
            key: 'id',
        },
        allowNull: false,
    },
    id_course: {
        type: DataTypes.INTEGER,
        references: {
            model: 'courses',
            key: 'id',
        },
        allowNull: false,
    },
    group_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Opcional, asignado automáticamente para inscripciones en grupo
    },
    accepts_newsletter: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});

export default Enrollment;
