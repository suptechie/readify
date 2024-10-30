import { MongoClient } from "mongodb";
import { MongoConnection } from "@/types";
import { DATABASE_NAME } from "@/constants/database";
import { MONGO_URL } from '@/config';

if (!MONGO_URL) {
    throw new Error("Invalid environment variable: 'MONGO_URL'");
}

const options = {};

let clientPromise: Promise<MongoClient>;

let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>;
};

if (process.env.NODE_ENV === 'development') {
    if (!globalWithMongo._mongoClientPromise) {
        const client = new MongoClient(MONGO_URL, options);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
} else {
    const client = new MongoClient(MONGO_URL, options);
    clientPromise = client.connect();
}

export default clientPromise;

export async function getMongoConnection(): Promise<MongoConnection> {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    return { client, db };
}

export async function getMongoConnectionWithDb(dbName: string): Promise<MongoConnection> {
    const client = await clientPromise;
    const db = client.db(dbName);
    return { client, db };
}