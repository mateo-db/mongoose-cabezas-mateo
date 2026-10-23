import { Router } from "express";
import { 
    registerStudentValidations, 
    studentIdValidations, 
    updateStudentValidations } from "../middlewares/validations/student.validations.js";
import { checkValidationsResult } from "../middlewares/validationResultHandler.js";
import { 
    deleteStudentById, 
    getAllStudents, 
    getStudentAndExams, 
    getStudentById, 
    registerStudent, 
    updateStudentById } from "../controllers/student.controller.js";

export const studentRouter = Router()

//traer un estudiante por su id
studentRouter.get('/students/:idStudent', studentIdValidations, checkValidationsResult, getStudentById)

//traer un estudiante por su id y examenes
studentRouter.get('/students/:idStudent', studentIdValidations, checkValidationsResult, getStudentAndExams) //elegimos un nombre descriptivo para identificar el parametro que se usará en el endpoint y que usará el controlador (idStudent)

//actualizar un estudiante por su id
studentRouter.put('/students/:idStudent', updateStudentValidations, checkValidationsResult, updateStudentById)

//eliminar un estudiante por su id
studentRouter.delete('/students/:idStudent', deleteStudentById)

//registrar un estudiante
studentRouter.post('/students', registerStudentValidations, checkValidationsResult, registerStudent)

//traer todos los estudiantes 
studentRouter.get('/students', getAllStudents) 

