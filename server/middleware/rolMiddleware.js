import { handleHttpError } from "../utils/handleError.js";
import Role from '../models/roleModel.js';

/**
 * Middleware para verificar el rol del usuario basado en el nombre del rol.
 * @param {Array} reqRoles - Lista de nombres de roles permitidos.
 */
export const checkRol = (reqRoles) => async (req, res, next) => {
  try {
    const { user } = req;

    if (!user) {
      return handleHttpError(res, "USER_NOT_FOUND", 401);
    }

    // Obtenemos el role_id del usuario desde el token (req.user)
    const { role_id } = user;

    // Buscamos el rol en la tabla `Role`
    const role = await Role.findByPk(role_id);

    if (!role) {
      return handleHttpError(res, "ROLE_NOT_FOUND", 403);
    }

    // Verificamos si el nombre del rol está en la lista de roles permitidos
    const isAuthorized = reqRoles.includes(role.name);

    if (!isAuthorized) {
      return handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
    }

    next(); // Usuario autorizado, continúa al siguiente middleware
  } catch (error) {
    handleHttpError(res, "ERROR_PERMISSIONS", 403);
  }
};