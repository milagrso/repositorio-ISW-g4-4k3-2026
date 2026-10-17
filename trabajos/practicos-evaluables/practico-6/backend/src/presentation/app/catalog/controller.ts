import { Request, Response } from 'express';
import { CatalogService } from './catalog.service';
import { ApiTag, ApiOperation } from '../../swagger/swagger.decorators';
import {
    ActivityResponse,
    TimeSlotAvailabilityResponse,
    TimeSlotResponse,
    ParkResponse,
    UserResponse,
    ServerTimeResponse,
} from '../../dto/catalog/catalog.res';
import { ErrorResponse } from '../../dto/inscription/register-inscription.res';

@ApiTag('Catálogo', 'Consulta de actividades, turnos, disponibilidad por fecha, parques y sesión')
export class CatalogController {
    constructor(private readonly catalogService: CatalogService) {}

    private handleError = (error: any, res: Response, defaultMessage = 'Error interno del servidor') => {
        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({
            error: error.message || defaultMessage,
        });
    };

    @ApiOperation({
        path: '/api/catalog/activities',
        method: 'get',
        tags: ['Catálogo'],
        summary: 'Listar todas las actividades',
        description: 'Retorna todas las actividades del parque con requerimientos de talle, cupo máximo y edad mínima.',
        responses: {
            '200': {
                description: 'Listado de actividades',
                items: ActivityResponse,
            },
        },
    })
    public getActivities = async (req: Request, res: Response) => {
        try {
            const activities = await this.catalogService.getActivities();
            return res.json(activities);
        } catch (error: any) {
            return this.handleError(error, res, 'Error al obtener actividades');
        }
    };

