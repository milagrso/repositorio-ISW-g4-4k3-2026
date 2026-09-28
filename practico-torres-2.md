#### Reconocimiento

Roles

* Visitante
* Usuario

Funcionalidades

* [x] Visualizar Horarios de alimentacion de las especies <span style="background:#d4b106">MVP</span>
	* [x] especie, nombre del animal, edad, hora programada, sector del parque (terrestre, acuatico, aereo) y cuidador encargado (nombre y apellido) <span style="background:#d4b106">MVP</span>
	* [x] Visualizarse en orden de los mas proximos a la fecha actual hasta una semana <span style="background:#d4b106">MVP</span>
	* [x] Filtrar por fecha de visita <span style="background:#d4b106">MVP</span>
* [x] Recibir alertas
	* [x] Horarios de alimentacion proximos a comenzar
	* [x] 1 Hora
* [x] Visualizar mapas del parque <span style="background:#d4b106">MVP</span>
	* [x] visualizar sectores por colores <span style="background:#d4b106">MVP</span>
	* [x] visualizar iconos: inodoro -> baño, bolsa -> venta, microfono -> show <span style="background:#d4b106">MVP</span>
* [x] Obtener info del show
	* [x] nombre
	* [x] horario
* [x] Inscribirse a actividades diarias 
	* [x] tipos Tirolesa, safari, palestra, jardineria 
	* [x] seleccionar actividades, horario, datos visitante: nombre, dni, edad, talla de vestimenta (depende) 
	* [x] aceptar terminos y condiciones 
	* [x] enviar resumen en el qr del mail
* [x] Registrarse en la aplicacion <span style="background:#d4b106">MVP</span>
	* [x] mail constraseña <span style="background:#d4b106">MVP</span>
* [x] Registrar compras de entradas con pago electronico <span style="background:#d4b106">MVP</span>
	* [x] fecha de la visita <span style="background:#d4b106">MVP</span>
	* [x] cantidad de entradas (menor a 10) <span style="background:#d4b106">MVP</span>
	* [x] edad del visitante <span style="background:#d4b106">MVP</span>
	* [x] mostrar monto total <span style="background:#d4b106">MVP</span>
	* [x] tarjeta a traves de mercado pago <span style="background:#d4b106">MVP</span>
	* [x] confirmacion y mail <span style="background:#d4b106">MVP</span>

* Registrar compras de entradas con pago en efectivo <span style="background:#ff4d4f">OUT RANGE</span>
* Mostrar ubicacion en tiempo real <span style="background:#ff4d4f">OUT RANGE</span>
- Configurar notificaciones <span style="background:#ff4d4f">OUT RANGE</span>
	- Horarios de alimentacion <span style="background:#ff4d4f">OUT RANGE</span>
* Visualizar inscripciones <span style="background:#ff4d4f">OUT RANGE</span>
* Registrar actividades <span style="background:#ff4d4f">OUT RANGE</span>
* Registrar shows <span style="background:#ff4d4f">OUT RANGE</span>
* Editar actividades <span style="background:#ff4d4f">OUT RANGE</span>
* Editar shows <span style="background:#ff4d4f">OUT RANGE</span>
#### MVP

Hipotesis: El parque tiene pensado en evaluar el desarrollo de una aplicacion movil para mejorar la experiencia de los visitantes en base a proporcionar informacion de los distintos servicios que ofrece el parque y permitir la autogestion de la compra de entradas.

El alcance incluye:
* Mostrar informacion sobre las exhibiciones
* Mostrar informacion sobre los horarios de alimentacion
* Mostrar los senderos del mapa para caminar
* La autogestion al momento de realizar las entrada

Lo fuera de alcance es:
* Configurar notificaciones
* Ubicacion en tiempo real dentro del mapa
* Alta y actualizacion de la informacion de los horarios, actividades
* Informacion de los shows
* Inscripciones a las actividades
* Alertas de los horarios

Justificaciones: Se eligio el pago electronico sobre en el efectivo, porque la administracion del parque piensa que sera el mas usado y sera fundamental para probar la recepcion de la aplicacion. Como la hipotesis es solo mostrar informacion se dejo de lado la inscripcion de actividades. Como la carga y mantenimiento de la info de la aplicacion se gestiona fuera de la misma se dejo de lado el alta de la informacion de los servicios.

User storys:
1. Visualizar horarios para asistir
2. Visualizar mapa para orientar
3. Registrar cuenta
4. Comprar entradas electronicamente

#### User history

###### **1. Visualizar horarios para asistir**

Como visitante quiero visualizar los horarios de alimentación para estar presente y observar como alimentan a un animal dentro del parque 

**Estimación:** 3

**Criterios de aceptación:**

- Se puede visualizar cada uno de los horarios de alimentacion detallados con la especie, nombre del animal, la edad, la hora programada, el sector del parque donde esta y el encargado de realizar la alimentacion
- Se pueden visualizar los horarios ordenados del mas proximo al mas lejano
- Se pueden visualizar los horarios dentro de un rango de la fecha actual y una semana en el futuro
- Se pueden visualizar los horarios de una fecha especifica

