//importaciones necesarias
import 'dotenv/config'
import express from 'express'
import { conn } from './src/config/database.js'
import { studentRouter } from './src/routes/student.routes.js'

const app = express()
const PORT = process.env.PORT || 3003

//middleware global
app.use(express.json())

//rutas
app.use('/api', studentRouter)

app.listen(PORT, async () => {
    await conn(),
    console.log(`Servidor escuchando correctamente en puerto ${PORT}`)
})

