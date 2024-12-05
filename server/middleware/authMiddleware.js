import { handleHttpError } from "../utils/handleError.js";
import { tokenVerify } from "../utils/handleJwt.js";
import Admin from "../models/adminModel.js";

// import jwt from 'jsonwebtoken';

// export const authenticate = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     req.admin = decoded; 
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Token inválido o expirado.' });
//   }
// };



export const authMiddleware = async (req, res, next) => {
  try {
    if  (!req.headers.authorization) {
      return handleHttpError(res, "NEED_SESSION", 401);
    }
    const token = req.headers.authorization.split(' ').pop();
    const dataToken = await tokenVerify(token);

    if (!dataToken.id){
      return handleHttpError(res, "ERROR_ID_TOKEN", 401);
    }

    const user = await Admin.findByPk(dataToken.id);
    req.user = user;

    next();
  } catch (error) {
    handleHttpError(res, "NOT_SESSION", 401);
  }
};