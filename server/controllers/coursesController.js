import Course from '../models/courseModel.js';
import Enrollment from '../models/enrollmentModel.js';
import Minor from '../models/minorModel.js';

//GET ALL COURSES
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener todos los cursos', error: error.message });
    }
};

//GET COURSE BY ID
export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'No se encontró el curso' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el curso', error: error.message });
    }
};

//CREATE COURSE
export const createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el curso', error: error.message });
    }
};

//UPDATE COURSE
export const updateCourse = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'No se encontró el curso' });
        }

        await course.update(req.body);
        const updatedCourse = await Course.findByPk(req.params.id);
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el curso', error: error.message });
    }
};

//DELETE COURSE
export const deleteCourseFromDb = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'No se encontró el curso' });
        }

        // Verificar si hay inscripciones asociadas
        const enrollments = await Enrollment.findAll({
            where: {
                id_course: req.params.id
            }
        });

        if (enrollments.length > 0) {
            return res.status(400).json({ 
                message: 'No se puede eliminar el curso porque tiene inscripciones asociadas'
            });
        }

        await course.destroy();
        res.status(200).json({ message: 'Curso eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el curso', error: error.message });
    }
};

// // GET ALL STUDENTS ENROLLED BY COURSE (incluyed course)
// export const getStudentsByCourse = async (req, res) => {
//     try {
//         const { id } = req.params; // id del curso recibido por parámetros

//         const course = await Course.findByPk(id, {
//             include: [
//                 {
//                     model: Enrollment,
//                     as: 'enrollments',  // Alias definido en la relación
//                     include: [
//                         {
//                             model: Minor,
//                             as: 'minors', // Alias para menores
//                             attributes: ['id', 'name', 'age'],  // Campos de los menores
//                         },
//                     ],
//                     attributes: ['id', 'fullname', 'email', 'age', 'is_first_activity', 'group_id', 'accepts_newsletter'],  // Campos de la inscripción
//                 },
//             ],
//         });

//         if (!course) {
//             return res.status(404).json({ message: 'Curso no encontrado' });
//         }

//         res.status(200).json(course);
//     } catch (error) {
//         res.status(500).json({ message: 'Error al obtener los estudiantes inscritos', error: error.message });
//     }
// };

// GET ALL STUDENTS ENROLLED IN A SPECIFIC COURSE
export const getStudentsByCourse = async (req, res) => {
    try {
        const { id } = req.params; // id del curso recibido por parámetros

        // Obtener solo las inscripciones del curso
        const enrollments = await Enrollment.findAll({
            where: {
                id_course: id,  // Filtrar por el curso específico
            },
            include: [
                {
                    model: Minor,
                    as: 'minors', // Alias para menores
                    attributes: ['id', 'name', 'age'], // Campos de los menores
                },
            ],
            attributes: ['id', 'fullname', 'email', 'age', 'is_first_activity', 'group_id', 'accepts_newsletter'],  // Campos de la inscripción
        });

        if (enrollments.length === 0) {
            return res.status(404).json({ message: 'No se encontraron estudiantes para este curso' });
        }

        res.status(200).json(enrollments); // Devuelve solo las inscripciones
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los estudiantes inscritos', error: error.message });
    }
};
