import { ExamModel } from '../models/exam.model.js'
import { SubjectModel } from '../models/subject.model.js'
import { StudentModel } from '../models/student.model.js'
import { matchedData } from 'express-validator'

//registrar (crear) un estudiante
export const registerStudent = async (req, res) => {
    try {
        const { first_name, last_name, age } = matchedData(req, {locations: ['body']})
        const newStudent = await StudentModel.create({
            first_name,
            last_name,
            age
        })

        return res.status(201).json({
            message: "Estudiante registrado correctamente",
            data: newStudent
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

//traer todos los estudiantes
export const getAllStudents = async (_req, res) => {
    try {
        const allStudents = await StudentModel.find()

        if (!allStudents) {
            return res.status(404).json({
                message: "No se encontraron estudiantes registrados"
            })
        }

        return res.status(200).json({
            message: "Estudiantes registrados encontrados:",
            data: allStudents
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

export const getStudentAndExams = async (req, res) => {
    try {
        const {studentId} = matchedData(req, {locations: ['params']})
        const stuAndExams = await StudentModel.find(studentId).populate('student_exams')

        if (!stuAndExams) {
            return res.status(404).json({
                message: "No se encontraron examenes vinculados a ese estudiante"
            })
        }

        return res.status(200).json({
            message: "Estudiantes y sus exámenes encontrados:",
            data: stuAndExams
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

//traer un estudiante por su id
export const getStudentById = async (req, res) => {
    try {
        const {studentId} = matchedData(req, {locations: ['params']})
        const studentById = await StudentModel.findById(studentId)

        if (!studentById) {
            return res.status(404).json({
                message: "Estudiante no encontrado"
            })
        }

        return res.status(200).json({
            message: "Estudiante registrado encontrado:",
            data: studentById 
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

//actualizar estudiante por id
export const updateStudentById = async (req, res) => {
    try {
        const {studentId} = matchedData(req, {locations: ['params']})
        const {first_name, last_name, age} = matchedData(req, {locations: ['body']})
        const studentById = await StudentModel.findByIdAndUpdate(studentId, 
            {
                first_name,
                last_name,
                age
            },
            {
                returnDocument: "after"
            }
        )

        if (!studentById) {
            return res.status(404).json({
                message: "Estudiante a actualizar no encontrado"
            })
        }

        return res.status(200).json({
            message: "Estudiante actualizado:",
            data: studentById 
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

//eliminar estudiante en particular, sus examenes y materias inscriptas
export const deleteStudentById = async (req, res) => {
    try {
        const {studentId} = matchedData(req, {locations: ['params']})

        //eliminación en cascada de examenes (se eliminan todos los asociados al estudiante)
        await ExamModel.deleteMany({ examinee: studentId })
        //eliminación en cascada de materias a la que está inscripto el estudiante
        await SubjectModel.deleteMany({ students_enrolled: studentId})
        //eliminación lógica de estudiante
        const deletedStudent = await StudentModel.findByIdAndUpdate(studentId, {
            deletedAt: new Date(),
        },
        {
            returnDocument: 'after'
        })
        return res.status(200).json({
            message: "Estudiante y sus exámenes eliminados con éxito:",
            data: deletedStudent
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

