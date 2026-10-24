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
