import { Label } from "../entities";
import { client } from '../database/db';
import { ObjectId } from "mongodb";

const labelColl = client.collection('labels')

async function createLabel(label: Label) {
    return labelColl.insertOne(label)
}

async function listLabels(queryObj: {[key: string]: any}) {
    return labelColl.find({...queryObj, deletedAt: null})
}

async function updateLabel(labelId: string, updatingObj: {[key: string]: any}) {
    const label = await labelColl.findOne({"_id": new ObjectId(labelId)})

    if (!label) throw Error("Label not found.")

    const validFields: {[key: string]: any} = {}

    Object.entries(updatingObj)
    .filter(([key, value]) => label[key] !== undefined)
    .forEach(([key, value]) => validFields[key] = value)

    const updatedLabelObj = {...label, ...validFields}

    return labelColl.updateOne(
        {_id: new ObjectId(labelId)},
        {$set: updatedLabelObj}
    )
}

async function deleteLabel(labelId: string) {
    return labelColl.deleteOne({_id: new ObjectId(labelId)})
}

export {
    createLabel,
    listLabels,
    updateLabel,
    deleteLabel
}