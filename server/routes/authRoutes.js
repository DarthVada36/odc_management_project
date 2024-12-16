import { Router } from 'express'
import { registerAdmin, loginAdmin } from '../controllers/authController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { checkRol } from '../middleware/rolMiddleware.js'
import { checkUsername } from '../controllers/authController.js'

const router = Router()

//Ruta de registro
router.post('/register', registerAdmin)

//Ruta de login
router.post('/login', loginAdmin)

router.post('/check-username', checkUsername)

export default router
