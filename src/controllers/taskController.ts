import { Request, Response } from "express";
import { Task } from "../entities";
import { validateObjAgainstSchema, createTask, listTasks, updateTask, deleteTask } from "../helpers";
import { ObjectId } from "mongodb";

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

    async showTask(req: Request, res: Response) {
        if(req.query.name) req.query.name = {
            $regex: req.query.name,
            $options: 'i'
        }

        if(req.query._id) {
            try {
                new ObjectId(req.query._id as string)
            } catch (error) {
                return res.status(400).json({error: "Invalid ID format."})
            }
        }

        const tasks = await (await listTasks(req.query)).toArray()

        if (tasks.length) {
            return res.status(200).json({result: tasks})
        }

        return res.status(404).json({error: 'No data found.'})
    }

    async updateTask(req: Request, res: Response) {
        if (!req.params.taskId) return res.status(400).json({error: "No task ID provided."})

        try {
            new ObjectId(req.params.taskId as string)
        } catch (error) {
            return res.status(400).json({error: "Invalid ID format."})
        }

        try {
            await updateTask(req.params.taskId, req.body)

            return res.status(200).json({message: "Task updated."})
        } catch (error: any) {
            return res.status(404).json({error: error.message})
        }
    }

    async deleteTask(req: Request, res: Response) {
        if (!req.params.taskId) return res.status(400).json({error: "No task ID provided."})

        try {
            new ObjectId(req.params.taskId as string)
        } catch (error) {
            return res.status(400).json({error: "Invalid ID format."})
        }

        await deleteTask(req.params.taskId)

        return res.status(204).end()
    }
}

export default new TaskController();