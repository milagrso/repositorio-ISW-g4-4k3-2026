import { Request, Response } from 'express';
import { InscriptionService } from './inscription.service';
import { RegisterInscriptionDto } from '../../dto/inscription/register-inscription.dto';
import { RegisterInscriptionResponse, ErrorResponse } from '../../dto/inscription/register-inscription.res';
import { ApiTag, ApiOperation } from '../../swagger/swagger.decorators';

@ApiTag('Inscripciones', 'Endpoints de registro y gestión de reservas en actividades')
export class InscriptionController {
    constructor(
        private readonly inscriptionService: InscriptionService
    ) {}

    @ApiOperation({
        path: ['/api/inscriptions/register', '/api/inscriptions'],
        method: 'post',
        tags: ['Inscripciones'],
        summary: 'Registrar una nueva inscripción',
        description: 'Registra la inscripción para una actividad en un turno y fecha específicos, validando cupos, edad mínima, talle de vestimenta, ventana de 24h y solapamiento de horarios.',
        requestBody: {
            required: true,
            schema: RegisterInscriptionDto,
        },
        responses: {
            '201': {
                description: 'Inscripción registrada con éxito',
                schema: RegisterInscriptionResponse,
            },
            '400': {
                description: 'Error de validación de datos o regla de negocio',
                schema: ErrorResponse,
            },
        },
    })
    public register = async (req: Request, res: Response) => {
        const [error, dto] = RegisterInscriptionDto.create(req.body);

        if (error) {
            return res.status(400).json({ error });
        }

        try {
            const result = await this.inscriptionService.register(dto!);
            return res.status(201).json(result);
        } catch (error: any) {
            const statusCode = error.statusCode || 500;
            return res.status(statusCode).json({
                error: error.message || 'Error interno del servidor'
            });
        }
    };
}
