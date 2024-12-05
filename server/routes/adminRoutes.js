import express from 'express'
import {
    createAdmin,
    getAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
} from '../controllers/adminController.js'

const router = express.Router()

router.post('/', createAdmin)
router.get('/', getAdmins)
router.get('/:id', getAdminById)
router.put('/:id', updateAdmin)
router.delete('/:id', deleteAdmin)

export default router
