import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { InscriptionRoutes } from '../app/inscription/routes';
import { CatalogRoutes } from '../app/catalog/routes';
import { swaggerDocument } from '../swagger/swagger.config';
import { getArgentinaIsoString } from '../helpers/time.helper';
import { UserRepository_I } from '../../infrastructure';

export class AppRouter {
    static get routes(): Router {
        const router = Router();

        // Swagger Documentation
        router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        router.get('/api/docs.json', (req, res) => res.json(swaggerDocument));

        // Core API Modules
        router.use('/api/inscriptions', InscriptionRoutes.routes);
        router.use('/api/catalog', CatalogRoutes.routes);

        // Top-level Aliases for Frontend Convenience
        router.get('/api/time', (req, res) => {
            res.json({ now: getArgentinaIsoString() });
        });

        router.get('/api/session', async (req, res) => {
            try {
                const userRepo = new UserRepository_I();
                const user = await userRepo.findSessionUser();
                res.json(user || { id: 1, nombre: 'Felipe', email: 'felipe@ejemplo.com' });
            } catch {
                res.json({ id: 1, nombre: 'Felipe', email: 'felipe@ejemplo.com' });
            }
        });

        router.use('/api/activities', (req, res, next) => {
            req.url = '/activities' + (req.url === '/' ? '' : req.url);
            CatalogRoutes.routes(req, res, next);
        });

        return router;
    }
}
