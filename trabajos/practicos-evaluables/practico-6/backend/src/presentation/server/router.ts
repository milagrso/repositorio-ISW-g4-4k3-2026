import { Router } from 'express';
import { InscriptionRoutes } from '../app/inscription/routes';

export class AppRouter {
    static get routes(): Router {
        const router = Router();

        router.use('/api/inscriptions', InscriptionRoutes.routes);

        return router;
    }
}
