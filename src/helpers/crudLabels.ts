import { Label } from "../entities";
import { client } from '../database/db';

const labelColl = client.collection('labels')

async function createLabel(label: Label) {
    return labelColl.insertOne(label)
}

export {
    createLabel
}