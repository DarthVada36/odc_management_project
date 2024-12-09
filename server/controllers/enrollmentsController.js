import Enrollment from '../models/enrollmentModel.js';
import Course from '../models/courseModel.js';
import Minor from '../models/minorModel.js';
import sequelize from '../database/connectionDb.js';

// GET ALL ENROLLMENTS
export const getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.findAll({
            include: [
                {
                    model: Course,
                    as: 'course',
                    attributes: ['title'], // Solo incluye el título del curso
                }, 
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
            is_first_activity,
            id_admin,
            id_course,
            group_id,
            accepts_newsletter,
            createdAt,
            updatedAt
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

export const updateEnrollmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullname, email, gender, age, is_first_activity, id_admin, id_course, group_id, accepts_newsletter, createdAt, updatedAt, minors } = req.body;

        if (minors && minors.length > 0) {

            try {
                const minorData = await Promise.all(
                    minors.map(async (minorItem) => {
                        const [updatedMinor] = await Minor.update(
                            {
                                name: minorItem.name,
                                age: minorItem.age,
                            },
                            {
                                where: {
                                    id: minorItem.id
                                    , enrollment_id: id // Verifica que el menor pertenece a este enrollment
                                },
                                returning: true,
                            }
                        );
                        return updatedMinor;
                    })
                );
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        }

        const updatedEnrollment = await Enrollment.update(
            {
                fullname,
                email,
                gender,
                age,
                is_first_activity,
                id_admin,
                id_course,
                group_id,
                accepts_newsletter,
                createdAt,
                updatedAt
            },
            {
                where: { id },
            });

        if (!updatedEnrollment) {
            return res.status(404).json({ message: "Inscripción no encontrada" });
        }
        // res.status(200).json(updatedEnrollment);

        const enrollment = await Enrollment.findByPk(id, {
            include: [
                {
                    model: Minor,
                    as: 'minors',
                    attributes: ['id', 'name', 'age'],
                },
            ],
        });

        res.status(200).json(enrollment);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// // UPDATE ENROLLMENT BY ID INCLUDING MINORS
// export const updateEnrollmentById = async (req, res) => {
//     const transaction = await sequelize.transaction();
//     try {
//         const { id } = req.params;
//         const { minors } = req.body;
//         console.log(req.body);

//         const enrollment = await Enrollment.findByPk(id, { transaction });
//         if (!enrollment) {
//             await transaction.rollback();
//             return res.status(404).json({ message: "Inscripción no encontrada" });
//         }

//         if (minors && minors.length > 0) {
//             for (const minor of minors) {
//                 if (minor.id) {
//                     const [updatedRows] = await Minor.update(minor, {
//                         where: {
//                             id: minor.id,
//                             enrollment_id: id // Verifica que el menor pertenece a este enrollment
//                         },
//                         transaction
//                     });

//                     // Si no se actualizó ningún registro, el menor no existe o no pertenece al enrollment
//                     if (updatedRows === 0) {
//                         await transaction.rollback();
//                         return res.status(404).json({
//                             message: `Minor with id ${minor.id} not found for this enrollment`
//                         });
//                     }
//                 }
//             }
//         }

//         await transaction.commit();
//         res.status(200).json({ message: "Información menores actualizada correctamente" });
//     } catch (error) {
//         await transaction.rollback();
//         res.status(500).json({ message: error.message });
//     }
// };

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