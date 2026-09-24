# PRÁCTICO 3 - REQUERIMIENTOS ÁGILES – User Stories, Estimaciones y MVP
- Unidad: Unidad Nro. 2: Gestión Lean-Ágil de Productos de Software
- Consigna: Identificar y escribir las US identificadas en el Dominio presentado para el práctico
- Objetivo: Aplicar los conceptos teóricos desarrollados en clase sobre User Stories.
- Propósito: Familiarizarse con los conceptos de requerimientos ágiles y en particular con US, Épicas, Temas y MVP.
- Entradas: Conceptos teóricos sobre el tema, desarrollados en clase. Bibliografía referenciada sobre el tema.
- Enunciado, consigna y tarjeta de US.
- Salida:   ● Identificación de los roles principales
            ● El MVP explicando el alcance propuesto y justificando la inclusión de las User Stories seleccionadas y el porqué de aquellas excluidas en el mismo
            ● US identificadas con sus tarjetas completas
            ● User Story canónica
            ● User Stories estimadas
Este práctico no se entrega y por lo tanto no tiene nota. El tema se evalúa en el parcial.
- Instrucciones: Los docentes representarán a expertos del dominio que expresarán sus necesidades vinculadas a desarrollar un software.
Los estudiantes realizarán preguntas con el objetivo de acordar juntos el alcance del proyecto, y determinar las user stories correspondientes y definir las pruebas de aceptación de usuario para cada una.
Cada grupo presentará el resultado obtenido al final de la clase al resto del curso.

## Recircula tus prendas - Cuida el planeta
Glosario:

● Marketplaces: es un sitio de ventas por internet que conecta compradores y vendedores.

● Segunda selección: se denomina así a las prendas que tienen alguna falla, mancha u otro defecto menor.

● Pasarela de pago: es un servicio online para el cobro de transacciones con tarjetas de débito o crédito.

Un grupo de emprendedores preocupados por el alto impacto ambiental provocado por la industria textil quiere desarrollar una plataforma de moda circular y sustentable para comprar y revender prendas únicas. Los emprendedores apuestan a que existe un mercado para compradores de ropa usada, pero no saben si hay personas dispuestas a vender su ropa. A continuación, se transcribe parte de la entrevista realizada al experto en el dominio:

PO (Product Owner): Nos cuentan ¿cómo espera que funcione su idea?

ED (Experto del dominio): Bueno. Nuestra idea es que las personas puedan vender aquellas prendas que ya no usan y que están como nuevas o -incluso- aún con la etiqueta puesta. La plataforma funcionará como un Marketplaces en la cual los clientes podrán comprar prendas, aplicando filtros de búsqueda por distintas categorías (remeras, pantalones, camperas, etc.), marcas y estados (como nueva, nueva con etiqueta, segunda selección o segunda selección con etiqueta). Por otro lado, los vendedores eligen las prendas que desean vender y nos la envían a nosotros para que nos ocupemos de su comercialización. Nuestro proceso arranca desde la selección (donde elegimos la ropa a publicar bajo estrictos controles o la descartamos), fotografiado, publicación para su venta en nuestro ecommerce y, una vez que la prenda se vende, nosotros nos encargamos de la cobranza, de entregarla al cliente y, finalmente, del pago de la ganancia al vendedor. Nuestro modelo de negocio consiste en cobrar un % de comisión al vendedor según el precio de venta, por ejemplo: si el precio de venta es entre 1-$1.000 cobramos un 50%, si es entre $1.001 a $5.000 cobramos un 45%, etc.

