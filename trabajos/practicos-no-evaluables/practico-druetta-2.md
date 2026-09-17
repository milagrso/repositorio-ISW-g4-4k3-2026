# PRÁCTICO 2 - REQUERIMIENTOS ÁGILES – User Stories y Estimaciones
- Unidad: Unidad Nro. 2: Gestión Lean-Ágil de Productos de Software
- Consigna: Identificar y escribir las US identificadas en el Dominio presentado para el práctico
- Objetivo: Aplicar los conceptos teóricos desarrollados en clase sobre User Stories.
- Propósito: Familiarizarse con los conceptos de requerimientos ágiles y en particular con US, Épicas, Temas y MVP..
- Entradas: Conceptos teóricos sobre el tema, desarrollados en clase. Bibliografía referenciada sobre el tema.
- Enunciado, consigna y tarjeta de US.
- Salida:   ● Identificación de los roles principales
            ● El MVP explicando el alcance propuesto y justificando la inclusión de las User Stories seleccionadas y el porqué de aquellas excluidas en el mismo
            ● US identificadas con sus tarjetas completas
            ● User Story canónica
            ● User Stories estimadas
Este práctico no se entrega y por lo tanto no tiene nota. El tema se evalúa en el parcial.
- Instrucciones: Los docentes representarán a expertos del dominio que expresarán sus necesidades vinculadas al
desarrollar un software para el servicio de EcoHarmony Park.
Los estudiantes realizarán preguntas con el objetivo de acordar juntos el alcance del proyecto, determinar las User Stories correspondientes y definir las pruebas de aceptación de usuario para cada una.
Cada grupo presentará el resultado obtenido al final de la clase al resto del curso.

