import Course from '../models/courseModel.js';

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