import { Router } from "express";
import { registerAdmin, loginAdmin } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkRol } from "../middleware/rolMiddleware.js";




const router = Router();

//Ruta de registro
router.post('/register', authMiddleware, checkRol(['superadmin']),registerAdmin);

//Ruta de login
router.post('/login', loginAdmin);

export default router;