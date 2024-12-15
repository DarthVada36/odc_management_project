import { check } from "express-validator";

export const validateCreateRole = [
    check("name")
        .notEmpty()
        .withMessage("El nombre del rol es obligatorio")
        .isString()
        .withMessage("El nombre del rol debe ser una cadena de texto"),
];

export const validateUpdateRole = [
    check("name")
        .optional()
        .notEmpty()
        .withMessage("El nombre del rol no puede estar vacío")
        .isString()
        .withMessage("El nombre del rol debe ser una cadena de texto"),
];