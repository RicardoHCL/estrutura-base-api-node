import { Router } from 'express';

// Import dos Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

// Import Middlewares
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Rotas Liberadas
routes.post('/users', UserController.create);
routes.post('/session', SessionController.create);

routes.use(authMiddleware);

// Rotas Bloqueadas
routes.get('/profile', UserController.listOne);

export default routes;
