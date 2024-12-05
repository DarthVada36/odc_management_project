import express from 'express'
import {
    createRole,
    getRoles,
    getRoleById,
    updateRole,
    deleteRole,
} from '../controllers/roleController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { checkRol } from '../middleware/rolMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, checkRol(['superadmin']), createRole)
router.get('/', authMiddleware, checkRol(['superadmin']), getRoles)
router.get('/:id', authMiddleware, checkRol(['superadmin']), getRoleById)
// router.put('/:id', updateRole)
// router.delete('/:id', deleteRole)

export default router
