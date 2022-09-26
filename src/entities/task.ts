import { ObjectId } from "mongodb";

class Task {
    name: string;
    timeDay: Date;
    labels: ObjectId[];
    userId: ObjectId;
    recurrence: any;
    taskNotes: string;

    constructor(name: string, timeDay: string, labels: string[], userId: string, recurrence: any, taskNotes: string) {
        this.name = name;
        this.timeDay = new Date(timeDay);
        this.labels = labels.map(label => new ObjectId(label));
        this.userId = new ObjectId(userId);
        this.recurrence = recurrence;
        this.taskNotes = taskNotes
    }
}

export default Task;