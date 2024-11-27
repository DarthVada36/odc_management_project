<<<<<<< HEAD
import connectionDb from "../database/connectionDb";
import { DataTypes } from "sequelize"; 


const  Enrollment = connectionDb.define('Enrollment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    enrollmentDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'enrollments'
}); 
=======
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
        type: DataTypes.ENUM('mujer', 'hombre', 'otros generos'),
        allowNull: true, // Opcional
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true, // Almacena la edad exacta
        validate: {
            min: 0, // Edad mínima
            max: 120, // Edad máxima
        },
    },
    is_first_activity: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    accompanying_minors: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    minors_data: {
        type: DataTypes.JSON, // Almacena un array con {name, age}
        allowNull: true,
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
    related_enrollment_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Campo opcional
        references: {
            model: 'enrollments',
            key: 'id', // Clave foránea en la misma tabla
        },
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
>>>>>>> f68a9ea0805d8dc12ad700b8503b4b1dec95a0fe
