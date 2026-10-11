import { Request, Response } from 'express';
import { InscriptionService } from './inscription.service';
import { RegisterInscriptionDto } from '../../dto/inscription/register-inscription.dto';

export class InscriptionController {
    constructor(
        private readonly inscriptionService: InscriptionService
    ) {}

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
