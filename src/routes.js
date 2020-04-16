import { Router } from 'express';
import multer from 'multer';

// Import dos Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

// Import Middlewares
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

// Rotas Liberadas
routes.post('/users', UserController.create);
routes.post('/session', SessionController.create);

routes.use(authMiddleware);

// Rotas Bloqueadas
routes.get('/profile', UserController.listOne);
routes.put('/users', UserController.update);
routes.post('/files', upload.single('file'), FileController.create);
routes.delete('/files', FileController.delete);

export default routes;
