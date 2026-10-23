//importamos herramientas necesarias de mongoose
import { model, Schema, virtual } from 'mongoose'

//creamos esquema
const studentSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 11,
        max: 18
    },
    deletedAt: {
        type: Date,
        default: null
    }
},
{
    timestamps: false,
    versionKey: false,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

//propiedad virtual del schema
studentSchema.virtual("student_exams",{
    ref: "Exam",
    localField: "_id",
    foreignField: "examinee"
})

//exportamos modelo con schema
export const StudentModel = model("Student", studentSchema)