import { Router } from "express";
import LabelController from "../controllers/taskController";
import { authorize } from "../middlewares";

const taskRoutes = Router()

taskRoutes.use(authorize)

taskRoutes.post('/', LabelController.storeTask);
taskRoutes.get('/', LabelController.showTask);
taskRoutes.put('/:taskId', LabelController.updateTask);
taskRoutes.delete('/:taskId', LabelController.deleteTask);

export default taskRoutes;