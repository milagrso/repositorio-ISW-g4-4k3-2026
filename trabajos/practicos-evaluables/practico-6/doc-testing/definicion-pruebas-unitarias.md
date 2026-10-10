# Definición test unitarios

_Probar seleccionar la actividad tirolesa con cupos y horario disponible._ test_tirolesa_con_cupo_permite_inscripcion

**Precondiciones:**

- Actividad tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos 5 lugares libres en el turno

- Los dos participantes tienen nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos de los 2 participantes

- Los terminos y condiciones específicos de Tirolesa estan aceptados

**Entrada:**

- Actividad Seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 2 personas

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Tirolesa realizada con éxito (2 cupos reservados)"

_Probar seleccionar la actividad tirolesa sin cupos disponibles._ test_tirolesa_sin_cupo_rechaza_inscripcion

**Precondiciones:**

- Actividad tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 11:00 a 12:00hs disponible

- Cupos 0 lugares libres en el turno

- El participante tiene nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad Seleccionada: Tirolesa

- Horario seleccionado: 11:00hs

- Cantidad de inscriptos: 1 persona

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "No hay cupos disponibles para el horario seleccionado"

_Probar seleccionar la actividad tirolesa con cupos disponibles y fuera de horario_ test_tirolesa_fuera_horario_rechaza_inscripcion

**Precondiciones:**

- Actividad tirolesa activa

- Horario Habilitado (rango): De 9:00 a 18:00hs

- Cupos: Disponibles en turnos válidos

- Los 2 participantes tienen nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos de los 2 participantes

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada :**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 20:00hs

- Cantidad de inscriptos: 2 personas

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "El horario seleccionado no está disponible para esta actividad"

_Probar seleccionar la actividad tirolesa con cupos disponibles sin seleccionar horario._ test_tirolesa_sin_horario_seleccionado_rechaza_inscripcion

**Precondiciones:**

- Actividad tirolesa registrada, activa y habilitada

- Horarios: Varios turnos disponibles

- Cupos disponibles en turnos válidos

- El participante tiene nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: Null

- Cantidad de inscriptos: 1 persona

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "Debe seleccionar un horario para completar la inscripción"

---

_Probar seleccionar la actividad safari con cupos y horario disponible._ test_safari_con_cupo_permite_inscripcion

**Precondiciones:**

- Actividad safari registrada, activa y habilitada

- Horario Habilitado: Turno de 14:00 a 15:00hs disponible

- Cupos: 8 lugares libres en el turno

- Los cuatro participantes tienen nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos de los 4 participantes

- Los términos y condiciones específicos de Safari están aceptados

**Entrada:**

- Actividad Seleccionada: Safari

- Horario seleccionado: 14:00hs

- Cantidad de inscriptos: 4 personas

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Safari realizada con éxito (4 cupos reservados)"

_Probar seleccionar la actividad safari sin cupos disponibles._ test_safari_sin_cupo_rechaza_inscripcion

**Precondiciones:**

- Actividad safari registrada, activa y habilitada

- Horario Habilitado: Turno de 16:00 a 17:00hs disponible

- Cupos: 0 lugares libres en el turno

- Los dos participantes tienen nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos de los 2 participantes

- Los términos y condiciones específicos de Safari están aceptados

**Entrada**:

- Actividad Seleccionada: Safari

- Horario seleccionado: 16:00hs

- Cantidad de inscriptos: 2 personas

**Resultado esperado**:

- Estado de la operación: RECHAZADA

- Mensaje: "No hay cupos disponibles para el horario seleccionado"

_Probar seleccionar la actividad safari con cupos disponibles y fuera de horario_ test_safari_fuera_horario_rechaza_inscripcion

**Precondiciones:**

- Actividad safari registrada, activa y habilitada

- Horario Habilitado (rango): De 09:00 a 18:00hs

- Cupos: Disponibles en turnos validos

- El participante tiene nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Safari están aceptados

**Entrada:**

- Actividad seleccionada: Safari

- Horario seleccionado: 19:00hs

- Cantidad de inscriptos: 1 persona

**Resultado esperado**:

- Estado de la operación: RECHAZADA

- Mensaje: "El horario seleccionado no esta disponible para esta actividad"

_Probar seleccionar la actividad safari con cupos disponibles sin seleccionar horario._ test_safari_sin_horario_seleccionado_rechaza_inscripcion

**Precondiciones:**

- Actividad safari registrada, activa y habilitada

- Horarios: Varios turnos disponibles

- Cupos disponibles en turnos validos

- Los tres participantes tienen nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos de los 3 participantes

- Los términos y condiciones específicos de Safari están aceptados

**Entrada:**

- Actividad seleccionada: Safari

- Horario seleccionado: Null

- Cantidad de inscriptos: 3 personas

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "Debe seleccionar un horario para completar la inscripción"

---

_Probar seleccionar la actividad palestra con cupos y horario disponible._ test_palestra_con_cupo_permite_inscripcion

**Precondiciones:**

- Actividad palestra registrada, activa y habilitada

- Horario Habilitado: Turno de 15:00 a 16:00hs disponible

- Cupos: 6 lugares libres en el turno

- Los dos participantes tienen nombre, DNI, edad y talle de calzado válidos

- La cantidad declarada coincide con los datos de los 2 participantes

- Los términos y condiciones específicos de Palestra están aceptados

**Entrada:**

- Actividad Seleccionada: Palestra

- Horario seleccionado: 15:00hs

