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

router.post('/', validateCreateAdmin, validationHandler, createAdmin)
router.get('/', getAdmins)
router.get('/:id',  getAdminById)
router.put('/:id', validateUpdateAdmin, validationHandler, authMiddleware, checkRol(['superadmin', 'admin']), updateAdmin)
router.delete('/:id',  deleteAdmin)

export default router