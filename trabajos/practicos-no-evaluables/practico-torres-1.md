#Taller #Practico #Diseño 
#### Reconocimiento

**Roles:**

- Ejecutor de gastos (EG)

**Funcionalidades:**

- [x] Registrar gasto 
	- [x] con monto, tipo y fecha de gasto actual 
	- [x] Registrar gasto con fecha actual
	- [x] Modificar fecha de registro
	- [x] Registrar gastos propios o ajenos con nombre y apellido
	- [x] Autocompletado del nombre
- [x] Visualizar gastos 
	- [x] con monto, tipo y fecha de gasto actual 
	- [x] Ordenados del gasto mas actual
	- [x] Del mes actual
- [x] Registrarse
- [x] Loguearse
	- [x] Sin caducidad de la sesion
	- [x] Visualizar datos del usuario
- [x] Filtrar gastos
	- [x] por tipo, responsable, rango de montos
	- [x] periodo
	- [x] Modificar ordenamiento
	- [x] Total de gastos


#### User history

###### **1. Visualizar gastos con campos**

Como EG quiero visualizar una planilla de gastos para monitorear mis gastos y no exceder mi presupuesto.

**Estimación:** 3

**Criterios de aceptación:**

- Se puede visualizar los registros de los gastos con monto, tipo, responsable y fecha de gasto
- Se pueden visualizar los gastos del mes actual por defecto
- Se pueden visualizar los gastos ordenados desde el gasto más actual

**Pruebas de usuario**

- Probar de visualizar el monto, tipo, responsable y fecha de un gasto en particular (pasa)
- Probar de visualizar que las fechas de todos los registros coincidan con el mes actual (pasa)

###### **2. Registrar nuevo gasto**

Como EG quiero registrar mis gastos para poder analizarlos por periodos en base a mi presupuesto

**Estimación:** 5

**Criterios de aceptación:**

- Se pueden registrar un gasto indicando monto, tipo, fecha actual del gasto y responsable
- Se puede modificar la fecha por defecto que se completa durante el registro, para registrar un gasto de otra fecha
- Los gastos se registran con el nombre y apellido de la persona logeada por defecto 
- Se pueden registrar gastos con el nombre y apellido de otra persona
- Se puede auto completar el nombre y apellido de una persona la cual un gasto fue previamente registrado

**Pruebas de usuario**

* Probar de registrar un gasto y que se registre con la fecha actual (Pasa)
* Probar de ingresar un monto negativo (Falla)
* Probar de registrar un gasto en una fecha posterior (Pasa)
- Probar de ingresar un nombre nunca antes registrado y que se auto complete (falla)
- Probar registrar un gasto en nombre de otra persona y que se visualice correctamente en la tabla (pasa)

###### **3. Registrar usuario**

Como usuario quiero registrarme como usuario para acceder a la aplicación

**Estimación:** 3

**Criterios de aceptación:**

- Se puede registrar un usuario indicando su nombre y apellido y las credenciales

**Pruebas de usuario**

- Probar de registrar mi usuario en la aplicación al iniciar (pasa)

###### **4. Iniciar sesion**

Como usuario quiero iniciar sesion para utilizar los servicios que brinda la aplicacion

**Estimación:** 3

**Criterios de aceptación:**

- Se puede iniciar sesion con el nombre y apellido y las credenciales
- Se puede ver el nombre y apellido del usuario logeado
- Se puede mantener la sesión permanentemente hasta cerrar sesion
- Se puede cerrar la sesión para que esta caduque 

**Pruebas de usuario**

- Probar de cerrar sesion (pasa)
- Probar de iniciar sesion con credenciales incorrectas (falla)
- Probar de visualizar el nombre y el apellido una vez iniciada la sesion (pasa)

###### **5. Filtrar gastos**

Como EG quiero filtrar los gastos que se visualizan para tomar mejores desiciones financieras en base a distintos criterios

**Estimación:** 5

**Criterios de aceptación:**

- Se puede filtrar los gastos por tipo de gasto, responsable de gasto 
- Se pueden filtrar los gastos por un periodo de fechas
- Se pueden filtrar los gastos por un periodo de montos
- Se puede visualizar el monto total de los registros filtrados
- Se pueden elegir el criterio de ordenamiento de la visualización de los gastos por tipo de gasto, responsable, monto y fecha

**Pruebas de usuario**

- Probar de filtrar por un tipo de gasto y visualizar solo los gastos de ese tipo (pasa)
- Probar de filtrar los gastos por una fecha inicio mas tardia que la fecha fin (falla)
- Probar de filtrar los gastos por un monto minimo mas grande que el monto maximo (falla)
- Probar de ordenar por fecha de manera ascendente y visualizar los gasto mas antiguos primero
- Probar de filtrar los gastos por un criterio y que la cantidad registros visualizados coincidan con la cantidad total de registros

