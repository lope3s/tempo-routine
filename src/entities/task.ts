import { ObjectId } from "mongodb";

enum ERecurrenceType {
    EveryWeekDay = 0,
    EveryDay = 1,
    EveryMonth = 2,
    PersonalRecurrence = 3
}

class Task {
    name: string;
    recurrenceType: ERecurrenceType;
    recurrenceValue: string;
    hour: number;
    labels: ObjectId[];
    userId: ObjectId | undefined;
    taskNotes: string;
    createdAt: Date;
    deletedAt: null | Date;

    constructor(name: string, recurrenceType: ERecurrenceType, recurrenceValue: string, hour: number, labels: string[], userId: string, taskNotes: string) {
        this.name = name;
        this.recurrenceType = recurrenceType;
        this.recurrenceValue = recurrenceValue;
        this.hour = hour;
        this.labels = labels?.map(label => new ObjectId(label));
        this.userId = userId ? new ObjectId(userId) : undefined;
        this.taskNotes = taskNotes;
        this.createdAt = new Date();
        this.deletedAt = null;
    }
}

export default Task;