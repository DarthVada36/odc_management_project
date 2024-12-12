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



export const getMinorsByEnrollmentId = async (req, res) => {
    try {
        const { enrollment_id } = req.params;

        const minors = await Minor.findAll({ where: { enrollment_id } });
        if (minors.length === 0) {
            return res.status(404).json({ message: "No hay menores asociados a esta inscripción" });
        }

        res.status(200).json(minors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateMinorById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age } = req.body;

        const minor = await Minor.findByPk(id);
        if (!minor) {
            return res.status(404).json({ message: "Menor no encontrado" });
        }

        // Actualizamos solo los campos proporcionados
        minor.name = name || minor.name;
        minor.age = age || minor.age;
        await minor.save();

        res.status(200).json(minor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteMinorById = async (req, res) => {
    try {
        const { id } = req.params;

        const minor = await Minor.findByPk(id);
        if (!minor) {
            return res.status(404).json({ message: "Menor no encontrado" });
        }

        await minor.destroy();
        res.status(200).json({ message: "Menor eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
