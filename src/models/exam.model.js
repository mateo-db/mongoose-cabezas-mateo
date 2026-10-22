//importamos herramientas necesarias de mongoose
import { model, Schema, Types } from 'mongoose'

//creamos esquema
const examSchema = new Schema({
    examinee: {
        type: Types.ObjectId,
        ref: "Student",
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    semester: {
        type: Number,
        enum: ["first", "second"],
        date: //propiedad embebida date en propiedad semester
            {
            type: Date,
            default: Date.now //fecha actual como default
            }
    }
    },
{
    timestamps: false,
    versionKey: false
})

//exportamos modelo con schema
export const ExamModel = model("Exam", examSchema)