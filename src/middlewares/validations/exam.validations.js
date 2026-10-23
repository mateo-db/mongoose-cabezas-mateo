import { body, param } from "express-validator";

export const registerExamValidations = [
    body('examinee')
    .notEmpty().withMessage('El id del estudiante examinado es obligatorio')
    .isMongoId().withMessage('El ID del estudiante examinado debe ser un ObjectId de MongoDB'),
    body('subject')
    .notEmpty().withMessage('El nombre de la materia es obligatorio')
    .isString().withMessage('El nombre de la materia debe ser texto'),
    body('grade')
    .exists({ values: 'undefined' }).withMessage('La nota numérica es obligatoria')
    .isInt({ gt: -1, lt: 11 }).withMessage('El valor de la nota debe ser un número entero entre 0 y 10')
    .toInt(),
    body('semester')
    .optional()
    .isString().isIn(['first', 'second']).withMessage('El semestre debe ser un texto con uno de dos valores: first o second'),
    body('semester.date') //validación de propiedad embebida en exam
    .optional()
    .isDate().withMessage('La fecha debe de ser de un formáto válido (Ejemplo: 2026-10-23')
]

export const updateExamValidations = [
    body('examinee')
    .optional()
    .notEmpty().withMessage('El id del estudiante examinado es obligatorio')
    .isMongoId().withMessage('El ID del estudiante examinado debe ser un ObjectId de MongoDB'),
    body('subject')
    .optional()
    .notEmpty().withMessage('El nombre de la materia es obligatorio')
    .isString().withMessage('El nombre de la materia debe ser texto'),
    body('grade')
    .optional()
    .exists({ values: 'undefined' }).withMessage('La nota numérica es obligatoria')
    .isInt({ gt: -1, lt: 11 }).withMessage('El valor de la nota debe ser un número entero entre 0 y 10')
    .toInt(),
    body('semester')
    .optional()
    .isString().isIn(['first', 'second']).withMessage('El semestre debe ser un texto con uno de dos valores: first o second'),
    body('semester.date') //validación de propiedad embebida en exam
    .optional()
    .isDate().withMessage('La fecha debe de ser de un formáto válido (Ejemplo: 2026-10-23')
]

export const idExamValidations = [
    param('id')
    .isMongoId().withMessage('El id del exámen o estudiante que se envía por parámetros debe ser un ObjectId de MongoDB')
]