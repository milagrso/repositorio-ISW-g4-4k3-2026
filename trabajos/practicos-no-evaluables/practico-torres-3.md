#### Reconocimiento

Roles:
* Vendedor
* Analista de seleccion
* Analista de publicacion

Funcionalidades:

**Usuario:**
* [x] Registrar vendedor <span style="background:#d4b106">MVP</span>
	* [x] Nombre
	* [x] Dni
	* [x] Telefono
		* [x] Real
	* [x] Google o email + pass
	* [x] Domicilio
	* [x] CBU o alias
**Vendedor**
* [x] Registrar prendar para vender <span style="background:#d4b106">MVP</span> <span style="background:rgba(205, 244, 105, 0.55)">OK</span>
	* [x] Formulario
	* [x] Cantidad de prendas
	* [x] Cateogria por prenda
	* [x] Descripcion por prenda
	* [x] Foto
		* [x] Hasta 512Kb
	* [x] Forma de envio
		* [x] A domicilio o punto de recoleccion
		* [x] Elegir punto de recoleccion
	* [x] Mail al vendedor con comprobante
	* [x] Minimo 10 prendas
* [x] Confirmar propuesta de venta <span style="background:#d4b106">MVP</span> <span style="background:rgba(205, 244, 105, 0.55)">OK</span>
	* [x] Fecha
	* [x] Cantidad de prendas
	* [x] Lista de prendas
		* [x] Nombre
		* [x] Categoria
		* [x] Estado
		* [x] Precio sugerido
	* [x] Ganancia
	* [x] Confirmar prendas seleccionadas
	* [x] Publicar item en tienda nube
* [x] Definir prendas no seleccionadas
	* [x] Retirar
	* [x] Donar
	* [x] Email para continuar
**Analista de seleccion**
* [x] Registrar ficha basica de producto <span style="background:#d4b106">MVP</span> <span style="background:rgba(205, 244, 105, 0.55)">OK</span>
	* [x] Categoria
	* [x] Marca
	* [x] Selecionada SI/NO
	* [x] Estado
	* [x] Motivo
	* [x] Codigo de producto unico
* [x] Imprimir codigo QR
	* [x] Codigo unico de ficha basica del producto
**Analista de publicacion**
* [x] Actualizar ficha basica de producto <span style="background:#d4b106">MVP</span> <span style="background:rgba(205, 244, 105, 0.55)">OK</span>
	* [x] Nombre de prenda
	* [x] Peso en KG
	* [x] Precio sugerido
		* [x] Lista de precios
		* [x] Editable
	* [x] Fotos
		* [x] Max 5
		* [x] 1 Mb
	* [x] Atributos
* [x] Generar propuesta de venta <span style="background:#d4b106">MVP</span> <span style="background:rgba(205, 244, 105, 0.55)">OK</span>
	* [x] Notificar al mail al vendedor
* [x] Consultar prenda por QR
	* [x] Datos

Fuera de alcance:

**Comprador**
* Consultar productos 
	* Nombre
	* Precio
	* Ficha
* Filtrar prendas
	* Por categoria
	* Marcas
	* Estados
	* Nombre
	* Talle
* Comprar prenda 
	* Forma de entrega
		* Domicilio
			* Calcular costo de envio con servicio de entregas online
		* Punto de entrega
			* Listar domicilio de sucursales
	* Medio de pago
		* Tarjeta de credito
		* Debito
		* Todo en mercado pago
	* Notificar compra
**Adminsitrador**
* Consultar prendas vendidas
	* Por mes
	* Calcular ganancia
	* Descontar comision
* Registrar transferencia del pago a los vendedores
	* Enviar mail de pago al venddor con ganancia
	* Cobrar % del precio de venta
		* Entre 1-1000 50%, entre 1001-5000 45%
#### MVP

Hipotesis: Un grupo de emprendedores prentende desarollar una aplicacion para vender y comprar prendas unicas. Los emprendedores ya saben que existe un mercado de compra de ropa usada, pero la hipotesis se centra en que no se sabe si hay un mercado de venta de ropa, por lo tanto el MVP se centra en todo el proceso de analisis, publicacion y venta de ropa usada.

El alcance:
* Creacion de cuentas
* Publicacion de prendas en el marketplace
* Seleccion de prendas
* Registrar y actualizar fichas de productos
* Consultar prendas pendientes

Lo que queda fuera de alcance es: 
* Logistica
* Devolucion de prendas
* Envio de prendas no seleccionadas 
* Pagos a los vendedores
* Compra de prendas 
* Impresion de QR y consulta de QR

