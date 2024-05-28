import { MongoClient } from "mongodb";


export async function getDb() {
    let client = new MongoClient(process.env.CONNECTION_STRING)
    let connection = await client.connect();
    let db = connection.db("master-sessions");
    return db;
}