- Cantidad de inscriptos: 2 personas

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Palestra realizada con éxito (2 cupos reservados)"

_Probar seleccionar la actividad palestra sin cupos disponibles._ test_palestra_sin_cupo_rechaza_inscripcion

**Precondiciones:**

- Actividad palestra registrada, activa y habilitada

- Horario Habilitado: Turno de 17:00 a 18:00hs disponible

- Cupos: 0 lugares libres en el turno

- El participante tiene nombre, DNI, edad y talle de calzado válidos

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Palestra están aceptados

**Entrada:**

- Actividad Seleccionada: Palestra

- Horario seleccionado: 17:00hs

- Cantidad de inscriptos: 1 persona

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "No hay cupos disponibles para el horario seleccionado"

_Probar seleccionar la actividad palestra con cupos disponibles y fuera de horario_ test_palestra_fuera_horario_rechaza_inscripcion

**Precondiciones:**

- Actividad palestra registrada, activa y habilitada

- Horario Habilitado (rango): De 9:00 a 18:00hs

- Cupos: Disponibles en turnos validos

- Los dos participantes tienen nombre, DNI, edad y talle de calzado válidos

- La cantidad declarada coincide con los datos de los 2 participantes

- Los términos y condiciones específicos de Palestra están aceptados

**Entrada**:

- Actividad seleccionada: Palestra

- Horario seleccionado: 21:00hs

- Cantidad de inscriptos: 2 personas

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "El horario seleccionado no esta disponible para esta actividad"

_Probar seleccionar la actividad palestra con cupos disponibles sin seleccionar horario._ test_palestra_sin_horario_seleccionado_rechaza_inscripcion

**Precondiciones:**

- Actividad palestra registrada, activa y habilitada

- Horarios: Varios turnos disponibles

- Cupos disponibles en turnos validos

- El participante tiene nombre, DNI, edad y talle de calzado válidos

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Palestra están aceptados

**Entrada:**

- Actividad seleccionada: Palestra

- Horario seleccionado: Null

- Cantidad de inscriptos: 1 persona

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "Debe seleccionar un horario para completar la inscripción"

---

_Probar seleccionar la actividad jardineria con cupos y horario disponible._ test_jardineria_con_cupo_permite_inscripcion

**Precondiciones:**

- Actividad jardineria registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 4 lugares libres en el turno

- Los dos participantes tienen nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos de los 2 participantes

- Los términos y condiciones específicos de Jardinería están aceptados

**Entrada:**

- Actividad Seleccionada: Jardineria

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 2 personas

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Jardineria realizada con éxito (2 cupos reservados)"

_Probar seleccionar la actividad jardineria sin cupos disponibles._ test_jardineria_sin_cupo_rechaza_inscripcion

**Precondiciones:**

- Actividad jardineria registrada, activa y habilitada

- Horario Habilitado: Turno de 11:00 a 12:00hs disponible

- Cupos: 0 lugares libres en el turno

- El participante tiene nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Jardinería están aceptados

**Entrada:**

- Actividad Seleccionada: Jardineria

- Horario seleccionado: 11:00hs

- Cantidad de inscriptos: 1 persona

**Resultado esperado**:

- Estado de la operación: RECHAZADA

- Mensaje: "No hay cupos disponibles para el horario seleccionado"

_Probar seleccionar la actividad jardineria con cupos disponibles y fuera de horario._ test_jardineria_fuera_horario_rechaza_inscripcion

**Precondiciones:**

- Actividad jardineria registrada, activa y habilitada

- Horario Habilitado (rango): De 9:00 a 18:00hs

- Cupos: Disponibles en turnos validos

- Los dos participantes tienen nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos de los 2 participantes

- Los términos y condiciones específicos de Jardinería están aceptados

**Entrada:**

- Actividad seleccionada: Jardineria

- Horario seleccionado: 20:00hs

- Cantidad de inscriptos: 2 personas

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "El horario seleccionado no esta disponible para esta actividad"

_Probar seleccionar la actividad jardineria con cupos disponibles sin seleccionar horario._ test_jardineria_sin_horario_seleccionado_rechaza_inscripcion

**Precondiciones:**

- Actividad jardineria registrada, activa y habilitada

- Horarios: Varios turnos disponibles

- Cupos disponibles en turnos validos

- El participante tiene nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Jardinería están aceptados

**Entrada:**

- Actividad seleccionada: Jardineria

- Horario seleccionado: Null

- Cantidad de inscriptos: 1 persona

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "Debe seleccionar un horario para completar la inscripción"

_Probar registrar actividad sin seleccionar una actividad._ test_actividad_no_seleccionada_rechaza_inscripcion

**Precondiciones:**

- Actividades activas disponibles en el sistema (Tirolesa, Safari, Palestra, Jardinería)

- Turnos y cupos libres disponibles para reserva

- El participante tiene nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos del participante

- No se ha seleccionado ninguna actividad

**Entrada:**

- Actividad seleccionada: Null

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "Debe seleccionar una actividad para completar la inscripción"

---

_Probar ingresar cantidad de una persona habiendo cupos disponibles_ test_una_persona_con_cupo_permite_inscripcion

**Precondiciones**

- Actividad Tirolesa registrada, activa y habilitada

- Horario habilitado: turno de 10:00 a 11:00 hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre, DNI y edad válidos

- Los términos y condiciones específicos de Tirolesa están aceptados

- La cantidad de participantes declarada coincide con los datos proporcionados

**Entrada**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

**Resultado esperado**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Tirolesa realizada con éxito (1 cupo reservado)"

