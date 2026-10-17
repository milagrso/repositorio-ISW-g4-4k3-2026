import { Router } from 'express';
import { CatalogController } from './controller';
import { CatalogService } from './catalog.service';
import {
    ActivityRepository_I,
    InscriptionRepository_I,
    ParkRepository_I,
    UserRepository_I,
} from '../../../infrastructure';

export class CatalogRoutes {
    static get routes(): Router {
        const router = Router();

        const service = new CatalogService(
            new ActivityRepository_I(),
            new ParkRepository_I(),
            new InscriptionRepository_I(),
            new UserRepository_I()
        );

        const controller = new CatalogController(service);

        // Activities
        router.get('/activities', controller.getActivities);
        router.get('/activities/:id/turnos', controller.getActivityTimeSlots);
        router.get('/activities/:id', controller.getActivityById);

        // Time slots
        router.get('/time-slots', controller.getTimeSlots);
        router.get('/time-slots/:id', controller.getTimeSlotById);

        // Parks
        router.get('/parks', controller.getParks);
        router.get('/parks/:id', controller.getParkById);

        // Inscriptions
        router.get('/inscriptions', controller.getInscriptions);
        router.get('/inscriptions/:id', controller.getInscriptionById);

        // Session & Time
        router.get('/session', controller.getSessionUser);
        router.get('/time', controller.getTime);

        return router;
    }
}
