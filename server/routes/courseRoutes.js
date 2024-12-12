import express from 'express';
import { 
    getAllCourses, 
    getCourseById, 
    createCourse, 
    getStudentsByCourse,
    updateCourse,
    deleteCourseFromDb    
} from '../controllers/coursesController.js';
import { checkRol } from '../middleware/rolMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const courseRoutes = express.Router();

courseRoutes.get('/',  getAllCourses);
courseRoutes.get('/:id',  getCourseById);
courseRoutes.get('/:id/students', getStudentsByCourse);
courseRoutes.post('/', authMiddleware, checkRol(['superadmin', 'admin']), createCourse);
courseRoutes.put('/:id', updateCourse);
courseRoutes.delete('/:id', deleteCourseFromDb);

export default courseRoutes;