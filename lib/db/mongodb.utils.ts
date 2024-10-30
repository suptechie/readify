// utils/mongodb.utils.ts
import { ObjectId } from "mongodb";
import { getMongoConnection } from "./mongodb";
import { Collections } from "@/types";

export default class MongoDbUtils {
    protected static async exists<T extends keyof Collections>(
        collectionName: T,
        id: string
    ): Promise<Collections[T] | null> {
        try {
            const { db } = await getMongoConnection();
            const doc = await db
                .collection(collectionName)
                .findOne<Collections[T]>({ _id: new ObjectId(id) });
            return doc;
        } catch (error) {
            console.error(`Error in exists method for collection ${collectionName}:`, error);
            return null;
        }
    }

}