PO: ¡Buenísimo! Ahora, nos cuentan ¿cómo hago para vender mis prendas? ¿puedo vender cualquier cosa?
ED: Ok. Si, podés vender muchas categorías de prendas, que podrás enterarte en nuestra web. El vendedor debe llenar un formulario indicando la cantidad de prendas de cada categoría que nos van a enviar para seleccionar. Ah! pero para poder completarlo, primero debe registrarse en nuestro sitio web con su email y contraseña o con su cuenta de Google, y debe completar sus datos(nombre completo, DNI, y teléfono). Es importante que nos aseguremos de que el teléfono sea real para poder contactarlo. Luego, deberíamos pedirle que indique su domicilio completo (por si tenemos que retirar sus prendas o entregarles su compra) y que nos indiquen un CBU o alias para realizar la transferencia bancaria cuando se venda su prenda. Volviendo a cómo vender, nos tienen que indicar la cantidad de cada categoría de prenda, una descripción de cada prenda a enviar (por ejemplo buzo rojo talle S) y opcionalmente una foto (de hasta 512kb), y, finalmente, la forma de envío: retirar en domicilio o llevarlo a un punto de recolección. Los puntos de recolección son distintas sucursales nuestras o comercios amigos que recolectan las bolsas de prendas. Tendremos muchos puntos en distintas ciudades del país, por ahora sólo 5 en Córdoba. Una vez elegida la forma de envío, deben confirmar el formulario de prendas a vender, y se enviará un mail al vendedor y a nosotros a modo de comprobante con el detalle de prendas. Es importante que sepan que sólo pueden enviar un mínimo de 10 prendas por cada vez que quieran vender.

PO: Clarísimo. ¿Cómo seleccionan las prendas? y ¿Cómo continúa el proceso?

ED: Primero, el Encargado de Logística se encargará de coordinar el retiro y el arribo de las bolsas con prendas para vender en nuestro Centro de Procesamiento, que es uno sólo aquí en Córdoba. Ahora sí, tenemos tres Analistas de Selección que se ocupan de revisar prenda por prenda para verificar que cumplen nuestras políticas de productos a vender. Ellos completarán la primera parte de una ficha básica del producto indicando categoría, marca, si está seleccionada o no. En caso de estar seleccionada, le debe asignar el estado (como nueva, nueva con etiqueta, segunda selección o segunda selección con etiqueta). Si es segunda selección, deben indicar un motivo para que el comprador se entere cuando mire el producto en el ecommerce, por ejemplo: “Tiene una pequeña mancha”. Independientemente, de si está seleccionada o no, a las prendas se les pega una etiqueta autoadhesiva con un código QR que tiene un código de producto único y permite identificar a la prenda. Las prendas que no queden seleccionadas son separadas para luego informarle el motivo de no selección y preguntarle al vendedor que desea hacer: retirar o donarla.
Una vez seleccionadas las prendas, son procesadas por 4 Analistas de Publicación que identifican cada prenda escaneando su código QR con un lector de QR, visualizan los datos cargados por el Analista de Selección, se ocupan de tomar las fotos (máximo 5 fotos, y cada una con un peso hasta 1Mb) y de completar el resto de la ficha del producto (nombre de la prenda, peso en kilogramos, precio sugerido y atributos dinámicos que describen características de la prenda según la categoría, por ejemplo: tipo de tela, color, talle, etc.) para ser publicados en el ecommerce. El precio sugerido se calcula en base a una lista de precios por categoría, marca, estacionalidad y estado de la prenda, e igualmente podrá editarlo. Cuando la ficha de todas las prendas recibidas de un vendedor es completadas, se genera la propuesta de venta y se notifica al vendedor por email que ya la tiene disponible en la plataforma. La propuesta detalla la fecha y cantidad de prendas, el listado de todas las prendas seleccionadas con su correspondiente nombre, categoría, estado, precio sugerido y la ganancia que obtendrá al venderse; y también el listado de todas las prendas que no quedaron seleccionadas. El vendedor debe ingresar a la plataforma y confirmar si desea vender todas las prendas seleccionadas, o no vender algunas o todas y, también, definir qué hacer con las prendas que quedaron no seleccionadas (si lo retira o dona). Cuando confirma, quedan las prendas seleccionadas listas para publicarse en el ecommerce, si hay prendas no seleccionadas y/o que decidió no vender, se le envía un email informando la donación o los pasos a seguir para retirarlos.
PO: …y ahora: ¿cómo es el proceso de venta?