**Pruebas de usuario**

- Probar de visualizar el horario de alimentación de un animal acuático (pasa)
- Probar de visualizar el horario mas cercano al principio de la lista (pasa)
- Probar de visualizar los horarios del dia próximo a la fecha (pasa)
- Probar de filtrar por una fecha del próximo mes a la fecha (falla)

###### **2. Visualizar mapa para orientar**

Como visitante quiero visualizar el mapa del parque para poder orientarme dentro de el y identificar los distintos puntos de interes del mismo 

**Estimación:** 3

**Criterios de aceptación:**

- Se puede visualizar los sectores del parque identificado con colores
- Se pueden visualizar iconos informativos en la ubicacion de los baños, con un inodoro, puntos de venta, con una bolsa, y shows con un microfono
- Se pueden visualizar los distintos senderos que estan construidos dentro del parque

**Pruebas de usuario:**

- Probar de visualizar los senderos que van hacia los puntos de venta (pasa)
- Probar de visualizar los iconos informativos de los baños (pasa)
- Probar de visualizar el sector de los animales acuaticos (pasa)

###### **3. Registrar cuenta**

Como usuario quiero registrarme dentro de la aplicación para conseguir las entradas al parque, orientarme dentro de el y poder adquirir los distintos servicios disponibles dentro del mismo

**Estimación:** 2

**Criterios de aceptación:**

- Se puede registrarse utilizando un email y una contraseña

**Pruebas de usuario**

- Probar registrarse con un mail ya registrado (falla)

###### **4. Comprar entradas electronicamente**

Como visitante quiero realizar la compra de entradas del parque cpn pago electrónico para poder asegurar mi ingreso al mismo y disfrutar de sus servicios

**Estimación:** 5

**Criterios de aceptación:**

- Se puede registrar la compra de las entradas, ingresando fecha de la visita, cantidad de entradas y edad de cada visitante
- Solo se pueden conseguir 10 entradas por cada compra
- Se puede visualizar el monto total de la compra y su detalle antes de confirmarla
- El pago electronico debe realizarse con la pasarela de mercado pago
- Se recibira un mail de confirmación del pago electrónico

**Pruebas de usuario**

- Probar registrar una compra ingresando mas de 10 entradas por compra (falla)
- Probar de registrar la compra de un menor para una fecha posterior a la actual (pasa)
- Probar de comparar los montos individuales de la compra y la suma total y coinciden (pasa)
- Probar de registrar un pago electrónico y no recibir un mail de comprobación (falla)
- Probar de registrar el pago electronico en la pagina de mercado pago (pasa)

###### **5. Recibir alertas para recordar**

Como visitante quiero recibir alertas para recordar mas fácilmente los horarios de alimentación próximos a comenzar

**Estimación:** 3

**Criterios de aceptación:**

- Se deben obtener alertas de todos los horarios de alimentación 1 hora antes de que comiencen

**Pruebas de usuario**

- Probar de recibir una alerta de un horario de alimentación 1 hora antes de que comience (pasa)

###### **6. Visualizar shows para asistir**

Como visitante quiero visualizar la informacion de los shows para informarme a que hora empiezan y decidir si asistir o no en base a mis intereses

**Estimación:** 2

**Criterios de aceptación:**

- Se puede visualizar el nombre del show y su horario
- Se puede visualizar la información del show ingresando en su icono de show

**Pruebas de usuario**

- Probar de visualizar el horario de un show en especifico (pasa)
- Probar de visualizar la información de un show al interactuar con su icono en el mapa (pasa)

###### **7. Inscribirme a actividades para participar**

Como visitante quiero inscribirme a una actividad para disfrutar del conjunto de cosas que me ofrece y asegurar mi cupo dentro de la misma en el horario que mas me convenga

**Estimación:** 5

**Criterios de aceptación:**

- Se pueden seleccionar un conjunto de actividades a inscribirse dentro de tirolesa, safari, palestra y jardineria con su respectivo horario
- Se puede ingresar los datos personales de DNI, edad y talla de la vestimenta de manera opcional si la actividad lo requiere
- Se pueden aceptar los terminos y condiciones de la actividad a participar
- Se debe recibir un mail con un resumen de la inscricion con un QR

**Pruebas de usuario**

- Probar de registrarme en tirolesa y safari para un horario especifico  (pasa)
- Probar de registrarme una actividad sin la talla de la vestimenta en una actividad que no lo requiere (pasa)
- Probar de registrarme una actividad sin la talla de la vestimenta en una actividad que lo requiere (falla)
- Probar de registrarme en un actividad aceptando los terminos y condiciones (pasa)
- Probar de recibir un mail que contenga el QR de la actividad despues de inscribirme (pasa)

