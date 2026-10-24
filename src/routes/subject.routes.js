import { Router } from "express";
import { 
        deleteSubjectById,
        getAllSubjects, 
        getSubjectAndStudents, 
        registerSubject, 
        updateSubjectById } from "../controllers/subject.controller.js";
import { checkValidationsResult } from "../middlewares/validationResultHandler.js";
import { registerSubjectValidations, subjectIdValidations, updateSubjectValidations } from "../middlewares/validations/subject.validations.js";

export const subjectRouter = Router()

//registrar materia
subjectRouter.post('/subjects', registerSubjectValidations, checkValidationsResult, registerSubject)

//traer todas las materias registradas
subjectRouter.get('/subjects', getAllSubjects)

//traer materia por id y alumnos inscriptos
subjectRouter.get('/subjects/:subjectId', subjectIdValidations, checkValidationsResult, getSubjectAndStudents)

//actualizar materia por id
subjectRouter.put('/subjects/:subjectId', updateSubjectValidations, checkValidationsResult, updateSubjectById)

//eliminar materia por id
subjectRouter.delete('/subjects/:subjectId', subjectIdValidations, checkValidationsResult, deleteSubjectById)