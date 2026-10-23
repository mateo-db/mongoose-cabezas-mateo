import { model, Schema, Types } from 'mongoose'

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    teacher: {
        type: String,
        required: true
    },
    students_enrolled: [{ //array de referencias, relación N:M
        type: Types.ObjectId,
        ref: "Student" //modelo al que hace referencia este array que contendrá las fks de ese modelo
    }],
    deletedAt: {
        type: Date,
        default: null
    }
})

export const SubjectModel = model("Subject", subjectSchema)