import connectionDb from '../database/connectionDb.js';
import Admin from './adminModel.js';
import Course from './courseModel.js';
import Enrollment from './enrollmentModel.js';

// Configuración de relaciones

// Relación 1:N entre Courses y Enrollments
Course.hasMany(Enrollment, {
    foreignKey: 'id_course',
    as: 'enrollments', // Alias opcional para acceder a las inscripciones desde un curso
});

Enrollment.belongsTo(Course, {
    foreignKey: 'id_course',
    as: 'course', // Alias opcional para acceder al curso desde una inscripción
});

// Relación 1:N entre Admins y Enrollments
Admin.hasMany(Enrollment, {
    foreignKey: 'id_admin',
    as: 'enrollments', // Alias opcional para acceder a las inscripciones gestionadas por un admin
});

Enrollment.belongsTo(Admin, {
    foreignKey: 'id_admin',
    as: 'admin', // Alias opcional para acceder al admin desde una inscripción
});

// Relación opcional de auto-referencia en Enrollments (related_enrollment_id)
Enrollment.belongsTo(Enrollment, {
    foreignKey: 'related_enrollment_id',
    as: 'relatedEnrollment', // Alias para acceder a la inscripción relacionada
});

// Función para sincronizar los modelos con la base de datos
const syncModels = async () => {
    try {
        await connectionDb.sync({ alter: true }); // Crea o actualiza las tablas según los modelos
        console.log('Modelos sincronizados con la base de datos 🚀');
    } catch (error) {
        console.error('Error al sincronizar los modelos con la base de datos 😱:', error.message);
    }
};

export { Admin, Course, Enrollment, syncModels }; // Exportamos los modelos y la función para usarlos en otras partes del proyecto
