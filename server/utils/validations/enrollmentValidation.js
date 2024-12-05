// import { check } from "express-validator";

// export const validateCreateEnrollment = [
//     check("fullName")
//         .notEmpty()
//         .withMessage("El nombre completo es obligatorio"),
//     check("email")
//         .notEmpty()
//         .withMessage("El email es un campo obligatorio"),
//     // check("gender")
//     //     .notEmpty()
//     //     .withMessage("La genero no puede estar vacío"),
//     check("age")
//         .notEmpty()
//         .withMessage("Es obligatorio seleccionar un rango de edad"),
//     check("is_first_activity")
//         .notEmpty()
//         .withMessage("Debe seleccionar una opción"),
//     // check("is_first_activity")
//     //     .isBoolean()
//     //     .withMessage("Debe seleccionar una actividad"),
//     check("group_id")
//         .notEmpty()
//         .withMessage("Debe seleccionar un grupo")
//         .bail()
//         .isInt()
//         .withMessage("Debe seleccionar un grupo"),
//     check("accepts_newsletter")
//         .notEmpty()
//         .withMessage("Debe seleccionar una opción")
// ]