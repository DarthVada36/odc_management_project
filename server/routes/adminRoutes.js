import express from 'express'
import {
    createAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
} from '../controllers/adminController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { checkRol } from '../middleware/rolMiddleware.js'
import { validateCreateAdmin, validateUpdateAdmin } from '../utils/validations/adminValidation.js'
import validationHandler from '../utils/handle/handleValidator.js'

const router = express.Router()

<<<<<<< HEAD
router.post('/', validateCreateAdmin, validationHandler, createAdmin)
router.get('/', getAdmins)
router.get('/:id',  getAdminById)
router.put('/:id', validateUpdateAdmin, validationHandler, authMiddleware, checkRol(['superadmin', 'admin']), updateAdmin)
router.delete('/:id',  deleteAdmin)
=======
router.post('/', createAdmin) // Modificado para usar el middleware de autenticación
router.get('/', getAdmins)
router.get('/:id', getAdminById)
router.put('/:id', authMiddleware, checkRol(['superadmin']), updateAdmin)
router.delete('/:id', deleteAdmin)
>>>>>>> dev

export default router
