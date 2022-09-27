import { Router } from "express";
import LabelController from '../controllers/labelController';
import { authorize } from "../middlewares";

const labelRoutes = Router();

labelRoutes.post('/', authorize, LabelController.createLabel);

export default labelRoutes;