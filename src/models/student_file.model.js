import { model, Schema, Types } from 'mongoose'

const studentFileSchema = new Schema({
    student: {
        type: Types.ObjectId, //fk
        ref: "Student", //modelo al que hace referencia nuestra fk
        required: true // para que la relación sea 1:1, aplicamos required true
    },
    birth_date: {
        type: Date,
        required: true
    },
    birth_place: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true
    },
    exams_passed: [{
        type: Types.ObjectId, //fk en propiedad del esquema de ficha de estudiante
        ref: "Exam" //modelo independiente al que hace referencia esta fk 
    }]
})

export const StudentFileModel = model("StudentFile", studentFileSchema)