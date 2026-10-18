import { Router } from 'express';
import { InscriptionService } from './inscription.service';
import { InscriptionController } from './controller';
import {
    ActivityRepository_I,
    EmailHelper,
    InscriptionRepository_I,
    ParkRepository_I,
    QrHelper,
    UserRepository_I,
} from '../../../infrastructure';

export class InscriptionRoutes {
    static get routes(): Router {
        const router = Router();

        const service = new InscriptionService(
            new ParkRepository_I(),
            new ActivityRepository_I(),
            new InscriptionRepository_I(),
            new UserRepository_I(),
            new EmailHelper(),
            new QrHelper()
        );

        const controller = new InscriptionController(service);

        router.post('/', controller.register);

        return router;
    }
}
