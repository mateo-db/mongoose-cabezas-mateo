//importamos herramientas necesarias de mongoose
import { model, Schema } from 'mongoose'

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
    versionKey: false
})

//exportamos modelo con schema
export const StudentModel = model("Student", studentSchema)