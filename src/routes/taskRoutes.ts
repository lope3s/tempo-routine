import { Router } from "express";
import LabelController from "../controllers/taskController";
import { authorize } from "../middlewares";

const taskRoutes = Router()

taskRoutes.use(authorize)

taskRoutes.post('/', LabelController.storeTask)

export default taskRoutes;