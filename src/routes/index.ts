import { Router } from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerSetup from '../config/swagger-setup.json';
import labelRoutes from "./labelRoutes";

const routes = Router();

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup));
routes.use('/labels', labelRoutes);

export default routes;