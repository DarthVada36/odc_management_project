import express from 'express'
import {
    getAllCourses,
    getCourseById,
    createCourse,
    getStudentsByCourse,
    updateCourse,
<<<<<<< HEAD
    deleteCourseFromDb    
} from '../controllers/coursesController.js';
import { checkRol } from '../middleware/rolMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateCreateCourse,validateUpdateCourse } from '../utils/validations/courseValidation.js';
import  validationHandler from '../utils/handle/handleValidator.js';
=======
    deleteCourseFromDb,
} from '../controllers/coursesController.js'
import { checkRol } from '../middleware/rolMiddleware.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
>>>>>>> dev

const courseRoutes = express.Router()

<<<<<<< HEAD
courseRoutes.get('/',  getAllCourses);
courseRoutes.get('/:id',  getCourseById);
courseRoutes.get('/:id/students', getStudentsByCourse);
courseRoutes.post('/', validateCreateCourse, validationHandler, authMiddleware, checkRol(['superadmin', 'admin']), createCourse);
courseRoutes.put('/:id', validateUpdateCourse, validationHandler, updateCourse);
courseRoutes.delete('/:id', deleteCourseFromDb);
=======
courseRoutes.get('/', getAllCourses)
courseRoutes.get('/:id', getCourseById)
courseRoutes.get('/:id/students', getStudentsByCourse)
courseRoutes.post(
    '/',
    authMiddleware,
    checkRol(['superadmin', 'admin']),
    createCourse
)
courseRoutes.put('/:id', updateCourse)
courseRoutes.delete('/:id', deleteCourseFromDb)
>>>>>>> dev

export default courseRoutes
