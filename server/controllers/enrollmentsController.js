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
                    attributes: ['id', 'name', 'age' ],
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
            return res.status(404).json({ message: "Enrollment not found" });
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
                    attributes: ['id', 'name', 'age' ],
                },
            ],
        });
        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
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
                    attributes: ['id', 'name', 'age' ],
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
        const { fullname, email, gender, age, is_first_activity, id_admin, id_course, group_id, accepts_newsletter, minors, createdAt, updatedAt } = req.body;

        const enrollment = await Enrollment.findByPk(id,
            {transaction}
        );

        if (!enrollment) {
            await transaction.rollback();
            return res.status(404).json({ message: "Enrollment not found" });
        }

        await Enrollment.update({
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
            transaction
        });
        if (minors && minors.length > 0) {
for(const minor of minors) {
    if(minor.id) {
        await Minor.update({
            name: minor.name,
            age: minor.age,
        },
        {
            where: { id: minor.id },
            transaction
        });
    } else {
        await Minor.create({
            name: minor.name,
            age: minor.age,
            enrollment_id: id,
        },
        {
            transaction
        });
    }
}
        }
        await transaction.commit();
        const updatedEnrollment = await Enrollment.findOne({
            where: { id },
            include: [
                {
                    model: Minor,
                    as: 'minors',
                    attributes: ['id', 'name', 'age' ],
                },
            ],
        });
        res.status(200).json(updatedEnrollment);
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};

// DELETE ENROLLMENT BY ID
export const deleteEnrollmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const enrollment = await Enrollment.destroy(
            { 
                where: { id } 
            });
        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};              