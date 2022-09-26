import { ObjectId } from 'mongodb'

class Label {
    name: string;
    userId: ObjectId;

    constructor(name: string, userId: string) {
        this.name = name;
        this.userId = new ObjectId(userId);
    }
}

export default Label;