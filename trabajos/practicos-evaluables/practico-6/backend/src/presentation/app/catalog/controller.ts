import { Request, Response } from 'express';
import { CatalogService } from './catalog.service';
import { ApiTag, ApiOperation } from '../../swagger/swagger.decorators';
import {
    ActivityResponse,
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
        const message = statusCode >= 500 ? defaultMessage : (error.message || defaultMessage);
        return res.status(statusCode).json({
            error: message,
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
        path: '/api/catalog/time-slots',
        method: 'get',
        tags: ['Catálogo'],
        summary: 'Listar todos los turnos',
        parameters: [
            {
                name: 'activityId',
                in: 'query',
                required: false,
                schema: { type: 'integer' },
                description: 'ID de la actividad para filtrar turnos',
            },
            {
                name: 'date',
                in: 'query',
                required: false,
                schema: { type: 'string', format: 'date' },
                description: 'Fecha en formato YYYY-MM-DD para filtrar turnos',
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
            const rawDate = req.query.date ?? req.query.fecha;
            const date = rawDate ? String(rawDate) : undefined;
            const activityId = req.query.activityId ? String(req.query.activityId) : undefined;
            const slots = await this.catalogService.getTimeSlots(date, activityId);
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
            '404': {
                description: 'Turno no encontrado',
                schema: ErrorResponse,
            },
        },
    })
    public getTimeSlotById = async (req: Request, res: Response) => {
        try {
            const slot = await this.catalogService.getTimeSlotById(req.params.id);
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
            '404': {
                description: 'Parque no encontrado',
                schema: ErrorResponse,
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
