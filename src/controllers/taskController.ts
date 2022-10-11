import { Request, Response } from "express";
import { Task } from "../entities";
import { validateObjAgainstSchema, createTask } from "../helpers";

class TaskController {
    async storeTask(req: Request, res: Response) {
        try {
            const validatedReqBody = validateObjAgainstSchema(Task, req.body)

            if(!validatedReqBody.valid) return res.status(400).json({error: 'The following fields are missing', missingField: validatedReqBody.missingFields})
    
            const taskCreated = await createTask(validatedReqBody.obj)
    
            return res.status(201).json({
                message: "Task created.",
                id: taskCreated.insertedId
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: "Internal Server Error."})
        }
    }
}

export default new TaskController();