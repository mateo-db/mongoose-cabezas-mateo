import { Router } from "express";
import { deleteStudentFile, getAllStudentFiles, getStudentsFile, registerStudentFile, updateStudentFileById } from "../controllers/student_file.controller.js";
import { registerStudentFileValidations, studentFileIdValidations, updateStudentFileValidations } from "../middlewares/validations/student_file.validations.js";
import { checkValidationsResult } from "../middlewares/validationResultHandler.js";
import { studentIdValidations } from "../middlewares/validations/student.validations.js";

export const studentFileRouter = Router()

//registrar una ficha estudiantil
studentFileRouter.post('/student-files', registerStudentFileValidations, checkValidationsResult, registerStudentFile)

//traer todas las fichas estudiantiles poblando estudiantes y sus examenes aprobados
studentFileRouter.get('/student-files', getAllStudentFiles)

//traer ficha estudiantil por id del estudiante
studentFileRouter.get('/student-files/student/:studentId', studentIdValidations, checkValidationsResult, getStudentsFile)

//actualizar ficha estudiantil por su id
studentFileRouter.put('/student-files/:studentFileId', updateStudentFileValidations, checkValidationsResult, updateStudentFileById)

//eliminar ficha estudiantil por su id

studentFileRouter.delete('/student-files/:studentFileId', studentFileIdValidations, checkValidationsResult, deleteStudentFile)