## Aplicación EcoHarmony Park
Los dueños del bioparque “EcoHarmony Park” están evaluando el desarrollo de una aplicación móvil (Android, iOs) ya
que la cantidad de visitantes anuales aumentaron significativamente al igual que los avances tecnológicos. La misma tiene
como objetivo mejorar la experiencia de los visitantes al proporcionar información útil y enriquecedora sobre las exhibiciones,
los horarios de alimentación de los animales, los senderos para caminar y otros aspectos del parque como la autogestión al
momento de realizar la compra de entradas.
Hemos tenido el privilegio de entablar una conversación con Miguel Rodríguez, uno de los propietarios de
EcoHarmony Park, y a continuación, compartimos los detalles de la interacción:
El Doce: ¡Hola! Estoy aquí en el hermoso bioparque "EcoHarmony Park" con el Sr. Rodríguez, para hablar sobre una
emocionante novedad: ¡una nueva aplicación móvil que mejorará la experiencia de los visitantes aquí en el parque! ¿Me
podrías contar brevemente en qué consiste la aplicación?
Miguel: ¡Hola! Gracias por tomarte el tiempo para hablar conmigo. Estoy encantado de compartir más detalles sobre
la idea de nuestra aplicación. En primer lugar, ofrecerá a los visitantes mapas interactivos que les ayudarán a explorar el
parque de manera más eficiente. Asimismo, proporcionará información detallada sobre cada exhibición y horario de
alimentación de cada especie que cuidamos. También se podrá autogestionar la compra de entradas al parque, pudiendo
realizar directamente el pago a través de la pasarela de Mercado Pago, lo que permitirá agilizar el ingreso. Por último, los
visitantes pueden inscribirse a las diferentes actividades diarias que posee el parque.
El Doce: Wow! Que interesante ¿Podrías explicarme cómo puede un visitante acceder a los horarios de alimentación
a través de la aplicación?
Miguel: ¡Claro! Una vez que descarguen la aplicación y la abran, encontrarán una sección dedicada a "Horarios de
Alimentación disponibles". Cada horario estará detallado de manera clara, indicando la especie, nombre del animal, edad,
hora programada, sector del parque (terrestres, acuáticos o aéreos) y cuidador encargado (nombre y apellido). Por otra parte,
aquellos que estén próximos a comenzar (faltando una hora) los mostraremos con un mensaje que diga: ¡Apúrate que ya
comienza!
Es importante considerar que los horarios se mostrarán en orden, comenzando con los más próximos a la fecha actual
y extendiéndose hasta una semana en el futuro. Para que sea más amigable la interfaz pensamos en proporcionar laposibilidad de filtrar por la fecha en la que el visitante estará en el parque y que se visualicen únicamente los horarios
correspondientes a la misma.
Además, en una versión posterior, los visitantes podrán configurar notificaciones para recibir recordatorios de los
horarios de alimentación que deseen seguir de cerca.
El Doce: ¡Eso suena muy útil! ¡Al igual que el mapa interactivo! ¿Podrías comentarme cuáles serán los elementos y
características del parque que estarán disponibles para visualizar en él? ¿Qué acciones podrán llevar a cabo los visitantes a
través de esta herramienta?
Miguel: Este mapa ofrece una vista panorámica de todo el parque, dividido en sectores diferenciados por colores.
Asimismo, el mapa contiene íconos informativos: “Inodoro” para identificar los baños distribuidos en el parque, una “Bolsa”
para indicar los puntos de venta, y un “Micrófono” para el show especial del día. Los visitantes pueden hacer click en este
último icono para obtener el nombre del show y su horario, en caso de que haya un show programado. En una futura mejora
pensamos incluir en este mapa la ubicación del visitante en tiempo real.
El Doce: Para alguien como yo, con un sentido de la orientación no muy desarrollado, suena como una herramienta
imprescindible, ¡jaja! ¿Hay otros aspectos del parque que también planean ofrecer a través de la aplicación? ¿Habías
mencionado la inscripción a las actividades, no es cierto?
Miguel: Si! me estaba olvidando de comentarlo. El parque ofrece la posibilidad de realizar actividades de una hora
sumamente enriquecedoras para los visitantes, entre las que se encuentran “Tirolesa”, “Safari”, “Palestra” y “Jardinería”. Para
poder realizar la inscripción deben seleccionar del conjunto de actividades la que desean realizar, eligiendo en primer lugar el
horario y completando luego los datos del visitante: nombre, DNI, edad y talla de vestimenta si la actividad lo demanda.
Finalmente, para concluir el proceso de inscripción, pedimos a los visitantes que acepten los términos y condiciones
específicos de la actividad en la que participarán, enviando el resumen de la inscripción con un QR al mail del visitante. Nos
interesa gestionar la inscripción de las actividades porque tienen cupos limitados y es muy útil para planificarlas con
anterioridad según los inscriptos que tengamos.
El Doce: Para finalizar esta pequeña entrevista, ¿Podrías explicarme el proceso de compra de entradas a través de la
app?
Miguel: !Pero claro! Para realizar la compra de entradas el visitante debe registrarse en la aplicación, ingresando un
mail y una contraseña. A continuación, debe ingresar a la sección “Comprar entradas” y allí indicar la fecha de visita deseada,
la cantidad de entradas requeridas (que no puede superar las 10) y la edad de cada visitante. Finalmente, el sistema mostrará
el monto total y se debe seleccionar la forma de pago: efectivo en caso de querer pagar en boletería o con tarjeta, donde se
redirigirá al usuario a la página de Mercado Pago para completar el proceso de forma segura. Finalmente, recibirán un
mensaje de confirmación vía mail y sus entradas serán verificadas al momento de ingresar al parque. La posibilidad de
comprar las entradas mediante la aplicación nos parece fundamental para comenzar a probar la recepción de la aplicación,
incluyendo el pago electrónico ya que creemos que será el más usado.
El Doce: ¡Muy claro! Parece que la aplicación requiere mucha atención. ¿Tienen previsto contratar personal adicional
para mantener actualizados los horarios, las actividades y todo lo que implica?
Miguel: No, no hay problema en ese aspecto. Planeamos gestionar esa tarea por fuera de la aplicación, a través de
nuestro equipo de administradores, que se encargará de mantener todo actualizado.
El Doce: Ah, entiendo. ¡Gracias por compartir todos estos emocionantes detalles! Más adelante coordinamos otra
nota para ver esta aplicación en funcionamiento.

## Roles identificados
1. Visitante
2. Administrador de sistema

## MVP
Hipótesis: Existen visitantes que quieren conocer los horarios de alimentación de los animales, autogestionar la commpra de sus entradas e inscribirse a las actividades en sus listas al parque. 
 
