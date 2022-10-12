import { Task } from "../entities";
import { client } from "../database/db";
import { ObjectId } from "mongodb";

const taskColl = client.collection("tasks")

async function createTask(task: Task) {
    return taskColl.insertOne(task)
}

async function listTasks(queryObj: {[key: string]: any}) {
    return taskColl.find({...queryObj, deletedAt: null})
}

async function deleteTask(taskId: string) {
    return taskColl.deleteOne({_id: new ObjectId(taskId)})
}

async function updateTask(taskId: string, updatingObj: {[key: string]: any}) {
    const task = await taskColl.findOne({"_id": new ObjectId(taskId)})

    if (!task) throw Error("Task not found.")

    const {_id, userId, createdAt, deletedAt, ...rest} = task

    const validFields: {[key: string]: any} = {}

    Object.entries(updatingObj)
    .filter(([key, value]) => rest[key] !== undefined)
    .forEach(([key, value]) => validFields[key] = value)

    const updatedTaskObj = {...task, ...validFields}

    return taskColl.updateOne(
        {_id: new ObjectId(taskId)},
        {$set: updatedTaskObj}
    )
}

export {
    createTask,
    listTasks,
    deleteTask,
    updateTask
}