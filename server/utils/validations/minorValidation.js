import { check } from "express-validator";

export const validateCreateMinor = [
    check("name")
        .notEmpty()
        .withMessage("El nombre es obligatorio"),

    check("age")
        .notEmpty()
        .withMessage("La edad es obligatoria")
        .isInt({ min: 0, max: 14 })
        .withMessage("La edad debe ser un número entero entre 0 y 14"),

    check("enrollment_id")
        .notEmpty()
        .withMessage("El ID de inscripción es obligatorio")
        .isInt()
        .withMessage("El ID de inscripción debe ser un número entero válido"),
];

export const validateUpdateMinor = [
    check("name")
        .optional()
        .notEmpty()
        .withMessage("El nombre no puede estar vacío"),

    check("age")
        .optional()
        .isInt({ min: 0, max: 14 })
        .withMessage("La edad debe ser un número entero entre 0 y 14"),

    check("enrollment_id")
        .optional()
        .isInt()
        .withMessage("El ID de inscripción debe ser un número entero válido"),
];