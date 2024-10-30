import { getMongoConnection } from './mongodb';
import { Genres } from '@/types';

export async function initializeDatabase() {
    try {
        const { db } = await getMongoConnection();

        await db.createCollection('users', {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["email", "username", "password", "preferences", "createdAt", "updatedAt"],
                    properties: {
                        email: {
                            bsonType: "string",
                            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
                        },
                        username: { bsonType: "string", minLength: 3 },
                        password: { bsonType: "string", minLength: 6 },
                        age: { bsonType: ["int", "null"] },
                        phone: { bsonType: ["string"] },
                        image: { bsonType: ["string"] },
                        preferences: {
                            bsonType: "array",
                            items: {
                                enum: Object.values(Genres)
                            }
                        },
                        gender: { bsonType: ["string"] },
                        bio: { bsonType: ["string"] },
                        createdAt: { bsonType: "date" },
                        updatedAt: { bsonType: "date" }
                    }
                }
            }
        });

        await db.createCollection('articles', {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["title", "content", "author", "genre", "createdAt", "updatedAt"],
                    properties: {
                        title: { bsonType: "string", minLength: 1 },
                        content: { bsonType: "string", minLength: 1 },
                        author: { bsonType: "string" },
                        genre: { enum: Object.values(Genres) },
                        image: { bsonType: ["string", "null"] },
                        tags: {
                            bsonType: ["array", "null"],
                            items: { bsonType: "string" }
                        },
                        createdAt: { bsonType: "date" },
                        updatedAt: { bsonType: "date" }
                    }
                }
            }
        });

        await db.createCollection('articleInteractions', {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["article", "user", "type", "createdAt", "updatedAt"],
                    properties: {
                        article: { bsonType: "string" },
                        user: { bsonType: "string" },
                        type: { enum: ["like", "dislike"] },
                        createdAt: { bsonType: "date" },
                        updatedAt: { bsonType: "date" }
                    }
                }
            }
        });

        await db.createCollection('blockedArticles', {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["article", "user", "createdAt", "updatedAt"],
                    properties: {
                        article: { bsonType: "string" },
                        user: { bsonType: "string" },
                        createdAt: { bsonType: "date" },
                        updatedAt: { bsonType: "date" }
                    }
                }
            }
        });

        await db.collection('users').createIndexes([
            { key: { email: 1 }, unique: true },
            { key: { username: 1 }, unique: true },
            { key: { preferences: 1 } },
        ]);

        await db.collection('articles').createIndexes([
            { key: { author: 1 } },
            { key: { genre: 1 } },
            { key: { tags: 1 } },
            { key: { title: "text", content: "text" } }
        ]);

        await db.collection('articleInteractions').createIndexes([
            { key: { article: 1 } },
            { key: { user: 1 } },
            { key: { type: 1 } },
            { key: { article: 1, user: 1 }, unique: true },
            { key: { createdAt: 1 } }
        ]);

        await db.collection('blockedArticles').createIndexes([
            { key: { article: 1 } },
            { key: { user: 1 } },
            { key: { article: 1, user: 1 }, unique: true },
            { key: { createdAt: 1 } }
        ]);

        console.log('Database initialization completed successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}