_Probar ingresar más de una persona habiendo cupos disponibles para esa cantidad_ test_varias_personas_con_cupos_permite_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- Los 3 participantes tienen nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos de los 3 participantes

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 3 personas

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Tirolesa realizada con éxito (3 cupos reservados)"

_Probar ingresar cero personas_ test_cero_personas_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- No se proporcionan datos de participantes, ya que la cantidad de participantes ingresada es cero

- La actividad y el horario cumplen las condiciones necesarias para realizar una inscripcion

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 0 personas

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "La cantidad de inscriptos debe ser mayor a cero"

_Probar ingresar la misma cantidad de personas que de cupos disponibles_ test_cantidad_igual_a_cupo_permite_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 3 lugares libres en el turno

- Los 3 participantes tienen nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos de los 3 participantes

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 3 personas

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Tirolesa realizada con éxito (3 cupos reservados)"

_Probar ingresar una cantidad de personas mayor a la cantidad de cupos disponibles_ test_cantidad_supera_cupo_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 2 lugares libres en el turno

- Los 3 participantes tienen nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos de los 3 participantes

- Los términos y condiciones específicos de Tirolesa están aceptados

- La cantidad de cupos disponibles es inferior a la cantidad de personas que se desean inscribir

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 3 personas

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "La cantidad de inscriptos supera la cantidad de cupos disponibles"

_Probar ingresar una cantidad negativa de numeros de personas_ test_cantidad_negativa_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- Los términos y condiciones específicos de Tirolesa están aceptados

- No se proporcionan datos de participantes, debido a que la cantidad ingresada es negativa

- La actividad y el horario cumplen las condiciones necesarias para realizar una inscripción

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: -2 personas

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "La cantidad de inscriptos no puede ser un valor negativo"

_Probar dejar campo vacío de la cantidad de personas que participan de la actividad._ test_cantidad_no_ingresada_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El campo correspondiente a la cantidad de participantes no ha sido completado

- No se proporcionan datos de participantes, dado que todavía no se indico la cantidad de personas

- La actividad y el horario cumplen las condiciones necesarias para realizar una inscripción

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: Null

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "Debe ingresar la cantidad de personas para completar la inscripción"

_Probar ingresar una cantidad de personas mayor a la cantidad de datos de participantes ingresados_ test_cantidad_mayor_a_datos_participantes_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- Se proporcionan los datos de 2 participantes con nombre, DNI y edad válidos

- La cantidad declarada es mayor a la cantidad de participantes cuyos datos fueron proporcionados

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 3 personas

- Datos de participantes: 2 personas registradas

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "La cantidad de inscriptos declarada debe coincidir con la cantidad de datos de participantes ingresados"

_Probar ingresar una cantidad de personas menor a la cantidad de datos de participantes ingresados_ test_cantidad_menor_a_datos_participantes_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- Se proporcionan los datos de 3 participantes con nombre, DNI y edad válidos

- La cantidad declarada es menor a la cantidad de participantes cuyos datos fueron proporcionados

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 2 personas

- Datos de participantes: 3 personas registradas

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "La cantidad de inscriptos declarada debe coincidir con la cantidad de datos de participantes ingresados"

_Probar ingresar un número no entero de personas_ test_cantidad_decimal_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- No se proporcionan datos de participantes, debido a que la cantidad ingresada no es un número entero

- La actividad y el horario cumplen las condiciones necesarias para realizar una inscripción

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 2.5 personas

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "La cantidad de inscriptos debe ser un número entero positivo"

_Probar ingresar un número entero de personas_ test_cantidad_entera_permite_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- Los 3 participantes tienen nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos de los 3 participantes

- Se proporciona el talle de cada participante si la actividad lo requiere

- Los términos y condiciones específicos de Tirolesa están aceptados

- La actividad y el horario cumplen las condiciones necesarias para realizar una inscripción

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 3 personas

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Tirolesa realizada con éxito (3 cupos reservados)"

---

_Probar ingresar nombre_ test_nombre_ingresado_permite_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene DNI y edad válidos

- El nombre del participante cumple con el formato permitido

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe Garcia”

- DNI: 30784219

- Edad: 42 años

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Tirolesa realizada con éxito (1 cupo reservado)"

_Probar dejar campo vacío de nombre_ test_nombre_no_ingresado_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene DNI y edad válidos

- El nombre del participante no se encuentra ingresado

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: Null

- DNI: 30784219

- Edad: 42 años

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "Debe ingresar el nombre del participante para completar la inscripcion"

_Probar ingresar nombre con algún número_ test_nombre_con_numeros_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene DNI y edad válidos

- El campo nombre contiene números, incumpliendo el formato permitido

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe123”

- DNI: 30784219

- Edad: 42 años

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "El nombre no puede contener números"

_Probar ingresar un nombre solo con letras_ test_nombre_con_letras_permite_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene DNI y edad válidos

- El nombre del participante contiene únicamente letras

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: 42 años

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Tirolesa realizada con éxito (1 cupo reservado)"

_Probar ingresar nombre con caracteres especiales no permitidos (ej: `@`, `$`, `%`)_ test_nombre_con_caracteres_especiales_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene DNI y edad válidos

- El nombre contiene caracteres especiales no permitidos por el formato establecido

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe@”

- DNI: 30784219

- Edad: 42 años

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "El nombre no puede contener caracteres especiales no permitidos"

_Probar ingresar nombre con solo espacios_ test_nombre_solo_espacios_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene DNI y edad válidos

