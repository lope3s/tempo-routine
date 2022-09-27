import { ObjectId } from 'mongodb'

class Label {
    name: string;
    userId: ObjectId;
    createdAt: Date;
    deletedAt: null | Date;

    constructor(name: string, userId: string) {
        this.name = name;
        this.userId = new ObjectId(userId);
        this.createdAt = new Date();
        this.deletedAt = null;
    }
}

export default Label;