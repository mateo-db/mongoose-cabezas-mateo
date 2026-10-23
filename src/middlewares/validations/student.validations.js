import { body, param } from 'express-validator'

export const registerStudentValidations = [
    body('first_name')
    .notEmpty().withMessage('El primer nombre es obligatorio')
    .isString().withMessage('El primer nombre debe ser texto')
    .isLength({ min: 3, max: 20}).withMessage('El primer nombre debe ser un texto de entre 3 y 20 carácteres'),
    body('last_name')
    .notEmpty().withMessage('El apellido es obligatorio')
    .isString().withMessage('El apellido debe ser texto')
    .isLength({ min: 3, max: 20}).withMessage('El apellido debe ser un texto de entre 3 y 20 carácteres'),
    body('age')
    .exists({ values: 'undefined' }).withMessage('La edad es obligatoria')
    .isInt({ gt: 10, lt: 19 }).withMessage('La edad debe ser un número entero entre 11 y 18'),
    body('deletedAt')
    .optional()
    .isDate({
        format: 'DD/MM/YYYY',
        strictMode: true
    }).withMessage('El formato de fecha debe ser: Día/Mes/Año')
]

export const updateStudentValidations = [
    body('first_name')
    .optional()
    .notEmpty().withMessage('El primer nombre es obligatorio')
    .isString().withMessage('El primer nombre debe ser texto')
    .isLength({ min: 3, max: 20}).withMessage('El primer nombre debe ser un texto de entre 3 y 20 carácteres'),
    body('last_name')
    .optional()
    .notEmpty().withMessage('El apellido es obligatorio')
    .isString().withMessage('El apellido debe ser texto')
    .isLength({ min: 3, max: 20}).withMessage('El apellido debe ser un texto de entre 3 y 20 carácteres'),
    body('age')
    .optional()
    .exists({ values: 'undefined' }).withMessage('La edad es obligatoria')
    .isInt({ gt: 10, lt: 19 }).withMessage('La edad debe ser un número entero entre 11 y 18'),
    body('deletedAt')
    .optional()
    .isDate({
        format: 'DD/MM/YYYY',
        strictMode: true
    }).withMessage('El formato de fecha debe ser: Día/Mes/Año')
]

//array para validar todas las rutas que reciben un ObjectId de MongoDB por los params de la petición (student)
export const studentIdValidations = [
    param("id")
    .isMongoId().withMessage('El id del estudiante debe ser un ObjectId de MongoDB'),
]