- El campo nombre contiene únicamente espacios en blanco

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “ ”

- DNI: 30784219

- Edad: 42 años

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "El nombre del participante no puede contener únicamente espacios en blanco"

_Probar ingresar un DNI valido_ test_dni_ingresado_permite_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre y edad válidos

- El DNI ingresado cumple con el formato establecido de 7 u 8 dígitos numéricos

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: 42 años

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Tirolesa realizada con éxito (1 cupo reservado)"

_Probar dejar campo vacío de DNI_ test_dni_no_ingresado_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre y edad válidos

- El campo de DNI se encuentra vacio

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: Null

- Edad: 42 años

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "Debe ingresar el DNI del participante para completar la inscripcion"

_Probar ingresar DNI con números enteros_ test_dni_numero_entero_positivo_permite_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre y edad válidos

- El DNI ingresado contiene únicamente dígitos numéricos y cumple con la longitud permitida

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entradas:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: 42 años

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Tirolesa realizada con éxito (1 cupo reservado)"

_Probar ingresar DNI con números decimales_ test_dni_numero_decimal_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre y edad válidos

- El DNI ingresado contiene números decimales, incumpliendo el formato permitido

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entradas:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 3078429,5

- Edad: 42 años

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "El DNI no puede contener números decimales"

_Probar ingresar DNI con letras_ test_dni_letras_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre y edad válidos

- El DNI ingresado contiene letras, incumpliendo el formato permitido

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entradas:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30ABC219

- Edad: 42 años

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "El DNI no debe contener letras"

_Probar ingresar DNI con espacios_ test_dni_con_espacios_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre y edad válidos

- El DNI ingresado contiene espacios intermedios, incumpliendo el formato permitido

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entradas:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30 784 219

- Edad: 42 años

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "El DNI no puede contener espacios en blanco"

_Probar ingresar DNI solo con espacios_ test_dni_solo_espacios_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre y edad válidos

- El campo DNI contiene únicamente espacios en blanco

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entradas:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: “  ”

- Edad: 42 años

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "El DNI no puede contener únicamente espacios en blanco"

_Probar ingresar un DNI de 7 dígitos_ test_dni_7_digitos_permite_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre y edad válidos

- El DNI ingresado posee exactamente 7 dígitos, lo cual es un formato válido

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entradas:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 9784219

- Edad: 42 años

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Tirolesa realizada con éxito (1 cupo reservado)"

_Probar ingresar un DNI de 8 dígitos_ test_dni_8_digitos_permite_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre y edad válidos

- El DNI ingresado posee exactamente 8 dígitos, lo cual es un formato válido

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entradas:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: 42 años

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Tirolesa realizada con éxito (1 cupo reservado)"

_Probar ingresar un DNI de más de 8 dígitos_ test_dni_mas_8_digitos_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre y edad válidos

- El DNI ingresado posee más de 8 dígitos, incumpliendo la longitud permitida

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entradas:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 300784219

- Edad: 42 años

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "El DNI no puede tener más de 8 dígitos"

_Probar ingresar un DNI de menos de 7 dígitos_ test_dni_menos_7_digitos_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre y edad válidos

- El DNI ingresado posee menos de 7 dígitos, incumpliendo la longitud permitida

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entradas:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 784219

- Edad: 42 años

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "El DNI no puede tener menos de 7 dígitos"

_Probar ingresar una edad válida_. test_edad_ingresada_permite_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre y DNI válidos

- La edad ingresada se encuentra dentro del rango permitido y cumple con el formato válido

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: 42 años

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Tirolesa realizada con éxito (1 cupo reservado)"

_Probar dejar el campo de edad vacío._ test_edad_no_ingresada_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre y DNI válidos

- El campo correspondiente a la edad no ha sido completado

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: Null

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "Debe ingresar la edad del participante para completar la inscripción"

_Probar ingresar una edad con un número entero positivo._ test_edad_entera_positiva_permite_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre y DNI válidos

- La edad ingresada es un número entero positivo dentro del rango permitido

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: 42 años

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Tirolesa realizada con éxito (1 cupo reservado)"

_Probar ingresar una edad que contenga letras o texto._ test_edad_con_letras_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre y DNI válidos

- El campo edad contiene letras o caracteres alfabéticos, incumpliendo el formato numérico permitido

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: "veinticinco"

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "La edad debe ser un valor numérico"

_Probar ingresar una edad con números decimales._ test_edad_decimal_rechaza_inscripcion Precondiciones:

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre y DNI válidos

- La edad ingresada contiene valores decimales, incumpliendo el formato permitido

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: 42.5

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "La edad no puede contener números decimales"

_Probar ingresar una edad con valor negativo_. test_edad_negativa_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre y DNI válidos

- La edad ingresada es menor que cero, incumpliendo las reglas de dominio

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: -5

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "La edad no puede ser un valor negativo"

_Probar ingresar cero como valor de edad._ test_edad_cero_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre y DNI válidos

- La edad ingresada es igual a cero, incumpliendo la condición de edad válida para la actividad

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: 0

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "La edad debe ser mayor a cero"

_Probar ingresar solo espacios en el campo de edad._ test_edad_solo_espacios_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre y DNI válidos

- El campo edad contiene únicamente espacios en blanco

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: “ ”

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "La edad no puede contener únicamente espacios en blanco"

_Probar ingresar el talle en una actividad que lo requiere obligatoriamente._

test_talle_requerido_ingresado_permite_inscripcion

**Precondiciones:**

- Actividad Palestra registrada, activa y habilitada

