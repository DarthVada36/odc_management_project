import express from 'express';
import { getAllCourses, getCourseById, createCourse } from '../controllers/coursesController.js';
import { checkRol } from '../middleware/rolMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const courseRoutes = express.Router();

courseRoutes.get('/', getAllCourses);
courseRoutes.get('/:id',  getCourseById);
courseRoutes.post('/', authMiddleware, checkRol(['superadmin', 'admin']), createCourse);

export default courseRoutes;