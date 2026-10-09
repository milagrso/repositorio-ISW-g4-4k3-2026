# Definición test unitarios 

Probar seleccionar la actividad tirolesa con cupos y horario disponible.
test\_tirolesa\_con\_cupo\_permite\_inscripcion  

Probar seleccionar la actividad tirolesa sin cupos disponibles. 
test\_tirolesa\_sin\_cupo\_rechaza\_inscripcion  

Probar seleccionar la actividad tirolesa con cupos disponibles y fuera de horario
test\_tirolesa\_fuera\_horario\_rechaza\_inscripcion  

Probar seleccionar la actividad tirolesa con cupos disponibles sin seleccionar horario. 
test\_tirolesa\_sin\_horario\_seleccionado\_rechaza\_inscripcion

--- 
Probar seleccionar la actividad safari con cupos y horario disponible.
test\_safari\_con\_cupo\_permite\_inscripcion  

Probar seleccionar la actividad safari sin cupos disponibles. 
test\_safari\_sin\_cupo\_rechaza\_inscripcion  

Probar seleccionar la actividad safari con cupos disponibles y fuera de horario
test\_safari\_fuera\_horario\_rechaza\_inscripcion  

Probar seleccionar la actividad safari con cupos disponibles sin seleccionar horario. 
test\_safari\_sin\_horario\_seleccionado\_rechaza\_inscripcion

--- 

Probar seleccionar la actividad palestra con cupos y horario disponible.
test\_palestra\_con\_cupo\_permite\_inscripcion  

Probar seleccionar la actividad palestra sin cupos disponibles. 
test\_palestra\_sin\_cupo\_rechaza\_inscripcion  

Probar seleccionar la actividad palestra con cupos disponibles y fuera de horario
test\_palestra\_fuera\_horario\_rechaza\_inscripcion  

Probar seleccionar la actividad palestra con cupos disponibles sin seleccionar horario. 
test\_palestra\_sin\_horario\_seleccionado\_rechaza\_inscripcion

---

Probar seleccionar la actividad jardineria con cupos y horario disponible.
test\_jardineria\_con\_cupo\_permite\_inscripcion  

Probar seleccionar la actividad jardineria sin cupos disponibles. 
test\_jardineria\_sin\_cupo\_rechaza\_inscripcion  

Probar seleccionar la actividad jardineria con cupos disponibles y fuera de horario.
test\_jardineria\_fuera\_horario\_rechaza\_inscripcion  

Probar seleccionar la actividad jardineria con cupos disponibles sin seleccionar horario. 
test\_jardineria\_sin\_horario\_seleccionado\_rechaza\_inscripcion

Probar registrar actividad sin seleccionar una actividad. 
test\_actividad\_no\_seleccionada\_rechaza\_inscripcion

---
Probar ingresar cantidad de una persona habiendo cupos disponibles
test\_una\_persona\_con\_cupo\_permite\_inscripcion  

Probar ingresar más de una persona habiendo cupos disponibles para esa cantidad
test\_varias\_personas\_con\_cupos\_permite\_inscripcion  

Probar ingresar cero personas
test\_cero\_personas\_rechaza\_inscripcion  

Probar ingresar la misma cantidad de personas que de cupos disponibles
test\_cantidad\_igual\_a\_cupo\_permite\_inscripcion  

Probar ingresar una cantidad de personas mayor a la cantidad de cupos disponibles
test\_cantidad\_supera\_cupo\_rechaza\_inscripcion  

Probar ingresar una cantidad negativa de numeros de personas
test\_cantidad\_negativa\_rechaza\_inscripcion  

Probar dejar campo vacío de la cantidad de personas que participan de la actividad. 
test\_cantidad\_no\_ingresada\_rechaza\_inscripcion  

Probar ingresar un número no entero de personas
test\_cantidad\_decimal\_rechaza\_inscripcion  

Probar ingresar un número entero de personas 
test\_cantidad\_entera\_permite\_inscripcion

---

Probar ingresar nombre 
test\_nombre\_ingresado\_permite\_inscripcion  

Probar dejar campo vacío de nombre 
test\_nombre\_no\_ingresado\_rechaza\_inscripcion  

Probar ingresar nombre con algún número 
test\_nombre\_con\_numeros\_rechaza\_inscripcion  

Probar ingresar un nombre solo con letras
test\_nombre\_con\_letras\_permite\_inscripcion  