- La actividad Palestra requiere obligatoriamente registrar el talle de calzado

- Horario Habilitado: Turno de 15:00 a 16:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre, DNI y edad válidos

- El talle de calzado ingresado es válido y se encuentra dentro de las opciones disponibles

- Los términos y condiciones específicos de Palestra están aceptados

**Entrada:**

- Actividad seleccionada: Palestra

- Horario seleccionado: 15:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: 42 años

- Talle de calzado: 41

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Palestra realizada con éxito (1 cupo reservado)"

_Probar no ingresar el talle en una actividad donde es obligatorio._ test_talle_requerido_no_ingresado_rechaza_inscripcion

**Precondiciones:**

- Actividad Palestra registrada, activa y habilitada

- La actividad Palestra requiere obligatoriamente registrar el talle de calzado

- Horario Habilitado: Turno de 15:00 a 16:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre, DNI y edad válidos

- El campo de talle de calzado se encuentra vacío

- Los términos y condiciones específicos de Palestra están aceptados

**Entrada:**

- Actividad seleccionada: Palestra

- Horario seleccionado: 15:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: 42 años

- Talle de calzado: Null

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "Debe ingresar el talle de calzado para completar la inscripción en esta actividad"

_Probar no ingresar el talle en una actividad que no lo requiere._ test_talle_no_requerido_no_ingresado_permite_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- La actividad Tirolesa no requiere registrar talle de calzado

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre, DNI y edad válidos

- El campo de talle de calzado no es proporcionado

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: 42 años

- Talle de calzado: Null

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Tirolesa realizada con éxito (1 cupo reservado)"

_Probar ingresar un talle opcional en una actividad que no lo requiere._ test_talle_no_requerido_ingresado_permite_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- La actividad Tirolesa no exige obligatoriamente registrar talle de calzado

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre, DNI y edad válidos

- Se proporciona un talle de calzado válido de forma opcional

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: 42 años

- Talle de calzado: 41

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: “Inscripción para Tirolesa realizada con éxito (1 cupo reservado)”

_Probar ingresar un talle de calzado menor a 19_ test_talle_calzado_menor_al_minimo_rechaza_inscripcion

**Precondiciones:**

- Actividad Palestra registrada, activa y habilitada

- La actividad Palestra requiere obligatoriamente registrar el talle de calzado

- El rango permitido de talle de calzado es de 19 a 48

- Horario Habilitado: Turno de 15:00 a 16:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre, DNI y edad válidos

- El talle de calzado ingresado es menor al límite mínimo permitido (19)

- Los términos y condiciones específicos de Palestra están aceptados

**Entrada:**

- Actividad seleccionada: Palestra

- Horario seleccionado: 15:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: 42 años

- Talle de calzado: 18

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "El talle de calzado disponible es de 19 a 48"

_Probar ingresar un talle de calzado mayor a 48_

test_talle_mayor_al_maximo_rechaza_inscripcion

**Precondiciones:**

- Actividad Palestra registrada, activa y habilitada

- La actividad Palestra requiere obligatoriamente registrar el talle de calzado

- El rango permitido de talle de calzado es de 19 a 48

- Horario Habilitado: Turno de 15:00 a 16:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre, DNI y edad válidos

- El talle de calzado ingresado supera el límite máximo permitido (48)

- Los términos y condiciones específicos de Palestra están aceptados

**Entrada:**

- Actividad seleccionada: Palestra

- Horario seleccionado: 15:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: 42 años

- Talle de calzado: 49

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "El talle de calzado disponible es de 19 a 48"

_Probar ingresar un talle de calzado con letras o texto._ test_talle_con_letras_rechaza_inscripcion

**Precondiciones:**

- Actividad Palestra registrada, activa y habilitada

- La actividad Palestra requiere obligatoriamente registrar el talle de calzado

- Horario Habilitado: Turno de 15:00 a 16:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre, DNI y edad válidos

- El campo talle de calzado contiene letras, incumpliendo el formato numérico

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Palestra están aceptados

**Entrada:**

- Actividad seleccionada: Palestra

- Horario seleccionado: 15:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: 42 años

- Talle de calzado: "cuarenta"

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "El talle de calzado debe ser un valor numérico"

_Probar ingresar un talle de calzado con valor negativo._ test_talle_negativo_rechaza_inscripcion

**Precondiciones:**

- Actividad Palestra registrada, activa y habilitada

- La actividad Palestra requiere obligatoriamente registrar el talle de calzado

- Horario Habilitado: Turno de 15:00 a 16:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre, DNI y edad válidos

- El talle de calzado ingresado es menor a cero

- Los términos y condiciones específicos de Palestra están aceptados

**Entrada:**

- Actividad seleccionada: Palestra

- Horario seleccionado: 15:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: 42 años

- Talle de calzado: -41

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "El talle de calzado no puede ser un valor negativo"

_Probar ingresar solo espacios en el campo de talle de calzado._ test_talle_solo_espacios_rechaza_inscripcion

**Precondiciones:**

- Actividad Palestra registrada, activa y habilitada

- La actividad Palestra requiere obligatoriamente registrar el talle de calzado

- Horario Habilitado: Turno de 15:00 a 16:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre, DNI y edad válidos

- El campo talle de calzado contiene únicamente espacios en blanco

- Los términos y condiciones específicos de Palestra están aceptados

**Entrada:**

- Actividad seleccionada: Palestra

- Horario seleccionado: 15:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: 42 años