User storys: 1,2,3,4,5,6

User story canonica: 5
Se la elige porque es lo suficientemente simple para que cualquier desarrollador independiente de su experiencia la pueda entender y comprar, posee muy baja incertidumbre y el esfuerzo es estándar
#### User history

###### **1. Registrar vendedor en aplicacion**

Como vendedor quiero registrar mi cuenta para gestionar la publicación y venta de prendas de manera fácil y rápida

**Estimación:** 3

* Complejidad: Media-Alta, se tienen que asegurar la contraseña en la BDD atraves de algun algoritmo de encriptacion seguro y verificar su validez sin informar de mas
* Esfuerzo: Bajo, una vez definido el diseño implementarlo no lleva mucho trabajo. Pocas pruebas. Interfaz conocida y poco compleja
* Incertidumbre: Nula, estan muy claro el requerimiento se necesita una cuenta para que el vendedor pueda publicar sus articulos

**Criterios de aceptación:**

- Se puede registrar un usuario dentro de la plataforma con un email y contraseña
- Se puede registrar los datos personales de la cuenta nombre completo, DNI
- Se debe registrar un telefono real
- Se pueden registrar los datos del domicilio completo
- Se pueden registrar los datos bancarios de CBU o alias 

**Pruebas de usuario**

- Probar de ingresar un numero ficticio donde no haya relacion de los codigos de nacionalidad ni de area (falla)
- Probar de registrarse con una email que no haya sido registrado (pasa)
- Probar de ingresar un alias en los datos bancarios (pasa)
- Probar de ingresar un domicilio sin la altura de la calle (falla)
- Probar de completar todos los datos con valores validos (pasa)

###### **2. Registrar prendas para vender**

Como vendedor quiero registrar prendas de ropa que ya no uso para  conocer la cotización de mis prendas y decidir si venderlas o no

**Estimación:** 5

* Complejidad: Media/Alta, se tiene que elegir algun algoritmo de compresion de fotos eficiente, se tiene que diseñar la BDD para que soporte imagenes, multiples reestricciones de campos, envio de mails a multiples destinatarios.
* Esfuerzo: Medio/Alto, UI con un formulario con distintos etapas y gestion tipos de datos, implementacion de distintos sistemas mails, conexion a la BDD, descompresion de fotos, pruebas complejas de hacer
* Incertidumbre: Baja, poca incertidumbre de negocio, lo unico seria saber que servidor de mails usar y que libreria de gestion de fotos implementar.

**Criterios de aceptación:**

- Se puede registrar la cantidad de prendas que se quieren vender indicando su categoria, una descripcion y una forma de envio.
- Se puede registrar un foto de manera opcional por cada una de las prendas de hasta 512Kb
- Se puede seleccionar como forma de envio tanto a domicilio o en un punto de recoleccion.
- Se pueden seleccionar el punto de recoleccion dentro de un conjunto de opciones
- Debe enviarse un mail al vendedor y a la organizacion con el comprobante del registro
- Deben registrarse mas de 10 prendas por envio de prendas

**Pruebas de usuario**

- Probar de subir una foto de mas de 512Kb (falla)
- Probar de completar el registro sin una foto (pasa)
- Probar de registrar menos de 10 prendas (falla)
- Probar de registrar prendas y recibir un correo al mail registrado (pasa)
- Probar de registrar una prenda seleccionado uno de los puntos de recoleccion (pasa)

###### **3. Registrar ficha de producto**

Como Analista de seleccion quiero registrar la ficha basica de producto de la prenda de ropa para verificar que las prendas cumplan las politicas de la organizacion y seleccionarla para su venta o devolucion

**Estimación:** 3

* Complejidad: Baja, hay que diseñar una estructura en la BDD, tiene campos simples, hay que decidir como se va a generar el codigo unico
* Esfuerzo: Media, las pruebas estan entralazadas entre si y hay que validar varios caminos, por parte de la implementacion lleva poco desarollo
* Incertidumbre: Nula, los requerimientos son claros

**Criterios de aceptación:**

- Se puede registrar la categoria, marca de la prenda
- Se puede indicar si la prenda esta o no seleccionada
- Se puede registrar el estado de la prenda dentro de una lista de estados predefinidos. 
- Se puede registrar un motivo en caso del que el estado sea de segunda seccion
- Se puede generar un código único de identificación que luego va a ser utilizado para su consulta

**Pruebas de usuario**

