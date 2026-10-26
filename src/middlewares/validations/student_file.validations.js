import { body, param } from "express-validator";
import { ExamModel } from "../../models/exam.model.js";

export const registerStudentFileValidations = [
    body('student')
    .notEmpty().withMessage('El id del estudiante es obligatorio')
    .isMongoId().withMessage('El id del estudiante debe ser un ObjectId de MongoDB'),
    body('birth_date')
    .notEmpty().withMessage('La fecha de nacimiento del estudiante es obligatoria')
    .isDate().withMessage('La fecha de nacimiento del estudiante debe ser de un formato válido (Ejemplo: 2026-10-15'),
    body('birth_place')
    .trim()
    .notEmpty().withMessage('El lugar de nacimiento del estudiante es obligatorio')
    .isString().withMessage('El lugar de nacimiento del estudiante debe ser un texto'),
    body('nationality')
    .trim()
    .notEmpty().withMessage('La nacionalidad del estudiante es obligatoria')
    .isString().withMessage('La nacionalidad del estudiante debe ser un texto'),
    body('exams_passed')
    .optional()
    .isArray().withMessage('Los exámenes aprobados del estudiante deben venir en un arreglo'),
    body('exams_passed.*')
    .optional()
    .isMongoId().withMessage('El id del exámen aprobado del estudiante debe ser un ObjectId de MongoDB')
    .bail()
    .custom(async (examId) => {
        const examExists = await ExamModel.findById(examId)
        if (!examExists || examExists.deletedAt !== null) {
            throw new Error('Ese exámen aprobado por el estudiante no se encuentra registrado o fue invalidado')
        }
        return true 
    })
]

export const updateStudentFileValidations = [
    param('studentFileId')
    .isMongoId().withMessage('El id de la ficha estudiantil debe ser un ObjectId de MongoDB'),
    body('student')
    .optional()
    .notEmpty().withMessage('El id del estudiante es obligatorio')
    .isMongoId().withMessage('El id del estudiante debe ser un ObjectId de MongoDB'),
    body('birth_date')
    .optional()
    .notEmpty().withMessage('La fecha de nacimiento del estudiante es obligatoria')
    .isDate().withMessage('La fecha de nacimiento del estudiante debe ser de un formato válido (Ejemplo: 2026-10-15'),
    body('birth_place')
    .optional()
    .trim()
    .notEmpty().withMessage('El lugar de nacimiento del estudiante es obligatorio')
    .isString().withMessage('El lugar de nacimiento del estudiante debe ser un texto'),
    body('nationality')
    .optional()
    .trim()
    .notEmpty().withMessage('La nacionalidad del estudiante es obligatoria')
    .isString().withMessage('La nacionalidad del estudiante debe ser un texto'),
    body('exams_passed')
    .optional()
    .isArray().withMessage('Los exámenes aprobados del estudiante deben venir en un arreglo'),
    body('exams_passed.*')
    .optional()
    .isMongoId().withMessage('El id del exámen aprobado del estudiante debe ser un ObjectId de MongoDB')
    .bail()
    .custom(async (examId) => {
        const examExists = await ExamModel.findById(examId)
        if (!examExists || examExists.deletedAt !== null) {
            throw new Error('Ese exámen aprobado por el estudiante no se encuentra registrado o fue invalidado')
        }
        return true 
    })
]

export const studentFileIdValidations = [
    param('studentFileId')
    .isMongoId().withMessage('El id de la ficha estudiantil debe ser un ObjectId de MongoDB')
]