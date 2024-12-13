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
        .withMessage("El campo edad es obligatorio"),
]