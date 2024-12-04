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

const router = express.Router()

router.post('/', authMiddleware, checkRol(['superadmin']), createAdmin)
router.get('/', authMiddleware, checkRol(['superadmin', 'admin']), getAdmins)
router.get('/:id', authMiddleware, checkRol(['superadmin', 'admin']), getAdminById)
router.put('/:id', authMiddleware, checkRol(['superadmin']), updateAdmin)
router.delete('/:id', authMiddleware, checkRol(['superadmin']), deleteAdmin)

export default router