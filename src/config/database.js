import mongoose from "mongoose";

export const conn = async () => {
    try {
        await mongoose.connect(`mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}`)
        console.log("Conexión a BD exitosa")
    } catch (error) {
        console.log("Error interno del servidor", error)
    }
}