US01 – Consultar horarios de alimentación
Como visitante quiero consultar los horarios de alimentación para saber cuándo y dónde puedo observar la alimentación de los animales.
Dentro del alcance del MVP porque le permite al visitante conocer los horarios de alimentación de los animales.
Criterios de aceptación:
    - El sistema debe mostrar una lista completa con los horarios de alimentación de los animales.
    - Cada elemento de la lista debe incluir el nombre del animal o especie, la hora exacta de la actividad y la ubicación o recinto dentro del parque.
    - La interfaz debe permitir visualizar la información de forma clara tanto en dispositivos móviles como en ordenadores. 

US02 – Filtrar por fecha
Como visitante quiero filtrar los horarios por la fecha de mi visita para visualizar únicamente las actividades correspondientes a ese día.
Dentro del alcance del MVP porque le permite al visitante consultar únicamente los horarios correspondientes al día en que asistirá al parque. 
Criterios de aceptación:
    - La interfaz debe incluir un selector de fecha (calendario o filtro rápido) en la pantalla de horarios.
    - Al seleccionar una fecha específica, el sistema debe actualizar el listado para mostrar únicamente las alimentaciones programadas para ese día.
    - Si no existen actividades programadas para la fecha seleccionada, el sistema debe mostrar un mensaje claro indicando que no hay eventos disponibles.
    - Se debe seleccionar una fecha válida.

US03 – Identificar alimentación próxima
Como visitante quiero recibir un aviso visual cuando falte una hora para una alimentación para poder llegar a tiempo.
Dentro del alcance del MVP porque permite al visitante identificar rápidamente las actividades próximas a comenzar. 
Criterios de aceptación:
    - El sistema debe calcular el tiempo restante entre la hora actual y el inicio de cada actividad de alimentación.
    - Cuando falte exactamente una hora o menos para que comience una actividad, el sistema debe mostrar un aviso o indicador visual destacado (por ejemplo, una etiqueta de "Próximo" o un color distintivo) junto al horario correspondiente.
    - El indicador visual debe actualizarse en tiempo real a medida que transcurren los minutos.

US04 – Configurar recordatorios 
Como visitante quiero configurar notificaciones de determinados horarios de alimentación para recibir recordatorios.
Fuera del alcance del MVP porque el enunciado dice que las notificaciones serán incorporadas en una versión posterior de la aplicación. 

US05 – Visualizar mapa del parque
Como visitante quiero visualizar un mapa interactivo del parque para recorrerlo.
Dentro del alcance del MVP porque permite al visitante orientar su recorrido. 
Criterios de aceptación:
    - El sistema debe mostrar una vista panorámica del parque.
    - El mapa debe diferenciar los distintos sectores mediante colores.
    - El mapa debe mostrar un ícono para los baños.
    - El mapa debe mostrar un ícono para los puntos de venta.
    - El mapa debe mostrar un ícono para el show especial del día.
    - Al seleccionar el ícono del show, el sistema debe mostrar su nombre y horario, si existe un show programado.
    - La información del show debe corresponder a la fecha actual. 

US06 – Ver ubicación en tiempo real 
Como visitante quiero visualizar mi ubicación en tiempo real dentro del mapa para orientarme mejor.
Fuera del alcance del MVP porque el enunciado dice que será incorporado en una versión posterior de la aplicación. 

US07 – Consultar actividades disponibles
Como visitante quiero visualizar las actividades disponibles del parque para elegir en cuál participar.
Dentro del alcance del MVP porque le permite al visitante elegir una actividad de todas las disponibles a la cual se va a inscribir. 
Criterios de aceptación: 
    - El sistema debe mostrar las actividades disponibles para realizar en el parque.
    - El sistema debe mostrar los horarios disponibles para cada actividad.
    - El visitante debe poder seleccionar una actividad.
    - Al seleccionar una actividad, el sistema debe permitir continuar con el proceso de inscripción.

US08 – Incribir a una actividad
Como visitante quiero inscribirme a una actividad para realizarla.
Dentro del alcance del MVP porque le permite al visitante inscribirse a una actividad disponible del parque.
Criterios de aceptación:
    - El sistema debe solicitar nombre, DNI y edad del visitante.
    - El sistema debe solicitar la talla de vestimenta únicamente cuando la actividad lo requiera.
    - El visitante debe poder seleccionar un horario disponible.
    - El visitante debe aceptar los términos y condiciones específicos de la actividad.
    - El sistema debe confirmar la inscripción una vez completados correctamente los datos requeridos.
    - El sistema debe enviar al correo del visitante un resumen de la inscripción que incluya un código QR.

