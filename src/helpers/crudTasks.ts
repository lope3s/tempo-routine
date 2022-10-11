import { Task } from "../entities";
import { client } from "../database/db";

const taskColl = client.collection("tasks")

async function createTask(task: Task) {
    return taskColl.insertOne(task)
}

export {
    createTask
}