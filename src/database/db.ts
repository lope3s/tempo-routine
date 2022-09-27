import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_CONNECTION_STRING || "").db('routines')

async function setUpDb() {
    const collections = await client.collections()
    if (!collections.length) {
        client.createCollection('labels')
        client.createCollection('tasks')
        client.createCollection('strikes')
    }
}

export {
    client,
    setUpDb
};