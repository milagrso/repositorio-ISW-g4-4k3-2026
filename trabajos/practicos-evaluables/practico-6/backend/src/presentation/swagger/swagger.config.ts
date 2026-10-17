import { swaggerRegistry } from './swagger.decorators';

// Import all decorated DTOs and Controllers so their decorators run and register in the registry
import '../dto/inscription/register-inscription.dto';
import '../dto/inscription/register-inscription.res';
import '../dto/catalog/catalog.res';
import '../app/inscription/controller';
import '../app/catalog/controller';

export function createSwaggerDocument() {
    return swaggerRegistry.buildDocument({
        openapi: '3.0.0',
        info: {
            title: 'EcoHarmony Park API',
            version: '1.0.0',
            description: 'API REST para la reserva de turnos, consulta de catálogo y validación de inscripciones en EcoHarmony Park.',
            contact: {
                name: 'EcoHarmony Park Tech Team',
                email: 'fortuneappok@gmail.com',
            },
        },
        servers: [
            {
                url: '/',
                description: 'Servidor Actual',
            },
        ],
        tags: [
            {
                name: 'Inscripciones',
                description: 'Endpoints de registro y gestión de reservas en actividades',
            },
            {
                name: 'Catálogo',
                description: 'Consulta de actividades, turnos, disponibilidad por fecha, parques y sesión',
            },
            {
                name: 'Servidor / Tiempo',
                description: 'Consulta de sincronización horaria con el servidor (-03:00)',
            },
        ],
    });
}

export const swaggerDocument = createSwaggerDocument();
