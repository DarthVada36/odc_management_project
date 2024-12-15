import { check } from "express-validator";

export const validateCreateEnrollment = [
    check("fullName")
        .notEmpty()
        .withMessage("El nombre es obligatorio"),
    check("email")
        .notEmpty()
        .withMessage("El email es un campo obligatorio"),
    check("age")
        .notEmpty()
        .withMessage("El campo edad es obligatorio")
        .isInt({ min: 15})
        .withMessage("El campo edad debe ser un número entero desde 15 años"),
]

export const validateUpdateEnrollment = [
    check("fullName")
        .notEmpty()
        .withMessage("El nombre es obligatorio"),
    check("email")
        .notEmpty()
        .withMessage("El email es un campo obligatorio"),
    check("age")
        .notEmpty()
        .withMessage("El campo edad es obligatorio"),
]
