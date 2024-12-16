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


//OTRA OPCION DE VALIDACION (HABRÍA QUE REVISAR)
/* import { check } from "express-validator";

export const validateCreateEnrollment = [
    // Validación del nombre completo
    check("fullname")
        .notEmpty()
        .withMessage("El nombre completo es obligatorio"),

    // Validación del correo electrónico
    check("email")
        .notEmpty()
        .withMessage("El email es un campo obligatorio")
        .bail()
        .isEmail()
        .withMessage("Debe ser un correo electrónico válido"),

    // Validación de la edad del titular
    check("age")
        .notEmpty()
        .withMessage("La edad es obligatoria")
        .bail()
        .isInt({ min: 14 })
        .withMessage("El titular debe tener al menos 14 años"),

    // Validación opcional para is_first_activity
    check("is_first_activity")
        .optional()
        .isBoolean()
        .withMessage("Debe ser verdadero o falso"),

    // Validación opcional para accepts_newsletter
    check("accepts_newsletter")
        .optional()
        .isBoolean()
        .withMessage("Debe ser verdadero o falso"),

    // Validación opcional para menores (array de menores)
    check("minors")
        .optional()
        .isArray()
        .withMessage("Los menores deben enviarse como un array"),
    check("minors.*.age")
        .optional()
        .isInt({ max: 14 })
        .withMessage("Todos los menores deben tener 14 años o menos"),

    // Validación opcional para adultos (array de adultos)
    check("adults")
        .optional()
        .isArray()
        .withMessage("Los adultos deben enviarse como un array"),
    check("adults.*.age")
        .optional()
        .isInt({ min: 14 })
        .withMessage("Todos los adultos deben tener al menos 14 años"),
];
 */