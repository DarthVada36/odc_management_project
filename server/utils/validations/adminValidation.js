import { check } from "express-validator";

export const validateCreateAdmin = [
    check("username")
        .notEmpty()
        .withMessage("El nombre de usuario es obligatorio"),

    check("password")
        .notEmpty()
        .withMessage("La contraseña es obligatoria"),

    check("role_id")
        .notEmpty()
        .withMessage("El ID del rol es obligatorio")
        .isInt({ min: 1 })
        .withMessage("El ID del rol debe ser un número entero positivo"),
];

export const validateUpdateAdmin = [
    check("username")
        .notEmpty()
        .withMessage("El nombre de usuario es obligatorio"),

    check("role_id")
        .optional()
        .isInt({ min: 1 })
        .withMessage("El ID del rol debe ser un número entero positivo"),
];
