import Enrollment from '../models/enrollmentModel.js';
import Minor from '../models/minorModel.js';
import sequelize from '../database/connectionDb.js';

// GET ALL ENROLLMENTS
export const getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.findAll({
            include: [
                {
                    model: Minor,
                    as: 'minors',
                    attributes: ['id', 'name', 'age'],
                },
            ],
        });
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ENROLLMENT BY ID
export const getEnrollmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const enrollment = await Enrollment.findByPk(id);
        if (!enrollment) {
            return res.status(404).json({ message: "Inscripción no encontrada" });
        }
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ENROLLMENT BY ID INCLUDING MINORS
export const getEnrollmentByIdWithMinors = async (req, res) => {
    try {
        const { id } = req.params;
        const enrollment = await Enrollment.findByPk(id, {
            include: [
                {
                    model: Minor,
                    as: 'minors',
                    attributes: ['id', 'name', 'age'],
                },
            ],
        });
        if (!enrollment) {
            return res.status(404).json({ message: "Inscripción no encontrada" });
        }
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREATE ENROLLMENT INCLUDING MINORS
export const createEnrollment = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { fullname, email, gender, age, is_first_activity, id_admin, id_course, group_id, accepts_newsletter, createdAt, updatedAt, minors } = req.body;

        const enrollment = await Enrollment.create({
            fullname,
            email,
            gender,
            age,
            is_first_activity: is_first_activity || false,
            id_admin: id_admin || 8,
            id_course,
            group_id,
            accepts_newsletter: accepts_newsletter || false,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
            { transaction });

        if (minors && minors.length > 0) {
            const minorData = minors.map((minor) => ({
                ...minor,
                enrollment_id: enrollment.id,
            }));
            await Minor.bulkCreate(minorData, { transaction });
        }
        await transaction.commit();

        const createdEnrollment = await Enrollment.findOne({
            where: { id: enrollment.id },
            include: [
                {
                    model: Minor,
                    as: 'minors',
                    attributes: ['id', 'name', 'age'],
                },
            ],
        });
        res.status(201).json(createdEnrollment);
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};

// UPDATE ENROLLMENT BY ID

// export const updateEnrollmentById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { fullname, email, gender, age, is_first_activity, id_admin, id_course, group_id, accepts_newsletter, createdAt, updatedAt, minors } = req.body;
//         const enrollment = await Enrollment.update(
//             {
//                 fullname,
//                 email,
//                 gender,
//                 age,
//                 is_first_activity,
//                 id_admin,
//                 id_course,
//                 group_id,
//                 accepts_newsletter,
//                 createdAt,
//                 updatedAt
//             },
//             {
//                 where: { id }
//             });
//         if (!enrollment) {
//             return res.status(404).json({ message: "Inscripción no encontrada" });
//         }
//         res.status(200).json(enrollment);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// UPDATE ENROLLMENT BY ID INCLUDING MINORS
export const updateEnrollmentById = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { minors } = req.body;

        const enrollment = await Enrollment.findByPk(id, { transaction });
        if (!enrollment) {
            await transaction.rollback();
            return res.status(404).json({ message: "Inscripción no encontrada" });
        }

        if (minors && minors.length > 0) {
            for (const minor of minors) {
                if (minor.id) {
                    const [updatedRows] = await Minor.update(minor, {
                        where: {
                            id: minor.id,
                            enrollment_id: id // Verifica que el menor pertenece a este enrollment
                        },
                        transaction
                    });

                    // Si no se actualizó ningún registro, el menor no existe o no pertenece al enrollment
                    if (updatedRows === 0) {
                        await transaction.rollback();
                        return res.status(404).json({
                            message: `Minor with id ${minor.id} not found for this enrollment`
                        });
                    }
                }
            }
        }

        await transaction.commit();
        res.status(200).json({ message: "Información menores actualizada correctamente" });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};

// DELETE ENROLLMENT BY ID
export const deleteEnrollmentById = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { id } = req.params;
        const enrollment = await Enrollment.findByPk(id, { transaction });
        if (!enrollment) {
            await transaction.rollback();
            return res.status(404).json({ message: "Inscripción no encontrada" });
        }
        await Minor.destroy({
            where: { enrollment_id: id },
            transaction
        });

        await enrollment.destroy({ transaction });
        await transaction.commit();
        res.status(200).json({ message: "Inscripción eliminada correctamente" });
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};