Probar ingresar nombre con caracteres especiales no permitidos (ej: `@`, `$`, `%`)
test_nombre_con_caracteres_especiales_rechaza_inscripcion

Probar ingresar nombre con solo espacios
test\_nombre\_solo\_espacios\_rechaza\_inscripcion

Probar ingresar un DNI valido 
test\_dni\_ingresado\_permite\_inscripcion  

Probar dejar campo vacío de DNI
test\_dni\_no\_ingresado\_rechaza\_inscripcion  

Probar ingresar DNI con números enteros
test\_dni\_numero\_entero\_positivo\_permite\_inscripcion  

Probar ingresar DNI con números decimales
test\_dni\_numero\_decimal\_rechaza\_inscripcion  

Probar ingresar DNI con letras
test\_dni\_letras\_rechaza\_inscripcion  

Probar ingresar DNI con espacios
test\_dni\_con\_espacios\_rechaza\_inscripcion  
Probar ingresar DNI solo con espacios
test\_dni\_solo\_espacios\_rechaza\_inscripcion  

Probar ingresar un DNI de 7 dígitos
test\_dni\_7\_digitos\_permite\_inscripcion  

Probar ingresar un DNI de 8 dígitos
test\_dni\_8\_digitos\_permite\_inscripcion  

Probar ingresar un DNI de más de 8 dígitos
test\_dni\_mas\_8\_digitos\_rechaza\_inscripcion  

Probar ingresar un DNI de menos de 7 dígitos
test\_dni\_menos\_7\_digitos\_rechaza\_inscripcion

Probar ingresar una edad válida.
test_edad_ingresada_permite_inscripcion

Probar dejar el campo de edad vacío.
test_edad_no_ingresada_rechaza_inscripcion

Probar ingresar una edad con un número entero positivo.
test_edad_entera_positiva_permite_inscripcion

Probar ingresar una edad que contenga letras o texto.
test_edad_con_letras_rechaza_inscripcion

Probar ingresar una edad con números decimales.
test_edad_decimal_rechaza_inscripcion

Probar ingresar una edad con valor negativo.
test_edad_negativa_rechaza_inscripcion

Probar ingresar cero como valor de edad.
test_edad_cero_rechaza_inscripcion

Probar ingresar solo espacios en el campo de edad.
test_edad_solo_espacios_rechaza_inscripcion

Probar ingresar el talle en una actividad que lo requiere obligatoriamente.
test_talle_requerido_ingresado_permite_inscripcion

Probar no ingresar el talle en una actividad donde es obligatorio.
test_talle_requerido_no_ingresado_rechaza_inscripcion

Probar no ingresar el talle en una actividad que no lo requiere.
test_talle_no_requerido_no_ingresado_permite_inscripcion

Probar ingresar un talle opcional en una actividad que no lo requiere.
test_talle_no_requerido_ingresado_permite_inscripcion

Probar inscribir a todos los participantes con sus datos personales completos y válidos.
test\_todos\_participantes\_con\_datos\_completos\_permite\_inscripcion  

Probar inscribir al grupo con un participante con datos incompletos.
test\_un\_participante\_con\_datos\_incompletos\_rechaza\_inscripcion  

Probar inscribir al grupo con múltiples participantes con datos incompletos.
test\_varios\_participantes\_con\_datos\_incompletos\_rechaza\_inscripcion

---

Probar registrar la inscripción marcando la aceptación de términos y condiciones.
test\_terminos\_condiciones\_aceptados\_permite\_inscripcion  

Probar registrar la inscripción sin aceptar los términos y condiciones.
test\_terminos\_condiciones\_vacio\_rechaza\_inscripcion

--- 


Probar que una inscripción completada exitosamente dispare el envío del correo de confirmación.
test\_inscripcion\_exitosa\_envia\_correo\_confirmacion  

Probar que una inscripción rechazada o fallida no envíe ningún correo electrónico.
test\_inscripcion\_rechazada\_no\_envia\_correo  

Probar el manejo de errores del sistema cuando falla el servicio de envío de correos.
test\_fallo\_envio\_correo\_detecta\_error  

Probar que el correo de confirmación enviado contenga la información completa de la reserva.
test\_correo\_confirmacion\_contiene\_datos\_completos\_inscripcion  

Probar que una inscripción rechazada por datos incompletos no envíe ningún correo.
test\_inscripcion\_con\_datos\_incompletos\_no\_envia\_correo  