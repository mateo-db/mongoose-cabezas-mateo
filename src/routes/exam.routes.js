import { Router } from "express";
import { examIdValidations, registerExamValidations, updateExamValidations } from "../middlewares/validations/exam.validations.js";
import { checkValidationsResult } from "../middlewares/validationResultHandler.js";
import { deleteExamById, getAllExams, getStudentExamById, registerExam, updateExamById } from "../controllers/exam.controller.js";
import { studentIdValidations } from "../middlewares/validations/student.validations.js";

export const examRouter = Router()

//registrar examen
examRouter.post('/exams', registerExamValidations, checkValidationsResult, registerExam)

//traer todos los examenes registrados
examRouter.get('/exams', getAllExams)

//traer examenes de estudiante por id del estudiante
examRouter.get('/exams/:studentId', studentIdValidations, checkValidationsResult, getStudentExamById)

//actualizar examen por id
examRouter.put('/exams/:examId', updateExamValidations, checkValidationsResult, updateExamById)

//eliminar examen por su id
examRouter.delete('/exams/:examId', examIdValidations, checkValidationsResult, deleteExamById)


