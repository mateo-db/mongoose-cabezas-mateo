> ## Justificación de Propiedades Embebidas y Referencias en Modelos

### `StudentModel` 1:1 `StudentFileModel`

- En este caso, elegí referenciar `StudentModel` en el modelo dependiente `StudentFileModel` con un `unique: true`, para que un estudiante _no pueda estar asociado a más de 1 ficha_. Me aseguro unicidad en el 1:1 y flexibilidad pudiendo consultar el historial acádemico _vinculado a cada alumno junto a su información personal_ traído desde `StudentModel`.
- El modelo `StudentFileModel` también posee un _array de referencias_ como propiedad llamada `exams_passed`, donde los `ObjectId` actuarán como las FKs que referencian el modelo independiente, `ExamModel`.

### `StudentModel` 1:N `ExamModel`

- Para la relación uno a muchos elegí referenciar ya que la información del estudiante se _administra independientemente, cambia y se comparte_ a través de varios documentos, no solo en `ExamModel`. En lugar de escribir la información personal de cada alumno en un exámen, referencio al estudiante y el exámen que le pertenece en una misma consulta. Es más _dinámico_ y de lectura fácil.
- En `ExamModel` elegí que `semester` sea una _propiedad embebida_ ya que contendrá información que no va a cambiar; cada exámen es dictado dentro de un _primer o segundo semestre, en fechas exactas_.

### `StudentModel` N:M `SubjectModel`

- En este caso elegí un array de referencias dentro del modelo dependiente `SubjectModel` que contendrá los `ObjectId` de cada alumno inscripto en una materia. Esto es para respetar la lógica de una relación muchos a muchos, _donde un alumno puede estar inscriptos en muchas materias, y una materia puede tener muchos alumnos_. La información de estudiantes inscriptos y materias dictadas puede cambiar, por lo que tiene sentido hacerlo dinámico.
- Además, `SubjectModel` posee un array de referencias con FKs que apuntan a `StudentModel`, para registrar a cada estudiante inscripto en una materia.

---

> ## Eliminación Lógica y en Cascada con Mongoose

### `Eliminación Lógica`

Para hacer eliminación lógica de un documento en Mongoose, una de las formas es declarar en el modelo una propiedad de `deletedAt` de tipo fecha con valor inicial `null`:

```
    deletedAt: {
        type: Date,
        default: null
    }
```

Luego, al momento de configurar nuestro controlador _"deleteModelById"_, en lugar de eliminar el documento físicamente utilizando el método de Mongoose _findByIdAndDelete()_, hacemos un `findByIdAndUpdate()`, pasandole como parámetros el id del documento que queremos borrar _(que representa a un estudiante registrado, por ejemplo)_, y lo que queremos actualizar con el nuevo valor, en este caso la propiedad `deletedAt`:

```
    const updatedStudent = await StudentModel.findByIdAndUpdate(id,
    {
        deletedAt: new Date() // Esto lo que hace es crear un nuevo objeto con la fecha y hora actual
    },
    {
        returnDocument: 'after'
    })
```

De esa forma haríamos un _soft delete_ del documento en cuestión.

### `Eliminación en Cascada`

Para hacer eliminación en cascada de un documento con Mongoose, una de las formas trabajando con documentos que se referencian es hacer un `deleteMany()` sobre el **modelo hijo** que referencia al **padre**, pasandole por parámetros el _campo del hijo_ con el _id del params_ de la petición que _coincide_ con el `ObjectId` que lo vincula al _padre_:

```
    const { id } = matchedData(req, {locations: ['params']})
    await Exam.deleteMany({
        examinee: id
        //campo del hijo (examinee): id del params que coincide con el ObjectId que lo vincula al padre (student)
    })
```

Luego de borrar los documentos vinculados al padre de esta forma, podemos hacer un _soft delete_ del modelo padre para completar con nuestro circuito de eliminaciones lógica y en cascada.

---

> ## Utilización de `populate()` en Colecciones sin Referencias

Para utilizar el método `populate()` en colecciones sin referencias (_por ejemplo, StudentModel_), Mongoose nos provee de un mecanismo especial: _propiedades virtuales_. Estas son relaciones no físicas en la base de datos pero que podemos crear para relacionar un documento sin referencias con otro.
Podemos configurar un _virtual schema_ en el modelo sin referencias, de modo que sea una "plantilla" de la relación que queramos emplear a futuro, por ejemplo:

```
    studentSchema.virtual("student_exams", { //nombre de nuestra "relación virtual"
        ref: "Exam" // modelo que si tiene las referencias, es donde mongoose irá a buscar
        localField: "_id" //campo local de mi modelo sin referencias, que contiene el ObjectId el cual utilizaremos para vincular con otro documento
        foreignField: "examinee"// campo externo donde se referencia al modelo estudiante por su ObjectId
    })
```

Luego, al utilizar el populate para buscar y reemplazar las referencias, le pasamos el virtual schema que creamos

```
    const { id } = matchedData(req, {locations: ['params']})
    const studentExams = await StudentModel.findById(id).populate("student_exams")
```

### Aclaración Importante:

- Para que el virtual populate funcione al mandar nuestro resultado en JSON, necesitamos estas configuraciones en el schema del modelo en cuestión:

```
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
```

---

> Agregar Nuevos Valores a Arrays

- Con Mongoose, si queremos agregar nuevos valores a un array de referencias por ejemplo, nos topamos con un problema: al tratar de agregarlos, esos valores agregados reemplazan a los existentes en el array, y los que estaban previamente desaparecen. Para evitar esto y agregar correctamente valores nuevos sin que desaparezcan los previos, al mandar el objeto con los nuevos valores que vienen desde el body podemos hacer esto:

```
        const {id} = matchedData(req, {locations: ['params']})
        const {name, teacher, students_enrolled} = matchedData(req, {locations: ['body']})
        const subjToUpdateById = await SubjectModel.findByIdAndUpdate(id, //students_enrolled representa nuestro array de referencias donde se guardan los ObjectIds de alumnos inscriptos a la materia
                {
                name,
                teacher,
                $addToSet: {
                    students_enrolled: {
                        $each: students_enrolled //esto es para que, al actualizar el array de referencias con un estudiante nuevo, las demás referencias no se borren
                    }
                }})
```
