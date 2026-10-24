import { ExamModel } from '../models/exam.model.js'
import { matchedData } from 'express-validator'

//registrar (crear) un examen
export const registerExam = async (req, res) => {
    try {
        const { examinee, subject, grade, semester } = matchedData(req, {locations: ['body']})
        const newExam = await ExamModel.create({
            examinee,
            subject,
            grade,
            semester
        })

        return res.status(201).json({
            message: "Examen registrado correctamente",
            data: newExam
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

//traer todos los examenes
export const getAllExams = async (_req, res) => {
    try {
        const allExams = await ExamModel.find().populate('examinee')

        if (!allExams) {
            return res.status(404).json({
                message: "No se encontraron examenes registrados"
            })
        }

        return res.status(200).json({
            message: "Todos los examenes registrados:",
            data: allExams
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

//traer examenes por id de estudiante
export const getStudentExamById = async (req, res) => {
    try {
        const {studentId} = matchedData(req, {locations: ['params']})
        const examsByStudentId = await ExamModel.find({ examinee: studentId }).populate('examinee')

        if (!examsByStudentId) {
            return res.status(404).json({
                message: "No se encontró examenes vinculados al estudiante"
            })
        }

        return res.status(200).json({ 
            message: "Estudiante y exámenes encontrado:",
            data: examsByStudentId
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

//actualizar examen por id
export const updateExamById = async (req, res) => {
    try {
        const {examId} = matchedData(req, {locations: ['params']})
        const {examinee, subject, grade, semester} = matchedData(req, {locations: ['body']})
        const examToUpdateById = await ExamModel.findByIdAndUpdate(examId, 
            {
                examinee,
                subject,
                grade,
                semester
            },
            {
                returnDocument: "after"
            }
        )

        if (!examToUpdateById) {
            return res.status(404).json({
                message: "Examen a actualizar no encontrado"
            })
        }

        return res.status(200).json({
            message: "Examen actualizado:",
            data: examToUpdateById
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

//eliminar examen por id
export const deleteExamById = async (req, res) => {
    try {
        const {examId} = matchedData(req, {locations: ['params']})

        //eliminación lógica
        const deletedExam = await ExamModel.findByIdAndUpdate(examId, {
            deletedAt: new Date(),
        },
        {
            returnDocument: 'after'
        })
        return res.status(200).json({
            message: "Examen eliminado lógicamente con éxito:",
            data: deletedExam
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