- Probar de registrar una prenda que es segunda eleccion sin motivo (falla)
- Probar de registrar una prenda como nueva (pasa)
- Probar de generar un codigo unico de una prenda no seleccionada (pasa)

###### **4. Actualizar ficha de producto para publicación**

Como Analista de publicación quiero actualizar la ficha inicial del producto para publicarlos en el ecomerce con datos útiles para los compradores

**Estimación:** 5

* Complejidad: Media, implementacion de algoritmos de compresion, descompresion de imagenes, adaptacion de la BDD para soporte con imagenes, gestion de campos dinamicos genericos en el registro, generacion de calculos dinamicos en base a distintos campos
* Esfuerzo: Media, las pruebas son complejas debido a que hay multiples caminos de pruebas y de distintas naturalezas, el tiempo de desarollo es considerable ya que participan varias funcionalidades distintas que estan integradas
* Incertidumbre: Media, incertidumbre baja tecnologicamente pero hay una duda sobre como se va a gestionar esta lista de precios a largo plazo lo que puede generar deuda tecnica

**Criterios de aceptación:**

- Se pueden registrar maximo 5 fotos de la prenda de maximo 1Mb de tamaño
- Se pueden registar el nombre de la prenda, el peso en kilogramos y atributos dinamicos por categoria
- Se puede calcular el precio sugerido segun una lista de precios segun la categoria, marca, estacionalidad y estado de la prenda
- Se puede modificar el precio calculado automáticamente

**Pruebas de usuario**

- Probar de registrar 6 fotos de la prenda (falla)
- Probar de registrar una foto de menos de 1Mb (pasa)
- Probar de reducir el precio calculado automaticamente (pasa)
- Probar de registrar una prenda de un color determinado y de un talle en especifico (pasa)
- Probar de registrar un peso negativo (falla)

###### **5. Generar propuesta de venta**

Como Analista de publicación quiero generar una prepuesta de venta para notificar al vendedor sobre la seleccion de sus prendas y que decida si vender sus prendas o cancelarlas

**Estimación:** 2

* Complejidad: Baja, hay que implementar una logica de negocio simple en base a precios y porcentajes, se debe generar una estructura en la BDD con campos simples
* Esfuerzo: Baja pruebas basadas rangos monetarios constantes va a llevar poco tiempo implementar la UI y el registro de datos 
* Incertidumbre: Baja, la unica incertidumbre que hay es sobre el negocio sobre cuales son los demas rangos de precios

**Criterios de aceptación:**

- Se puede generar la propuesta de venta una vez que todas las prendas de un registro de un vendedor han sido completadas
- Se debe detallar la fecha de la propuesta, la cantidad de prendas, el listado completo de prendas con su nombre, categoria, estado, precio sugerido y la ganancia calculada, y el listado de prendas no seleccionadas
- Se debe generar la ganancia calculada en base a, si el precio de venta es entre 1-1000$ un 50%, si es entre 1001$ y 5000$ un 55% del total.
- Se debe notificar vía mail al vendedor indicando que la propuesta ya esta disponible

**Pruebas de usuario**

- Probar de generar una propuesta de venta con una de las prendas no completadas (falla)
- Probar de generar una propuesta de venta y que el listado de prendas de la propuesta coincida en todos sus valores con la lista de prendas del registro (pasa)
- Probar de generar la propuesta de venta y que la ganancia calculada concuerde matemáticamente con el porcentaje correspondiente a el rango (pasa).
- Probar de generar una propuesta y que el vendedor reciba el mail de notificacion (pasa)

###### **6. Confirmar propuestas para vender**

Como vendedor quiero confirmar las propuestas de ventas de mis prendas seleccionadas para publicarlas dentro de la plataforma y recibir el beneficio de su venta  

**Estimación:** 5

* Complejidad: Media, se tiene que diseñar la integracion con una plataforma externa que puede trabajar de una froma dsitinta a nuestro sistema, logica de negocio moderada con la seleccion mutliple de prendas
* Esfuerzo: Medio/bajo, consultas simples a la bdd, pruebas un poco trabajosas debido a las distintos caminos posibles y la interaccion con un sistema externo, un tiempo de trabajo considerable
* Incertidumbre: Alta, conexion con un sistema complejo externo el cual no tenemos control, y que puede cambiar de manera volatil.

**Criterios de aceptación:**

