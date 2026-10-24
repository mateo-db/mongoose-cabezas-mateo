//importaciones necesarias
import 'dotenv/config'
import express from 'express'
import { conn } from './src/config/database.js'
import { studentRouter } from './src/routes/student.routes.js'
import { examRouter } from './src/routes/exam.routes.js'
import { subjectRouter } from './src/routes/subject.routes.js'

const app = express()
const PORT = process.env.PORT || 3003

//middleware global
app.use(express.json())

//rutas
app.use('/api', studentRouter)
app.use('/api', examRouter)
app.use('/api', subjectRouter)

app.listen(PORT, async () => {
    await conn(),
    console.log(`Servidor escuchando correctamente en puerto ${PORT}`)
})