- Talle de calzado: “ ”

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "El talle de calzado no puede contener únicamente espacios en blanco"

_Probar ingresar un talle de calzado con número entero válido dentro del rango._ test_talle_entero_positivo_permite_inscripcion

**Precondiciones:**

- Actividad Palestra registrada, activa y habilitada

- La actividad Palestra requiere obligatoriamente registrar el talle de calzado

- El rango permitido de talle de calzado es de 19 a 48

- Horario Habilitado: Turno de 15:00 a 16:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre, DNI y edad válidos

- El talle de calzado ingresado es un número entero positivo dentro del rango permitido

- Los términos y condiciones específicos de Palestra están aceptados

**Entrada:**

- Actividad seleccionada: Palestra

- Horario seleccionado: 15:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: 42 años

- Talle de calzado: 40

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Palestra realizada con éxito (1 cupo reservado)"

_Probar ingresar un talle de calzado con número decimal._ test_talle_decimal_rechaza_inscripcion

**Precondiciones:**

- Actividad Palestra registrada, activa y habilitada

- La actividad Palestra requiere obligatoriamente registrar el talle de calzado

- El sistema solo admite valores enteros para el talle de calzado

- Horario Habilitado: Turno de 15:00 a 16:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre, DNI y edad válidos

- El talle de calzado ingresado contiene decimales, incumpliendo el formato entero

- Los términos y condiciones específicos de Palestra están aceptados

**Entrada:**

- Actividad seleccionada: Palestra

- Horario seleccionado: 15:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: “Felipe”

- DNI: 30784219

- Edad: 42 años

- Talle de calzado: 41.5

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "El talle de calzado no puede contener números decimales"

---

_Probar inscribir a todos los participantes con sus datos personales completos y válidos._ test_todos_participantes_con_datos_completos_permite_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- La actividad Tirolesa no requiere obligatoriamente registrar talle de calzado

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- La cantidad declarada coincide con los datos de los 3 participantes

- Todos los participantes presentan nombre, DNI y edad completos y válidos

- El campo de talle de calzado se envía en Null por no ser requerido para esta actividad

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 3 personas

- Participante 1: Nombre: "Felipe", DNI: 30784219, Edad: 42, Talle de calzado: Null

- Participante 2: Nombre: "Mariana", DNI: 32456789, Edad: 38, Talle de calzado: Null

- Participante 3: Nombre: "Joaquín", DNI: 45123987, Edad: 21, Talle de calzado: Null

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Tirolesa realizada con éxito (3 cupos reservados)"

_Probar inscribir al grupo con un participante con datos incompletos._ test_un_participante_con_datos_incompletos_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- La actividad Tirolesa no requiere obligatoriamente registrar talle de calzado

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- La cantidad declarada coincide con la cantidad de registros de participantes enviados (3 personas)

- Dos participantes presentan sus datos completos y válidos

- Uno de los participantes tiene al menos un campo obligatorio sin completar (DNI Null)

- El campo de talle de calzado se envía en Null por no ser requerido

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 3 personas

- Participante 1: Nombre: "Felipe", DNI: 30784219, Edad: 42, Talle de calzado: Null

- Participante 2: Nombre: "Mariana", DNI: Null, Edad: 38, Talle de calzado: Null

- Participante 3: Nombre: "Joaquín", DNI: 45123987, Edad: 21, Talle de calzado: Null

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "Debe completar todos los datos obligatorios de cada participante"

_Probar inscribir al grupo con múltiples participantes con datos incompletos._ test_varios_participantes_con_datos_incompletos_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- La actividad Tirolesa no requiere obligatoriamente registrar talle de calzado

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- La cantidad declarada coincide con la cantidad de registros de participantes enviados (3 personas)

- Solo un participante cuenta con datos completos

- Más de un participante presenta campos obligatorios incompletos (nombres o edades sin completar)

- El campo de talle de calzado se envía en Null por no ser requerido

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 3 personas

- Participante 1: Nombre: "Felipe", DNI: 30784219, Edad: 42, Talle de calzado: Null

- Participante 2: Nombre: Null, DNI: 32456789, Edad: 38, Talle de calzado: Null

- Participante 3: Nombre: "Joaquín", DNI: 45123987, Edad: Null, Talle de calzado: Null

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "Debe completar todos los datos obligatorios de cada participante"

---

_Probar registrar la inscripción marcando la aceptación de términos y condiciones._ test_terminos_condiciones_aceptados_permite_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre, DNI y edad válidos

- Se proporciona el talle si la actividad lo requiere

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están disponibles para su aceptación

- El resto de las condiciones necesarias para realizar la inscripción se cumplen correctamente

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: Juan

- DNI: 30784219

- Edad: 42 años

- Términos y condiciones: Aceptados (checkbox marcado)

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Tirolesa realizada con éxito (1 cupo reservado)"

_Probar registrar la inscripción sin aceptar los términos y condiciones._ test_terminos_condiciones_vacio_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre, DNI y edad válidos

- Se proporciona el talle si la actividad lo requiere

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están disponibles para su aceptación

- El resto de las condiciones necesarias para realizar la inscripción se cumplen correctamente

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: Juan

- DNI: 30784219

- Edad: 42 años

- Términos y condiciones: No aceptados (checkbox sin marcar)

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "Debe aceptar los términos y condiciones de la actividad para completar la inscripción"

---

_Probar que una inscripción completada exitosamente dispare el envío del correo de confirmación_ test_inscripcion_exitosa_envia_correo_confirmacion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre, DNI y edad válidos

