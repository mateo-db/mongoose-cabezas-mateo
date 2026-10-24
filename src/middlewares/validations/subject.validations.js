import { body, param } from "express-validator";
import { StudentModel } from "../../models/student.model.js";

export const registerSubjectValidations = [
    body('name')
    .notEmpty().withMessage('El nombre de la materia es obligatorio')
    .isString().withMessage('El nombre de la materia debe ser texto'),
    body('teacher')
    .notEmpty().withMessage('El nombre completo del profesor es obligatorio')
    .isString().withMessage('El nombre completo del profesor debe ser texto'),
    body('students_enrolled') //validaciones del array de referencias
    .isArray().withMessage('Los estudiantes inscriptos deben venir un arreglo'), //validamos que sea un arreglo
    body('students_enrolled.*') // esto hace que express validator "recorra" el array, validando cada uno de los elementos. es decir, por cada elemento del array, se realizarán las validaciones de abajo
    .isMongoId().withMessage('El id del estudiante inscripto debe ser un ObjectId de MongoDB')
    .bail() //evitamos que las validaciones sigan si la anterior falló
    .custom(async (studentId) => { //validación para verificar si el estudiante inscripto existe o si está activo
        const studentExists = await StudentModel.findById(studentId)
        if (!studentExists || studentExists.deletedAt !== null) {
            throw new Error(`El estudiante inscripto con id ${studentId} no se encuentra registrado o no está activo`)
        }
        return true
    }),
    body('students_enrolled') //validación sobre el array entero para verificar si existen alumnos duplicados
    .custom((students_enrolled) => {
        if (new Set(students_enrolled).size !== students_enrolled.length) {
            throw new Error ('El mismo estudiante no puede estar inscripto en la materia más de 1 vez')
        }
        return true
    })
]

export const updateSubjectValidations = [
    param('subjectId')
    .isMongoId().withMessage('El id de la materia debe ser un ObjectId de MongoDB'),
    body('name')
    .optional()
    .notEmpty().withMessage('El nombre de la materia es obligatorio')
    .isString().withMessage('El nombre de la materia debe ser texto'),
    body('teacher')
    .optional()
    .notEmpty().withMessage('El nombre completo del profesor es obligatorio')
    .isString().withMessage('El nombre completo del profesor debe ser texto'),
    body('students_enrolled') //validaciones del array de referencias
    .optional()
    .isArray().withMessage('Los estudiantes inscriptos deben venir un arreglo'), //validamos que sea un arreglo
    body('students_enrolled.*') // esto hace que express validator "recorra" el array, validando cada uno de los elementos. es decir, por cada elemento del array, se realizarán las validaciones de abajo
    .optional()
    .isMongoId().withMessage('El id del estudiante inscripto debe ser un ObjectId de MongoDB')
    .bail() //evitamos que las validaciones sigan si la anterior falló
    .custom(async (studentId) => {
        const studentExists = await StudentModel.findById(studentId)
        if (!studentExists || studentExists.deletedAt !== null) {
            throw new Error(`El estudiante inscripto con id ${studentId} no se encuentra registrado`)
        }
        return true
    }),
    body('students_enrolled') //validación sobre el array entero para verificar si existen alumnos duplicados
    .optional()
    .custom((students_enrolled) => {
        if (new Set(students_enrolled).size !== students_enrolled.length) {
            throw new Error ('El mismo estudiante no puede estar inscripto en la materia más de 1 vez')
        }
        return true
    })
]

export const subjectIdValidations = [
    param('subjectId')
    .isMongoId().withMessage('El id de la materia debe ser un ObjectId de MongoDB')
]