- Se puede visualizar la fecha y cantidad de prendas del registro de venta
- Se puede visualizar un listado de las prendas seleccionadas de la prepuesta con nombre, categoria, estado, precio sugerido, ganancia
- Se puede confirmar ninguna, algunas o todas las prendas seleccionadas para venderlas
- Se debe publicar las prendas confirmadas dentro de la plataforma de ecomerce

**Pruebas de usuario**

- Probar de confirmar todas las prendas seleccionadas y que queden publicadas en el ecomerce (pasa)
- Probar no confirmar ninguna prenda y que no se publique nada en el ecomerce (pasa)
- Probar de confirmar algunas prendas y que el precio sugerido de las mismas coincida con el del ecomerce (pasa)

###### **7. Definir prendas no confirmadas**

Como vendedor quiero elegir mi intención sobre la prendas no seleccionadas para informarme sobre el proceso de devolucion o donacion.

**Estimación:** 3

* Complejidad: Baja, hay que integrar el servicio de envio de mails y diseñar pocas integraciones con la bdd
* Esfuerzo: Medio, pruebas simples pero con mutilples casos, mucho tiempo en desarollar los distintos templates del cuerpo de los mails
* Incertidumbre: Baja, requierimientos claros.

**Criterios de aceptación:**

- Se puede visualizar el lista de prendas no seleccionadas con su nombre, categoria, estado
- Se puede indicar que accion tomar sobre las prendas no seleccionadas dentro de las opciones retirar o donar
- Se debe recibir un mail informando los detalles de la donacion o los pasos para seguir en el proceso de devolucion tanto de las prendas no seleccionadas como las no comercializadas

**Pruebas de usuario**

- Probar de indicar que algunas prendas no seleccionadas de la lista se donen y otras se retiren (pasa)
- Probar de confirmar las acciones sobre las prendas y recibir un mail con la informacion correspondiente a las definiciones sobre las prendas

###### **8. Imprimir codigo QR**

Como analista de selección quiero imprimir un codigo QR para facilitar el proceso de identificación de la prenda y reducir la perdida de la información de selección de las prendas

**Estimación:** 8

* Complejidad: Medio/Alto, gestion de conexiones por red y control de estado de un dispositivo externo. Tambien hace falta la desicion del algoritmo de generacion de QR
* Esfuerzo: Medio/Alto, pruebas considerbales de hacer por la gestion de la red y los estados de la impreso, poco desarollo a la hora de generar el qr con informacion conocida
* Incertidumbre: Alta, baja incertidumbre de requerimientos pero alta incertidumbre tecnologia en el uso de protocolos de comunicacion con hardware de multiples marcas y la viabilidad de la generacion de los datos en papel.

**Criterios de aceptación:**

- Se puede generar un codigo QR que contenga la categoria, marca, estado, motivo, si fue seleccionada o no y un codigo de producto unico de una prenda previamente analizada
- Se debe imprimir el codigo QR en un formato tangible de papel para su visualizacion correcta por un escaner
- Se debe tener la impresora encendida, disponible y con recursos 

**Pruebas de usuario**

- Probar de generar un codigo QR y que al escanearlo contenga toda la informacion de una prenda (pasa)
- Probar de imprimir un QR de una prenda no seleccionada con la impresora prendida (pasa)
- Probar de imprimir un QR de una prenda seleccionada con la impresora con falta de recursos (falla)

###### **9. Consultar prenda por QR**

Como analista de publicación quiero escanear el QR de una prenda para identificar rapidamente el estado y datos de seleccion

**Estimación:** 5

* Complejidad: Media/baja, implementacion hardware externo, poco diseño de la conexion con la BDD
* Esfuerzo: Baja/media pruebas considerbales por los distintos escenarios de iluminacion, interfaz de usuario sencilla y datos simples, poco esfuerzo en su desarollo ya que es una consulta basica
* Incertidumbre: Media, nula duda de requerimientos, incertidumbre considerable en la comuicacion y conexion de un hardware especifico con el sistema ya existente

**Criterios de aceptación:**

- Se puede escanear un QR de una prenda analizada visualizando la categoria, marca, seleccion, estado, motivo

**Pruebas de usuario**

- Probar de escanear un QR de una prenda no seleccionada (pasa)
- Probar de escanear un QR de una prenda de segunda seleccion con un motivo (pasa)
- Probar de escanear un QR ilegible (falla)

### 

###### **1. **

Como  quiero para poder 

**Estimación:** 

* Complejidad: 
* Esfuerzo: 
* Incertidumbre: 

**Criterios de aceptación:**

- Se puede 

**Pruebas de usuario**

- Probar  (pasa)
- Probar  (falla)
