import express from 'express';
import { getAllCourses, getCourseById, createCourse, getStudentsByCourse } from '../controllers/coursesController.js';
import { checkRol } from '../middleware/rolMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const courseRoutes = express.Router();

<<<<<<< HEAD
courseRoutes.get('/', getAllCourses);
courseRoutes.get('/:id',  getCourseById);
=======
courseRoutes.get('/',  getAllCourses);
courseRoutes.get('/:id',  getCourseById);
courseRoutes.get('/:id/students', authMiddleware, checkRol(['superadmin', 'admin', 'facilitator']), getStudentsByCourse);
>>>>>>> b0f98ae38f5cdff601ab95500ba7882bf517697d
courseRoutes.post('/', authMiddleware, checkRol(['superadmin', 'admin']), createCourse);

export default courseRoutes;