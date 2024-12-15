import { check } from "express-validator";

export const validateCreateCourse = [
    check("title")
        .notEmpty()
        .withMessage("El título es obligatorio")
        .isLength({ min: 5, max: 255 })
        .withMessage("El título debe tener entre 5 y 255 caracteres"),

    check("description")
        .notEmpty()
        .withMessage("La descripción es obligatoria"),

    check("date")
        .notEmpty()
        .withMessage("La fecha es obligatoria"),

    // check("schedule")
    //     .notEmpty()
    //     .withMessage("El horario es obligatorio")
    //     .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    //     .withMessage("El horario debe estar en formato HH:mm"),

    check("link")
        .notEmpty()
        .withMessage("El enlace es obligatorio")
        .isURL()
        .withMessage("El enlace debe ser una URL válida"),

    check("tickets")
        .notEmpty()
        .withMessage("El número de entradas es obligatorio")
        .isInt({ min: 0 })
        .withMessage("El número de entradas debe ser un entero positivo"),
];

export const validateUpdateCourse = [

    check("title")
        .optional()
        .isLength({ min: 5, max: 255 })
        .withMessage("El título debe tener entre 5 y 255 caracteres"),

    check("description")
        .optional()
        .notEmpty()
        .withMessage("La descripción no puede estar vacía"),

    // check("schedule")
    //     .optional()
    //     .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    //     .withMessage("El horario debe estar en formato HH:mm"),

    check("link")
        .optional()
        .isURL()
        .withMessage("El enlace debe ser una URL válida"),

    check("tickets")
        .optional()
        .isInt({ min: 0 })
        .withMessage("El número de entradas debe ser un entero positivo o cero"),
];
