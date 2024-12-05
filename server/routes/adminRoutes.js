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
router.get('/', getAdmins)
router.get('/:id',  getAdminById)
router.put('/:id', authMiddleware, checkRol(['superadmin']), updateAdmin)
router.delete('/:id',  deleteAdmin)

export default router