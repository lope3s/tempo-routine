import { Router } from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerSetup from '../config/swagger-setup.json';

const routes = Router();

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup));

export default routes;