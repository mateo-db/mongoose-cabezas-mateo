import { SubjectModel } from '../models/subject.model.JS'
import { matchedData } from 'express-validator'

//registrar (crear) una materia
export const registerSubject = async (req, res) => {
    try {
        const { name, teacher, students_enrolled } = matchedData(req, {locations: ['body']})
        const newSubject = await ExamModel.create({
            name,
            teacher,
            students_enrolled
        })

        return res.status(201).json({
            message: "Materia registrada correctamente",
            data: newSubject
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

//traer todas las materias
export const getAllSubjects = async (_req, res) => {
    try {
        const allSubjects = await SubjectModel.find()

        if (!allSubjects) {
            return res.status(404).json({
                message: "No se encontraron materias registradas"
            })
        }

        return res.status(200).json({
            message: "Todas las materias registrados:",
            data: allSubjects
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

//traer una materia y alumnos inscriptos
export const getSubjectAndStudents = async (req, res) => {
    try {
        const { id } = matchedData(req, {locations: ['params']})
        const subjectAndStudents = await SubjectModel.find(id).populate('students_enrolled')

        if (!subjectAndStudents) {
            return res.status(404).json({
                message: "No se encontraron estudiantes inscriptos a esa materia"
            })
        }

        return res.status(200).json({
            message: "Materia y alumnos inscriptos:",
            data: subjectAndStudents
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}


//actualizar materia por id
export const updateSubjectById = async (req, res) => {
    try {
        const {id} = matchedData(req, {locations: ['params']})
        const {name, teacher, students_enrolled} = matchedData(req, {locations: ['body']})
        const subjToUpdateById = await SubjectModel.findByIdAndUpdate(id, 
            {
                name,
                teacher,
                $addToSet: {
                    students_enrolled: {
                        $each: students_enrolled //esto es para que, al actualizar el array de referencias con un estudiante nuevo, las demás referencias no se borren
                    }
                }
            },
            {
                returnDocument: "after"
            }
        )

        if (!subjToUpdateById) {
            return res.status(404).json({
                message: "Materia a actualizar no encontrado"
            })
        }

        return res.status(200).json({
            message: "Materia actualizada:",
            data: subjToUpdateById
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

//eliminar materia
export const deleteSubject = async (req, res) => {
    try {
        const {id} = matchedData(req, {locations: ['params']})

        //eliminación lógica
        const deletedSubject = await SubjectModel.findByIdAndUpdate(id, {
            deletedAt: new Date(),
        },
        {
            returnDocument: 'after'
        })
        return res.status(200).json({
            message: "Materia eliminada lógicamente con éxito:",
            data: deletedSubject
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Error interno del servidor"
        })
    }
}