    @ApiOperation({
        path: '/api/catalog/activities/{id}',
        method: 'get',
        tags: ['Catálogo'],
        summary: 'Obtener detalle de una actividad',
        parameters: [
            {
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'string' },
                description: 'ID de la actividad',
            },
        ],
        responses: {
            '200': {
                description: 'Detalle de la actividad',
                schema: ActivityResponse,
            },
            '404': {
                description: 'Actividad no encontrada',
                schema: ErrorResponse,
            },
        },
    })
    public getActivityById = async (req: Request, res: Response) => {
        try {
            const activity = await this.catalogService.getActivityById(req.params.id);
            return res.json(activity);
        } catch (error: any) {
            return this.handleError(error, res, 'Actividad no encontrada');
        }
    };

    @ApiOperation({
        path: '/api/catalog/activities/{id}/turnos',
        method: 'get',
        tags: ['Catálogo'],
        summary: 'Consultar disponibilidad de turnos por actividad y fecha',
        description: 'Calcula cupos disponibles en la fecha indicada y si el turno es reservable según la ventana horaria y calendario.',
        parameters: [
            {
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'string' },
                description: 'ID de la actividad',
            },
            {
                name: 'fecha',
                in: 'query',
                required: false,
                schema: { type: 'string', format: 'date', example: '2026-10-17' },
                description: 'Fecha a consultar en formato YYYY-MM-DD',
            },
        ],
        responses: {
            '200': {
                description: 'Turnos disponibles calculados',
                items: TimeSlotAvailabilityResponse,
            },
        },
    })
    public getActivityTimeSlots = async (req: Request, res: Response) => {
        try {
            const fecha = req.query.fecha ? String(req.query.fecha) : undefined;
            const slots = await this.catalogService.getActivityTimeSlots(req.params.id, fecha);
            return res.json(slots);
        } catch (error: any) {
            return this.handleError(error, res, 'Error al obtener turnos de la actividad');
        }
    };

    @ApiOperation({
        path: '/api/catalog/time-slots',
        method: 'get',
        tags: ['Catálogo'],
        summary: 'Listar todos los turnos plantilla',
        parameters: [
            {
                name: 'fecha',
                in: 'query',
                required: false,
                schema: { type: 'string', format: 'date' },
                description: 'Fecha opcional para cálculo de cupos ocupados',
            },
        ],
        responses: {
            '200': {
                description: 'Listado de turnos',
                items: TimeSlotResponse,
            },
        },
    })
    public getTimeSlots = async (req: Request, res: Response) => {
        try {
            const fecha = req.query.fecha ? String(req.query.fecha) : undefined;
            const slots = await this.catalogService.getTimeSlots(fecha);
            return res.json(slots);
        } catch (error: any) {
            return this.handleError(error, res, 'Error al obtener turnos');
        }
    };

    @ApiOperation({
        path: '/api/catalog/time-slots/{id}',
        method: 'get',
        tags: ['Catálogo'],
        summary: 'Obtener turno por ID',
        parameters: [
            {
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'string' },
            },
        ],
        responses: {
            '200': {
                description: 'Detalle del turno',
                schema: TimeSlotResponse,
            },
        },
    })
    public getTimeSlotById = async (req: Request, res: Response) => {
        try {
            const fecha = req.query.fecha ? String(req.query.fecha) : undefined;
            const slot = await this.catalogService.getTimeSlotById(req.params.id, fecha);
            return res.json(slot);
        } catch (error: any) {
            return this.handleError(error, res, 'Turno no encontrado');
        }
    };

    @ApiOperation({
        path: '/api/catalog/parks',
        method: 'get',
        tags: ['Catálogo'],
        summary: 'Listar parques',
        responses: {
            '200': {
                description: 'Listado de parques',
                items: ParkResponse,
            },
        },
    })
    public getParks = async (req: Request, res: Response) => {
        try {
            const parks = await this.catalogService.getParks();
            return res.json(parks);
        } catch (error: any) {
            return this.handleError(error, res, 'Error al obtener parques');
        }
    };

    @ApiOperation({
        path: '/api/catalog/parks/{id}',
        method: 'get',
        tags: ['Catálogo'],
        summary: 'Obtener parque por ID',
        parameters: [
            {
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'string' },
            },
        ],
        responses: {
            '200': {
                description: 'Detalle del parque',
                schema: ParkResponse,
            },
        },
    })
    public getParkById = async (req: Request, res: Response) => {
        try {
            const park = await this.catalogService.getParkById(req.params.id);
            return res.json(park);
        } catch (error: any) {
            return this.handleError(error, res, 'Parque no encontrado');
        }
    };

    @ApiOperation({
        path: '/api/catalog/inscriptions',
        method: 'get',
        tags: ['Catálogo'],
        summary: 'Listar inscripciones registradas',
        responses: {
            '200': {
                description: 'Listado de inscripciones',
            },
        },
    })
    public getInscriptions = async (req: Request, res: Response) => {
        try {
            const inscriptions = await this.catalogService.getInscriptions();
            return res.json(inscriptions);
        } catch (error: any) {
            return this.handleError(error, res, 'Error al obtener inscripciones');
        }
    };

    @ApiOperation({
        path: '/api/catalog/inscriptions/{id}',
        method: 'get',
        tags: ['Catálogo'],
        summary: 'Obtener inscripción por ID',
        parameters: [
            {
                name: 'id',
                in: 'path',
                required: true,
                schema: { type: 'string' },
                description: 'ID de la inscripción',
            },
        ],
        responses: {
            '200': {
                description: 'Detalle de la inscripción',
            },
            '404': {
                description: 'Inscripción no encontrada',
                schema: ErrorResponse,
            },
        },
    })
    public getInscriptionById = async (req: Request, res: Response) => {
        try {
            const inscription = await this.catalogService.getInscriptionById(req.params.id);
            return res.json(inscription);
        } catch (error: any) {
            return this.handleError(error, res, 'Inscripción no encontrada');
        }
    };

    @ApiOperation({
        path: '/api/catalog/session',
        method: 'get',
        tags: ['Catálogo'],
        summary: 'Obtener datos de usuario de la sesión actual',
        description: 'Retorna el usuario configurado en variables de entorno (SESSION_USER_EMAIL / SEED_USER_EMAIL) sin requerir autenticación compleja.',
        responses: {
            '200': {
                description: 'Usuario de sesión',
                schema: UserResponse,
            },
        },
    })
    public getSessionUser = async (req: Request, res: Response) => {
        try {
            const user = await this.catalogService.getSessionUser();
            return res.json(user);
        } catch (error: any) {
            return this.handleError(error, res, 'Error al obtener usuario de sesión');
        }
    };

    @ApiOperation({
        path: '/api/time',
        method: 'get',
        tags: ['Servidor / Tiempo'],
        summary: 'Obtener hora actual del servidor en huso horario de Argentina (-03:00)',
        description: 'Provee la hora oficial del servidor sincronizada para prevenir desajustes con el reloj del dispositivo móvil del visitante.',
        responses: {
            '200': {
                description: 'Hora del servidor',
                schema: ServerTimeResponse,
            },
        },
    })
    public getTime = async (req: Request, res: Response) => {
        try {
            const time = this.catalogService.getCurrentTime();
            return res.json(time);
        } catch (error: any) {
            return this.handleError(error, res, 'Error al obtener hora del servidor');
        }
    };
}