US09 – Controlar cupos
Como administrador del sistema quiero gestionar los cupos disponibles de las actividades para evitar inscripciones que superen la capacidad.
Dentro del alcance del MVP porque permite le va a permitir a los visitantes inscribirse a una actividad dentro de la capacidad del parque. 
Criterios de aceptación:
    - El sistema debe mantener la cantidad de cupos disponibles para cada actividad y horario.
    - Cada inscripción confirmada debe disminuir en uno la cantidad de cupos disponibles.
    - Cuando no existan cupos disponibles, el sistema debe impedir nuevas inscripciones.
    - Cuando una actividad alcance su capacidad máxima, el sistema debe informar al visitante que no hay cupos disponibles.
    - El sistema no debe permitir que la cantidad de inscriptos supere la capacidad establecida.

US10 – Registrarse usuario
Como visitante quiero registrarme con mi correo electrónico y contraseña para poder realizar compras de entradas.
Dentro del alcance del MVP porque se necesita conocer al visitante para inscribirlo a la actividad o para que compre sus entradas. 
Criterios de aceptación:
    - La pantalla de registro debe solicitar obligatoriamente un correo electrónico válido y una contraseña que cumpla con requisitos mínimos de seguridad. 
    - El sistema debe validar que el correo electrónico ingresado no se encuentre previamente registrado en la base de datos.
    - Al completar el registro con éxito, el sistema debe almacenar las credenciales de forma segura y redirigir al usuario al inicio de sesión o a su perfil.    

US11 – Iniciar sesión
Como visitante registrado quiero iniciar sesión para acceder a las funcionalidades que requieren autenticación.
Dentro del alcance del MVP porque le permitirá al visitante acceder a las funcionalidades de la aplicación.
Criterios de aceptación: 
    - La interfaz debe proporcionar un formulario con campos para ingresar el correo electrónico y la contraseña.
    - El sistema debe validar las credenciales ingresadas contra la base de datos de usuarios registrados.
    - Si las credenciales son incorrectas, el sistema debe mostrar un mensaje de error genérico (por ejemplo, "Correo o contraseña incorrectos") por seguridad.
    - Una vez autenticado con éxito, el sistema debe otorgar acceso a las funcionalidades protegidas (como compras e inscripciones) y mantener la sesión activa.

US12 – Comprar entradas
Como visitante quiero comprar entradas desde la aplicación para gestionar mi ingreso al parque.
Dentro del alcance del MVP porque le permite al visitante ingresar al parque. 
Criterios de aceptación: 
    - El visitante debe estar registrado e iniciar sesión para realizar la compra.
    - El visitante debe poder seleccionar la fecha de visita.
    - El visitante debe poder indicar la cantidad de entradas.
    - La cantidad de entradas debe ser un número entre 1 y 10.
    - El visitante debe indicar la edad correspondiente a cada entrada.
    - El sistema debe calcular y mostrar el monto total de la compra.
    - El visitante debe poder seleccionar efectivo o tarjeta como medio de pago.
    - Si selecciona tarjeta, el sistema debe redirigirlo a Mercado Pago para completar el pago.
    - Si selecciona efectivo, el sistema debe informar que el pago se realizará en boletería.
    - La compra debe confirmarse únicamente cuando se haya completado correctamente el proceso de pago correspondiente.

US13 – Recibir confirmación de compra
Como visitante quiero recibir una confirmación por correo electrónico para tener constancia de mi compra.
Dentro del alcance porque le permite al visitante saber que su compra fue realizada con éxito. 
Criterios de aceptación:
    - Inmediatamente después de procesar con éxito una compra o inscripción, el sistema debe generar y enviar un correo electrónico automático al usuario.
    - El correo de confirmación debe incluir el detalle de la compra (número de orden o ticket, nombre de la actividad o entrada, fecha, cantidad y monto abonado).
    - En caso de que el correo no pueda ser enviado por un fallo del servidor de correo, el sistema debe registrar el error para su posterior reintento sin interrumpir la experiencia de compra en pantalla.