import { StudentFileModel } from '../models/student_file.model.js'
import { matchedData } from 'express-validator'

//registrar (crear) una ficha estudiantil
export const registerStudentFile = async (req, res) => {
    try {
        const { student, birth_date, birth_place, nationality, exams_passed } = matchedData(req, {locations: ['body']})
        const newStudentFile = await StudentFileModel.create({
            student,
            birth_date,
            birth_place,
            nationality,
            exams_passed
        })

        return res.status(201).json({
            message: "Ficha creada correctamente",
            data: newStudentFile
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

//traer todas las materias
export const getAllStudentFiles = async (_req, res) => {
    try {
        const allStudentFiles = await StudentFileModel.find().populate('student').populate('exams_passed')

        if (!allStudentFiles) {
            return res.status(404).json({
                message: "No se encontraron fichas estudiantiles creadas"
            })
        }

        return res.status(200).json({
            message: "Todas las fichas estudiantiles:",
            data: allStudentFiles
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

//traer una ficha estudiantil de estudiante en particular
export const getStudentsFile = async (req, res) => {
    try {
        const { studentId } = matchedData(req, {locations: ['params']})
        const studentsFile = await StudentFileModel.findOne( { student: studentId }).populate('student').populate('exams_passed')

        if (!studentsFile) {
            return res.status(404).json({
                message: "No se encontró la ficha de ese estudiante"
            })
        }

        return res.status(200).json({
            message: "Ficha del estudiante:",
            data: studentsFile
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}


//actualizar ficha por id
export const updateStudentFileById = async (req, res) => {
    try {
        const {studentFileId} = matchedData(req, {locations: ['params']})
        const {student, birth_date, birth_place, nationality, exams_passed} = matchedData(req, {locations: ['body']})
        const fileToUpdateById = await StudentFileModel.findByIdAndUpdate(studentFileId,
            {
                student,
                birth_date,
                birth_place,
                nationality,
                $addToSet: {
                    exams_passed: {
                        $each: exams_passed
                    }
                }
            },
            {
                returnDocument: "after"
            }
        )

        if (!fileToUpdateById) {
            return res.status(404).json({
                message: "Ficha a actualizar no encontrada"
            })
        }

        return res.status(200).json({
            message: "Materia actualizada:",
            data: fileToUpdateById
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

//eliminar ficha
export const deleteStudentFile = async (req, res) => {
    try {
        const {studentFileId} = matchedData(req, {locations: ['params']})

        //eliminación lógica
        const deletedStudentFile = await StudentFileModel.findByIdAndUpdate(studentFileId, {
            deletedAt: new Date(),
        },
        {
            returnDocument: 'after'
        })
        return res.status(200).json({
            message: "Ficha eliminada lógicamente con éxito:",
            data: deletedStudentFile
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

