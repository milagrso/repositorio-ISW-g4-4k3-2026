import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { InscriptionRoutes } from '../app/inscription/routes';
import { CatalogRoutes } from '../app/catalog/routes';
import { swaggerDocument } from '../swagger/swagger.config';

export class AppRouter {
    static get routes(): Router {
        const router = Router();

        // Swagger Documentation
        router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        router.get('/api/docs.json', (req, res) => res.json(swaggerDocument));

        // Core API Modules
        router.use('/api/inscriptions', InscriptionRoutes.routes);
        router.use('/api/catalog', CatalogRoutes.routes);
        router.use('/api', CatalogRoutes.routes);

        return router;
    }
}
