import { ObjectId } from "mongodb";

class Task {
    name: string;
    timeDay: Date;
    labels: ObjectId[];
    userId: ObjectId;
    recurrence: any;
    taskNotes: string;
    createdAt: Date;
    deletedAt: null | Date;

    constructor(name: string, timeDay: string, labels: string[], userId: string, recurrence: any, taskNotes: string) {
        this.name = name;
        this.timeDay = new Date(timeDay);
        this.labels = labels.map(label => new ObjectId(label));
        this.userId = new ObjectId(userId);
        this.recurrence = recurrence;
        this.taskNotes = taskNotes;
        this.createdAt = new Date();
        this.deletedAt = null;
    }
}

export default Task;