- Los términos y condiciones específicos de Tirolesa están aceptados

- Se dispone de una dirección de correo electrónico válida del visitante

- El sistema puede generar el código QR correspondiente a la inscripción

- Servicio de correo disponible y operativo

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: Felipe

- DNI: 30784219

- Edad: 42 años

- Correo electrónico: felipe@ejemplo.com

- Términos y condiciones: Aceptados

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Tirolesa realizada con éxito (1 cupo reservado)"

- Se genera la confirmación correspondiente a la inscripción

- Se invoca al servicio de envío de correos una única vez

- El correo de confirmación se dirige a felipe@ejemplo.com

_Probar que una inscripción rechazada no envía ningún correo electrónico._ test_inscripcion_rechazada_no_envia_correo

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs

- Cupos: 0 lugares libres en el turno

- El participante tiene nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos del participante

- Se dispone de una dirección de correo electrónico válida del visitante

- La inscripción no puede completarse debido a la falta de cupos disponibles

- Servicio de correo operativo

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: Felipe

- DNI: 30784219

- Edad: 42 años

- Correo electronico: felipe@ejemplo.com

- Términos y condiciones: Aceptados

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "No hay cupos disponibles para el horario seleccionado"

- No se registra la inscripción

- No se genera una confirmación de inscripción

- No se invoca al servicio de envío de correos

- No se envía ningún correo electrónico al visitante

_Probar el manejo de errores del sistema cuando falla el servicio de envío de correos._ test_fallo_envio_correo_detecta_error

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs

- Cupos: 5 lugares libres en el turno

- El participante tiene nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos del participante

- Se dispone de una dirección de correo electrónico válida del visitante

- La inscripción se registra correctamente

- El código QR correspondiente a la inscripción fue generado

- El servicio de envío de correos simulado presenta un fallo al intentar enviar la confirmación

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: Felipe

- DNI: 30784219

- Edad: 42 años

- Correo electrónico: felipe@ejemplo.com

- Términos y condiciones: Aceptados

- Respuesta del servicio de correo: Error de envío

**Resultado esperado:**

- Estado de la inscripción: REGISTRADA

- Estado del envío de correo: FALLIDO

- El sistema detecta el error producido por el servicio de correo

- Mensaje: "La inscripción se realizó correctamente, pero no se pudo enviar el correo de confirmación. Intente reenviar el correo."

_Probar que el correo de confirmación enviado contenga la información completa de la reserva._ test_correo_confirmacion_contiene_datos_completos_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible con cupos libres

- Los 2 participantes tienen nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos de los dos participantes

- Se dispone de una dirección de correo electrónico válida del visitante

- La inscripción se registra correctamente

- El código QR correspondiente a la inscripción fue generado

- Servicio de correo disponible y operativo

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 2 personas

- Participante 1: Felipe, DNI 30784219, edad 42años

- Participante 2: María, DNI 44123456, edad 23 años

- Correo electrónico: felipe@ejemplo.com

- Términos y condiciones: Aceptados

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Se genera el correo de confirmación correspondiente a la reserva

- El correo contiene el nombre de la actividad: Tirolesa

- El correo contiene el horario reservado: 10:00 a 11:00hs

- El correo contiene la cantidad de participantes: 2 personas

- El correo contiene la información de identificación de la inscripción

- El correo incluye el código QR correspondiente a la reserva

- Se invoca al servicio de envío de correos con la información completa definida para la confirmación

_Probar que una inscripción rechazada por datos incompletos no envíe ningún correo._ test_inscripcion_con_datos_incompletos_no_envia_correo

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- El participante tiene nombre y edad válidos

- No se ha completado el campo correspondiente al DNI del participante

- La cantidad declarada coincide con la cantidad de participantes proporcionados

- Se dispone de una dirección de correo electrónico válida del visitante

- El servicio de envío de correos simulado se encuentra disponible

- La inscripción no cumple con todos los datos obligatorios establecidos en la US

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: Felipe

- DNI: Null

- Edad: 42 años

- Correo electrónico: felipe@ejemplo.com

- Términos y condiciones: Aceptados

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "Debe ingresar el DNI del participante para completar la inscripción"

- No se registra la inscripción

- No se genera una confirmación de inscripción

- No se invoca al servicio de envío de correos

- No se envía ningún correo electrónico al visitante

---

Probar que una inscripción exitosa disminuye los cupos disponibles de la actividad test_inscripcion_exitosa_disminuye_cupos_disponibles

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 5 lugares libres en el turno

- Los 2 participantes tienen nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos de los 2 participantes

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 2 personas

- Participante 1: Juan, DNI 30784219, edad 42años

- Participante 2: María, DNI 44123456, edad 23 años

- Cupos disponibles antes de la inscripción: 5

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Tirolesa realizada con éxito (2 cupos reservados)"

- La inscripción se registra correctamente

- Se descuentan 2 cupos correspondientes a los participantes inscriptos

- Cupos disponibles después de la inscripción: 3

Probar que una inscripción rechazada no disminuye los cupos disponibles de la actividad test_inscripcion_rechazada_no_disminuye_cupos_disponibles

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos: 2 lugares libres en el turno

- Los 3 participantes tienen nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos de los 3 participantes

- Los términos y condiciones específicos de Tirolesa están aceptados

- La cantidad de cupos disponibles es inferior a la cantidad de personas que se desean inscribir

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 3 personas

- Participante 1: Juan, DNI 30784219, edad 42años

- Participante 2: María, DNI 44123456, edad 23 años

