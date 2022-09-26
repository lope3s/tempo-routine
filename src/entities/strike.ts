import { ObjectId } from "mongodb";

class Strike {
    userId: ObjectId;
    taskId: ObjectId;
    startDate: Date;
    endDate: Date;

    constructor(userId: string, taskId: string, startDate: string, endDate: string) {
        this.userId = new ObjectId(userId)
        this.taskId = new ObjectId(taskId)
        this.startDate = new Date(startDate)
        this.endDate = new Date(endDate)
    }
}

export default Strike;