ED: Bueno, acá es muy parecido a cualquier ecommerce, el cliente accede a nuestra web, mira el catálogo de productos (con su nombre, precio y ficha de producto), realiza búsquedas por nombre o filtrar por categoría, estado de la prenda, marca y talle. Una vez elegida la prenda, debe registrarse o iniciar sesión para continuar con la compra, debe elegir la forma de entrega. Si elige entrega a domicilio, se calculará un costo de envío a través de una integración con una Servicio de Entregas Online que terceriza el servicio de logística. Si elige retiro en puntos de entrega, se listarán los domicilios de nuestras sucursales/comercios amigos para que elija uno y no tendrá costo. Finalmente, debe indicar el medio de pago (tarjetas de crédito o débito) para lo cual se utilizará como pasarela de pago MercadoPago. La comercialización online de las prendas y el envío a los clientes lo vamos a realizar con una plataforma de ecommerce llamada Tiendanube hasta que podamos validar el modelo de negocio y realizar un desarrollo personalizado. Al vendedor, se le envía un email notificando de la venta con el detalle y foto de la prenda vendida, el precio de venta y la ganancia obtenida.

PO: Entonces, para cerrar el proceso, sólo falta pagarle al vendedor: ¿Cómo se realiza?

ED: Claro. Es simple, a principio de mes, el Administrador realiza las liquidaciones y pago a cada vendedor por las ventas del mes anterior que no tuvieron devolución pasado los 14 días de ocurrida la venta. El administrativo consulta todas las prendas vendidas del mes y calcula la ganancia, descontando nuestra comisión, y realiza el pago al vendedor por transferencia bancaria, registrando la misma y enviando un email con el total pagado al vendedor y el detalle de las prendas liquidadas con su ganancia. Todo el proceso de devolución de las prendas vendidas, del envío de las prendas no seleccionadas (a donar o retirar) y del pago a los vendedores lo realizaremos inicialmente a mano.

## Roles principales
1. Vendedor
2. Analista  de selección
3. Analista de publicaciones 
4. Comprador
5. Encargado de logística

## MVP
Hipótesis: Existen personas dispuestas a vender las prendas que ya no utilizan a través de la plataforma.

US Canónica: Registrar categoría de prenda (Estimación: 1)

US01 - Registrar vendedor con mail y contraseña (Estimación: 3)

Como vendedor quiero registrarme en la plataforma utilizando mi email y contraseña, para poder acceder al sistema y gestionar el envío de mis prendas para la venta.

Criterios de aceptación: 
    - El sistema debe permitir al vendedor ingresar email y contraseña.
    - El sistema debe validar que el email tenga un formato válido.
    - El sistema debe solicitar los datos obligatorios del vendedor: nombre completo, DNI y teléfono.
    - El sistema debe validar que el teléfono ingresado sea válido/real mediante el mecanismo definido por la plataforma.
    - El sistema debe permitir completar el domicilio y los datos bancarios (CBU o alias) necesarios para futuros pagos.
    - El sistema debe impedir el registro si faltan datos obligatorios.
    - El sistema debe impedir el registro si el email ya se encuentra registrado.
    - Al completar correctamente los datos, el vendedor debe quedar registrado y poder iniciar sesión. 

Pruebas de usuario: 
    1. El vendedor quiere registrarse ingresando datos válidos y obligatorios y se registra con éxito.
    2. El vendedor quiere registrarse ingresando un email con formato inválido y el sistema rechaza el registro.
    3. El vendedor quiere registrarse omitiendo datos obligatorios y el sistema impide el registro mostrando un mensaje de error.
    4. El vendedor quiere registrarse ingresando un teléfono inválido o falso y el sistema rechaza el registro.
    5. El vendedor quiere registrarse utilizando un email que ya se encuentra registrado y el sistema impide el registro.

US02 - Registrar formulario de selección de prendas (Estimación: 3)

Como vendedor, quiero completar un formulario indicando las prendas que deseo enviar para vender, su categoría, descripción, una foto opcional y la forma de envío, para solicitar que mis prendas sean recibidas y evaluadas por la plataforma.

