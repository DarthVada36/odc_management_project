import Role from './roleModel.js'
import Admin from './adminModel.js'
import Course from './courseModel.js'
import Enrollment from './enrollmentModel.js'
import Minor from './minorModel.js'
import connectionDb from '../database/connectionDb.js'

// Roles y Admins
Role.hasMany(Admin, { foreignKey: 'role_id', as: 'admins' })
Admin.belongsTo(Role, { foreignKey: 'role_id', as: 'role' })

// Enrollments y Courses
Course.hasMany(Enrollment, { foreignKey: 'id_course', as: 'enrollments' })
Enrollment.belongsTo(Course, { foreignKey: 'id_course', as: 'course' })

// Enrollments y Admins
Admin.hasMany(Enrollment, { foreignKey: 'id_admin', as: 'enrollments' })
Enrollment.belongsTo(Admin, { foreignKey: 'id_admin', as: 'admin' })

// Enrollments y Minors
Enrollment.hasMany(Minor, { foreignKey: 'enrollment_id', as: 'minors' })
Minor.belongsTo(Enrollment, { foreignKey: 'enrollment_id', as: 'enrollment' })

// Exportar modelos y función de sincronización
const syncModels = async () => {
<<<<<<< HEAD
  try {
    await connectionDb.sync({ alter: false});
    console.log('Modelos sincronizados con la base de datos (^_-)db(-_^) 🚀');
  } catch (error) {
    console.error('Error al sincronizar modelos:', error.message);
  }
};
=======
    try {
        await connectionDb.sync({ alter: false }) // Actualiza la base de datos según los modelos
        console.log(
            'Modelos sincronizados con la base de datos (^_-)db(-_^) 🚀'
        )
    } catch (error) {
        console.error('Error al sincronizar modelos:', error.message)
    }
}
>>>>>>> a38977c12d07adee7d9dca78224433f174ff4f79

export { Role, Admin, Minor, Enrollment, Course, syncModels }
