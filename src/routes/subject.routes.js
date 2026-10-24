import { Router } from "express";
import { 
        deleteSubjectById,
        getAllSubjects, 
        getSubjectAndStudents, 
        registerSubject, 
        updateSubjectById } from "../controllers/subject.controller.js";
import { checkValidationsResult } from "../middlewares/validationResultHandler.js";

export const subjectRouter = Router()

//registrar materia
subjectRouter.get('/subjects', registerSubjectValidations, checkValidationsResult, registerSubject)

//traer todas las materias registradas
subjectRouter.get('/subjects', getAllSubjects)

//traer materia por id y alumnos inscriptos
subjectRouter.get('/subjects/:subjectId', getSubjectAndStudentsValidations, checkValidationsResult, getSubjectAndStudents)

//actualizar materia por id
subjectRouter.get('/subjects/:subjectId', updateSubjectValidations, checkValidationsResult, updateSubjectById)

//eliminar materia por id
subjectRouter.get('/subjects/:subjectId', deleteSubjectByIdValidations, checkValidationsResult, deleteSubjectById)