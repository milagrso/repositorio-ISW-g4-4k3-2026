# PRÁCTICO 1 - REQUERIMIENTOS ÁGILES – User Stories
- Unidad Nro. 2: Gestión Lean-Ágil de Productos de Software. 
- Consigna: Identificar y escribir las US identificadas en el Dominio presentado para el práctico. 
- Objetivo: Aplicar los conceptos teóricos desarrollados en clase sobre User Stories.
- Propósito: Familiarizarse con los conceptos de requerimientos ágiles y en particular con Historias de Usuario (User
Stories), Épicas y Temas
- Entradas: Conceptos teóricos sobre el tema, desarrollados en clase. Bibliografía referenciada en la modalidad
académica. Enunciado, consigna y tarjeta de US.
- Salida:   ● Identificación de los roles principales
            ● US identificadas con sus tarjetas completas
Este práctico no se entrega y por lo tanto no tiene nota. El tema se evalúa en el parcial.
- Instrucciones: Los docentes representarán a expertos del dominio que expresarán sus necesidades vinculadas a desarrollar
un software para un servicio de transporte.
Los estudiantes realizarán preguntas con el objetivo de acordar juntos el alcance del proyecto, y determinar
las user stories correspondientes y definir las pruebas de aceptación de usuario para cada una.
Cada grupo presentará el resultado obtenido al final de la clase al resto del curso.

## Aplicación Mis Gastos Familiares
Objetivo del producto: facilitar a las personas la gestión de sus gastos cotidianos y poder acceder a información relacionada a
estos.
A continuación, se transcribe parte de la entrevista realizada al experto en el dominio:
Product Owner (PO): ¿Cómo debe visualizarse la planilla de gastos?
Experto en el Dominio (ED): Similar a una tabla en Excel, con columnas donde se pueda indicar el monto, el tipo de gasto, y la
fecha en que se realizó el gasto.
PO: ¿La fecha del gasto es la fecha actual? ¿Se toma automáticamente?
ED: Debería mostrar la fecha actual, pero permitir modificarse.
PO: ¿Cuáles son los tipos de gastos permitidos?
ED: Cada persona debería poder registrar sus tipos de gastos, así como indicar si el gasto es propio o de otra persona (por
ejemplo, de su esposa).
PO: ¿El nombre o la relación con el usuario debe indicarse?
ED: Debe indicarse el nombre y apellido. También por defecto debe mostrarse el nombre y el apellido del usuario logueado,
permitiendo modificarlo, y si alguna vez se registró el nombre y apellido que se comienza a ingresar (no importa si esta vez o
una vez anterior), el sistema debería mostrar aquellos nombres y apellidos que comiencen de forma similar, como hace el
Excel.
PO: Ah ¿Es decir que el usuario debe registrarse y cuando va a usar la aplicación debe iniciar sesión?, y ¿la sesión caduca en
algún momento?
ED: El usuario debe registrarse para permitirle descargar la aplicación, y la primera vez debe iniciar sesión, pero luego se
consideran los datos de la sesión registrados, salvo que el usuario decida de loguearse. La sesión no caduca nunca.
PO: ¿Y la planilla de gastos muestra todos los gastos? ¿Cómo se ordenan?
ED: Por defecto se deben mostrar todos los gastos del mes en curso ordenados desde el gasto más actual, pero el sistema
debería permitir ver cualquier período que el usuario quiera, y que pueda filtrar por tipo de gasto, por responsable de gasto,
por rango de montos. Además debe poder modificar el criterio de ordenamiento. Y para cada filtro que se aplique arriba se
debe mostrar el total de gastos según el filtro aplicado.

### Roles identificados
1. Usuario
2. Ejecutor de gastos

### US identificadas
US1: Visualizar gastos ordenados por fecha
Como ejecutor de gastos quiero visualizar mis gastos ordenados por fecha para poder consultar los datos de mis gastos de forma ordenada. 
Criterios de aceptación:
    - Los gastos deben visualizarse en formato de tabla.
    - Deben mostrarse el monto, tipo de gasto y fecha.
    - Por defecto, deben mostrarse los gastos del mes en curso.
    - Los gastos deben ordenarse por fecha, desde el más actual al más antiguo.
    - Debe poder modificarse el criterio de ordenamiento.
    - Debe poder seleccionarse orden ascendente o descendente.