- Participante 3: Pedro, DNI 40123456, edad 27 años

- Cupos disponibles antes de la inscripción: 2

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "La cantidad de inscriptos supera la cantidad de cupos disponibles"

- No se registra la inscripción

- No se descuentan cupos de la actividad

- Cupos disponibles después del intento de inscripción: 2

- Se mantiene la disponibilidad original del turno sin realizar reservas parciales

_Probar inscribirse en una actividad con cupos disponibles cuando el parque se encuentra cerrado_ test_parque_cerrado_rechaza_inscripcion

**Precondiciones**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs configurado

- Cupos: 5 lugares libres en el turno

- El parque se encuentra cerrado temporalmente durante el horario elegido

- El participante tiene nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están aceptados

- Estado del parque: CERRADO

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: Felipe

- DNI: 30784219

- Edad: 42 años

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "No es posible realizar la inscripción porque el parque se encuentra cerrado"

- No se registra la inscripción

_Probar inscribirse en una actividad que se encuentra deshabilitada, aunque tenga cupos disponibles_ test_actividad_no_disponible_rechaza_inscripcion

**Precondiciones:**

- Actividad Palestra registrada en el sistema

- La actividad Palestra se encuentra deshabilitada temporalmente

- Horario configurado: Turno de 15:00 a 16:00hs

- Cupos: 5 lugares libres en el turno

- El parque se encuentra abierto

- El participante tiene nombre, DNI, edad y talle de calzado válidos

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Palestra están aceptados

- Estado de la actividad: DESHABILITADA

**Entrada:**

- Actividad seleccionada: Palestra

- Horario seleccionado: 15:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: Felipe

- DNI: 30784219

- Edad: 42 años

- Talle de calzado: 41

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "La actividad seleccionada no se encuentra disponible para realizar inscripciones"

- No se registra la inscripción

_Probar inscribirse en un turno sin cupos cuando existen lugares disponibles en otro turno de la misma actividad_

test_cupos_en_otro_horario_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs

- Horario Habilitado: Turno de 11:00 a 12:00hs

- Cupos disponibles en el turno de 10:00 a 11:00hs: 0

- Cupos disponibles en el turno de 11:00 a 12:00hs: 5

- El participante tiene nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: Felipe

- DNI: 30784219

- Edad: 42 años

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "No hay cupos disponibles para el horario seleccionado"

- No se registra la inscripción

- Los cupos disponibles del turno de 11:00 a 12:00 hs permanecen en 5, sin ser utilizados para la inscripción solicitada a las 10:00 hs.

_Probar que una inscripción exitosa en un turno no modifique los cupos disponibles de otro turno_ test_inscripcion_en_un_horario_no_modifica_cupos_de_otro

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Horario Habilitado: Turno de 11:00 a 12:00hs disponible

- Cupos disponibles en el turno de 10:00 a 11:00hs: 5

- Cupos disponibles en el turno de 11:00 a 12:00hs: 8

- Los 2 participantes tienen nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos de los 2 participantes

- Los términos y condiciones específicos de Tirolesa están aceptados

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 2 personas

- Participante 1: Felipe, DNI 30784219, edad 42 años

- Participante 2: María, DNI 44123456, edad 23 años

- Cupos disponibles antes de la inscripción en el turno de 10:00hs: 5

- Cupos disponibles antes de la inscripción en el turno de 11:00hs: 8

**Resultado esperado:**

- Estado de la operación: EXITOSA

- Mensaje: "Inscripción para Tirolesa realizada con éxito (2 cupos reservados)"

- La inscripción se registra correctamente en el turno de 10:00 a 11:00hs

- Se descuentan 2 cupos únicamente del turno seleccionado

- Cupos disponibles después de la inscripción en el turno de 10:00hs: 3

- Cupos disponibles después de la inscripción en el turno de 11:00hs: 8

- La disponibilidad del otro turno permanece sin modificaciones

_Probar que una inscripción sea rechazada cuando los cupos se agotan antes de confirmar la reserva_ test_cupos_agotados_antes_confirmacion_rechaza_inscripcion

**Precondiciones:**

- Actividad Tirolesa registrada, activa y habilitada

- Horario Habilitado: Turno de 10:00 a 11:00hs disponible

- Cupos iniciales: 1 lugar libre en el turno

- El participante tiene nombre, DNI y edad válidos

- La cantidad declarada coincide con los datos del participante

- Los términos y condiciones específicos de Tirolesa están aceptados

- El visitante seleccionó el horario cuando existía un cupo disponible

- Antes de confirmar la inscripción, otra reserva ocupa el último cupo disponible

- Al momento de confirmar, el turno tiene 0 cupos disponibles

**Entrada:**

- Actividad seleccionada: Tirolesa

- Horario seleccionado: 10:00hs

- Cantidad de inscriptos: 1 persona

- Nombre del participante: Felipe

- DNI: 30784219

- Edad: 42 años

- Cupos disponibles al seleccionar el horario: 1

- Cupos disponibles al confirmar la inscripción: 0

**Resultado esperado:**

- Estado de la operación: RECHAZADA

- Mensaje: "No hay cupos disponibles para el horario seleccionado"

- El sistema verifica nuevamente la disponibilidad de cupos antes de confirmar la inscripción

- El sistema detecta que los cupos disponibles se agotaron

- No se registra la inscripción del visitante

- No se descuentan cupos adicionales

- Cupos disponibles después del intento de inscripción: 0

- El sistema impide confirmar una reserva utilizando una disponibilidad desactualizada