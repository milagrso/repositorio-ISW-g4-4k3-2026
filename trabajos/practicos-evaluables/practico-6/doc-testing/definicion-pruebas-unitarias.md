# Definición test unitarios 

test\_tirolesa\_con\_cupo\_permite\_inscripcion  
test\_tirolesa\_sin\_cupo\_rechaza\_inscripcion  
test\_tirolesa\_fuera\_horario\_rechaza\_inscripcion  
test\_tirolesa\_sin\_horario\_seleccionado\_rechaza\_inscripcion

test\_safari\_con\_cupo\_permite\_inscripcion  
test\_safari\_sin\_cupo\_rechaza\_inscripcion  
test\_safari\_fuera\_horario\_rechaza\_inscripcion  
test\_safari\_sin\_horario\_seleccionado\_rechaza\_inscripcion

test\_palestra\_con\_cupo\_permite\_inscripcion  
test\_palestra\_sin\_cupo\_rechaza\_inscripcion  
test\_palestra\_fuera\_horario\_rechaza\_inscripcion  
test\_palestra\_sin\_horario\_seleccionado\_rechaza\_inscripcion

test\_jardineria\_con\_cupo\_permite\_inscripcion  
test\_jardineria\_sin\_cupo\_rechaza\_inscripcion  
test\_jardineria\_fuera\_horario\_rechaza\_inscripcion  
test\_jardineria\_sin\_horario\_seleccionado\_rechaza\_inscripcion

test\_actividad\_no\_seleccionada\_rechaza\_inscripcion

—------------------------------------------------------------------  
test\_una\_persona\_con\_cupo\_permite\_inscripcion  
test\_varias\_personas\_con\_cupos\_permite\_inscripcion  
test\_cero\_personas\_rechaza\_inscripcion  
test\_cantidad\_igual\_a\_cupo\_permite\_inscripcion  
test\_cantidad\_supera\_cupo\_rechaza\_inscripcion  
test\_cantidad\_negativa\_rechaza\_inscripcion  
test\_cantidad\_no\_ingresada\_rechaza\_inscripcion  
test\_cantidad\_decimal\_rechaza\_inscripcion  
test\_cantidad\_entera\_permite\_inscripcion

—------------------------------------------------------------------------------------
test\_nombre\_ingresado\_permite\_inscripcion  
test\_nombre\_no\_ingresado\_rechaza\_inscripcion  
test\_nombre\_con\_numeros\_rechaza\_inscripcion  
test\_nombre\_con\_letras\_permite\_inscripcion  
test\_nombre\_solo\_espacios\_rechaza\_inscripcion

test\_dni\_ingresado\_permite\_inscripcion  
test\_dni\_no\_ingresado\_rechaza\_inscripcion  
test\_dni\_numero\_entero\_positivo\_permite\_inscripcion  
test\_dni\_numero\_decimal\_rechaza\_inscripcion  
test\_dni\_letras\_rechaza\_inscripcion  
test\_dni\_solo\_espacios\_rechaza\_inscripcion  
test\_dni\_7\_digitos\_permite\_inscripcion  
test\_dni\_8\_digitos\_permite\_inscripcion  
test\_dni\_mas\_8\_digitos\_rechaza\_inscripcion  
test\_dni\_menos\_7\_digitos\_rechaza\_inscripcion

test\_edad\_ingresada\_permite\_inscripcion  
test\_edad\_no\_ingresada\_rechaza\_inscripcion  
test\_edad\_entera\_positiva\_permite\_inscripcion  
test\_edad\_con\_letras\_rechaza\_inscripcion  
test\_edad\_decimal\_rechaza\_inscripcion  
test\_edad\_negativa\_rechaza\_inscripcion  
test\_edad\_cero\_rechaza\_inscripcion  
test\_edad\_solo\_espacios\_rechaza\_inscripcion

test\_talle\_requerido\_ingresado\_permite\_inscripcion  
test\_talle\_requerido\_no\_ingresado\_rechaza\_inscripcion  
test\_talle\_no\_requerido\_no\_ingresado\_permite\_inscripcion  
test\_talle\_no\_requerido\_ingresado\_permite\_inscripcion

test\_todos\_participantes\_con\_datos\_completos\_permite\_inscripcion  
test\_un\_participante\_con\_datos\_incompletos\_rechaza\_inscripcion  
test\_varios\_participantes\_con\_datos\_incompletos\_rechaza\_inscripcion

—------------------------------------------------------------------------------------
test\_terminos\_condiciones\_aceptados\_permite\_inscripcion  
test\_terminos\_condiciones\_vacio\_rechaza\_inscripcion

—------------------------------------------------------------------------------------
test\_inscripcion\_exitosa\_envia\_correo\_confirmacion  
test\_inscripcion\_rechazada\_no\_envia\_correo  
test\_fallo\_envio\_correo\_detecta\_error  
test\_correo\_confirmacion\_contiene\_datos\_completos\_inscripcion  
test\_inscripcion\_con\_datos\_incompletos\_no\_envia\_correo  