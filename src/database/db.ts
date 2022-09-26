import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_CONNECTION_STRING || "").db('routines')

function setUpDb() {
    client.createCollection('labels')
    client.createCollection('tasks')
    client.createCollection('strikes')
}

export {
    client,
    setUpDb
};