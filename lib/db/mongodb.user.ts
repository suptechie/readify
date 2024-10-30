import { getMongoConnection } from './mongodb';
import { IUser } from "@/types";
import MongoDbUtils from './mongodb.utils';

export default class DBUserInteractions extends MongoDbUtils {
    constructor(){
        super();
    }
    
    static async validateUserWithCredentials(email: string, password: string) {
        const { db } = await getMongoConnection();
        return await db.collection('users').findOne({ email, password });
    }

    static async createUser(user: IUser) {
        const { db } = await getMongoConnection();

        try {
            const result = await db.collection('users').insertOne({
                email: user.email,
                username: user.username,
                password: user.password,
                age: user.age,
                phone: user.phone,
                image: user.image,
                preferences: user.preferences,
                gender: user.gender,
                bio: user.bio,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            return result;
        } catch (error: any) {
            if (error.code === 11000) {
                console.error('Duplicate key error:', error.message);
                throw new Error('A user with this email or username already exists.');
            } else {
                console.error('Error creating user:', error);
                throw error;
            }
        }
    }
}
