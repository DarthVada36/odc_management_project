import Minor from '../models/minorModel.js';
import Enrollment from '../models/enrollmentModel.js';

export const getMinorByCourseId = async (req, res) => {
    try {
        const { course_id } = req.params;

        // Verificar que existen inscripciones para este curso
        const enrollments = await Enrollment.findAll({ where: { id_course: course_id } });
        if (enrollments.length === 0) {
            return res.status(404).json({ message: 'No hay inscripciones para este curso' });
        }

        // Obtener los IDs de las inscripciones
        const enrollmentIds = enrollments.map(enrollment => enrollment.id);

        // Buscar menores asociados a estas inscripciones
        const minors = await Minor.findAll({ where: { enrollment_id: enrollmentIds } });

        res.status(200).json(minors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createMinor = async (req, res) => {
    try {
        const { name, age, enrollment_id } = req.body;
        const minor = await Minor.create({ name, age, enrollment_id });
        res.status(201).json(minor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