Criterios de aceptación: 
    - El sistema debe permitir al vendedor indicar la cantidad de prendas por categoría que desea enviar.
    - El sistema debe permitir ingresar la descripción de cada prenda.
    - El sistema debe permitir adjuntar opcionalmente una foto de cada prenda.
    - El sistema debe rechazar fotos que superen los 512 KB.
    - El sistema debe exigir un mínimo de 10 prendas por solicitud.
    - El sistema debe permitir seleccionar la forma de envío: Retiro a domicilio o Entrega en un punto de recolección. Si selecciona un punto de recolección, el sistema debe permitir elegir uno de los puntos disponibles.
    - El sistema debe permitir al vendedor confirmar el formulario.
    - Una vez confirmado, el sistema debe generar un comprobante con el detalle de las prendas.
    - El sistema debe enviar el comprobante por email al vendedor y a 
    la plataforma.

Pruebas de usuario: 
    1. El vendedor quiere enviar un formulario con al menos 10 prendas y seleccionando retiro a domicilio, y el sistema genera el comprobante con éxito.
    2. El vendedor quiere enviar un formulario seleccionando un punto de recolección disponible, y el sistema lo procesa y genera el comprobante correctamente.
    3. El vendedor quiere enviar un formulario con menos de 10 prendas y el sistema rechaza la solicitud.
    4. El vendedor quiere adjuntar una foto que supera los 512 KB y el sistema rechaza la imagen.

US03 - Registrar ficha básica de prenda (Estimación: 5)

Como analista de selección quiero registrar la evaluación de una prenda para dejar constancia si cumple o no con las políticas de productos a vender.

Criterios de aceptación:
    - El AS (Analista de selección) debe validar categoría de la prenda, marca y si esta seleccionada o no. 
    - En el caso de que la prenda esté seleccionada debe asignar un estado entre: "Nueva", "Nueva con etiqueta", "Segunda selección" o "Segunda selección con etiqueta". 
    - Si le asigna a la prenda "Segunda selección" o "Segunda selección con etiqueta" debe ingresar el motivo de su decisión. 
    - Si la prenda no fue seleccionada debe ingresar el motivo de la no selección para ser informado al vendedor. 
    - La prenda debe quedar identificada mediante un código de producto único asociado a un código QR.

Pruebas de usuario:
    1. El analista de selección quiere evaluar una prenda seleccionada con estado "Nueva con etiqueta", y el sistema la registra generando su código de producto y QR único.
    2. El analista de selección quiere evaluar una prenda seleccionada como "Segunda selección", y el sistema exige y registra el motivo de la decisión junto con su código QR.
    3. El analista de selección quiere registrar una prenda como no seleccionada, y el sistema exige y guarda el motivo de la no selección junto con su código QR.

US04 - Completar ficha de producto (Estimación: 8)

Como analista de publicación quiero completar los campos de la ficha para generar la propuesta de venta. 

Criterios de aceptación: 
    - Debe tener asignado: estado, categoría, foto, precio y código QR.
    - Debe visualizar los datos escaneando su código QR. 
    - Debe calcular su precio sugerido. 

Pruebas de usuario: 
    1. El analista de publicación quiere escanear el código QR de una prenda para visualizar sus datos heredados (estado, categoría, foto) y obtener el cálculo automático del precio sugerido y el sistema responde con éxito. 

US05 - Confirmar propuesta de venta (Estimación: 3)

Como vendedor quiero confirmar una porpuesta de venta para decidir cuales prendas vender. 

Criterios de aceptación: 
    - El sistema debe enviar mail de confirmación de la donación y/o pasos a seguir para retirar las prendas. 
    - El sistema debe detallar la fecha y cantidad de prendas.
    - El sistema debe detallar el listado de prendas seleccionadas con: nombre, categoría, estado, precio sugerido y la ganancia. 
    - Por cada prenda se debe seleccionar si se vende o no. 
    - Si no vende la prenda, se selecciona donar o retirar. 
    
Pruebas de usuario:
    1. El vendedor quiere confirmar la propuesta de venta seleccionando qué prendas vender, y para aquellas que decide no vender, asignarles el destino de donación o retiro (recibiendo el mail de confirmación correspondiente).

No incluye: 
    - Pago a los vendedores.
    - Validar teléfono.
    - Donaciones.
    - Logística.
    - Compras de prendas. 
    - Notificación por mail de seguimiento.
    - Registrar vendedor con google. 
