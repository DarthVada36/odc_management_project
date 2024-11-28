import Enrollment from '../models/enrollmentModel.js';

// GET ALL ENROLLMENTS
export const getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.findAll();
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

// CREATE ENROLLMENT
export const createEnrollment = async (req, res) => {
    try {
        const { fullname, email, gender, age, is_first_activity, id_admin, id_course, group_id, accepts_newsletter, createdAt, updatedAt } = req.body;
        const enrollment = new Enrollment({
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
        });
        await enrollment.save();
        res.status(201).json(enrollment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE ENROLLMENT BY ID
export const updateEnrollmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullname, email, gender, age, is_first_activity, id_admin, id_course, group_id, accepts_newsletter, createdAt, updatedAt } = req.body;
        const enrollment = await Enrollment.update(
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
            { where: { id } }
        );
        const updatedEnrollment = await Enrollment.findByPk(id);
        if (!updatedEnrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }
        res.status(200).json(updatedEnrollment);
    } catch (error) {
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