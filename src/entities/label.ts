import { ObjectId } from 'mongodb'

class Label {
    name: string;
    userId: ObjectId | undefined;
    createdAt: Date;
    deletedAt: null | Date;

    constructor(name: string, userId: string) {
        this.name = name;
        this.userId = userId ? new ObjectId(userId) : undefined;
        this.createdAt = new Date();
        this.deletedAt = null;
    }
}

export default Label;