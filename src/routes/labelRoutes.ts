import { Router } from "express";
import LabelController from '../controllers/labelController';
import { authorize } from "../middlewares";

const labelRoutes = Router();

labelRoutes.use(authorize)

labelRoutes.post('/', LabelController.storeLabel);
labelRoutes.get('/', LabelController.showLabels);
labelRoutes.put('/:labelId', LabelController.updateLabels);
labelRoutes.delete('/:labelId', LabelController.deleteLabels);

export default labelRoutes;