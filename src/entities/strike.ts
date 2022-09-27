import { ObjectId } from "mongodb";

class Strike {
    userId: ObjectId;
    taskId: ObjectId;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    deletedAt: null | Date;

    constructor(userId: string, taskId: string, startDate: string, endDate: string) {
        this.userId = new ObjectId(userId);
        this.taskId = new ObjectId(taskId);
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.createdAt = new Date();
        this.deletedAt = null;
    }
}

export default Strike;