US2: Modificar fecha de gasto 
Como ejecutor de gastos quiero modificar mi fecha de gasto para corregir posibles errores y mantener actualizada la información del gasto. 
Criterios de aceptación: 
    - La fecha debe tener un formato válido. 
    - La fecha actual debe mostrarse por defecto al registrar un gasto.

US3: Registrar tipo de gasto
Como ejecutor de gastos quiero registrar un tipo de gasto para poder categorizar mis gastos. 
Criterios de aceptación: 
    - El usuario debe poder ingresar un nuevo tipo de gasto.
    - El tipo de gasto debe quedar disponible para utilizarlo al registrar un gasto.
    - Los tipos de gasto deben asociarse al usuario que los registra.

US5: Iniciar sesión
Como usuario quiero inicar sesión para acceder a la aplicación. 
Criterios de aceptación: 
    - El usuario debe poder iniciar sesión con sus credenciales registradas.
    - Una vez iniciada la sesión, esta debe mantenerse registrada.
    - La sesión no debe caducar automáticamente.

US6: Registrar usuario
Como usuario quiero registrarme en la aplicación para poder utilizarla.
Criterios de aceptación: 
    - Debe permitir ingresar los datos necesarios para registrarse.
    - No debe permitirse registrar un usuario que ya exista.
    - Una vez registrado, el usuario debe poder iniciar sesión.

US7: Cerrar sesión
Como usuario quiero cerrar sesión para impedir el acceso a mi cuenta desde la aplicación.
Criterios de aceptación: 
    - El usuario debe poder cerrar su sesión.
    - Luego de cerrar sesión, debe solicitarse nuevamente el inicio de sesión para acceder a la aplicación.

US8: Filtrar gastos por período
Como ejecutor de gastos quiero visualizar mis gastos filtrados por un período para consultar los gastos correspondientes a determinadas fechas.
Criterios de aceptación: 
    - Debe poder seleccionarse un período mediante una fecha inicial y una fecha final.
    - Las fechas deben tener un formato válido.
    - Deben mostrarse únicamente los gastos correspondientes al período seleccionado.
    - Debe mostrarse el total de gastos correspondiente al filtro aplicado. 

US9: Filtrar gastos por tipo de gastos
Como ejecutor de gastos quiero visualizar mis gastos filtrados por tipo de gasto para consultar los gastos correspondientes a una categoría determinada.
Criterios de aceptación: 
    - Debe poder seleccionarse un tipo de gasto existente.
    - Deben mostrarse únicamente los gastos correspondientes al tipo seleccionado.
    - Debe mostrarse el total de gastos correspondiente al filtro aplicado. 

US10: Filtrar gastos por responsable de gastos
Como ejecutor de gastos quiero visualizar mis gastos filtrados por responsable para consultar los gastos realizados por una persona determinada.
Criterios de aceptación:
    - Debe poder seleccionarse un responsable registrado.
    - Deben mostrarse únicamente los gastos correspondientes al responsable seleccionado.
    - Debe mostrarse el total de gastos correspondiente al filtro aplicado. 

US11: Registrar responsable de gasto
Como ejecutor de gastos quiero indicar quién realizó un gasto para poder identificar al responsable del mismo.
Criterios de aceptación:
    - Debe poder indicarse si el gasto es propio o de otra persona.
    - Debe poder ingresarse nombre y apellido del responsable.
    - Por defecto debe mostrarse el nombre y apellido del usuario logueado.
    - Al comenzar a ingresar un nombre y apellido previamente registrado, el sistema debe mostrar coincidencias.

US12: Registrar gasto
Como ejecutor de gastos quiero registrar un gasto para poder llevar un control de mis gastos familiares.
Criterios de aceptación: 
    - Debe poder ingresarse el monto del gasto.
    - El monto debe ser un valor positivo.
    - Debe poder seleccionarse un tipo de gasto registrado.
    - Debe mostrarse la fecha actual por defecto.
    - Debe poder modificarse la fecha.
    - Debe poder indicarse quién realizó el gasto.
    - Debe poder indicarse el nombre y apellido del responsable.
    - Por defecto debe mostrarse el nombre y apellido del usuario logueado.
    - Al ingresar un nombre previamente registrado, deben mostrarse las coincidencias correspondientes.