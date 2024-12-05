import { Router } from "express";
import { registerAdmin, loginAdmin } from "../controllers/authController.js";




const router = Router();

//Ruta de registro
router.post('/register', registerAdmin);

//Ruta de login
router.post('/login', loginAdmin);

export default router;