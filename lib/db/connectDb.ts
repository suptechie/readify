import { MONGO_URL } from '@/config';
import { connect, connection } from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        await connect(MONGO_URL!, {
            serverSelectionTimeoutMS: 30000,
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }

    connection.on('connected', () => {
        console.log('Mongoose connected to DB');
    });

    connection.on('error', (err) => {
        console.error('Mongoose connection error:', err);
    });

    connection.on('disconnected', () => {
        console.log('Mongoose disconnected from DB');
    });


    process.on('SIGINT', async () => {
        await connection.close();
        console.log('Mongoose connection closed due to app termination');
        process.exit(0);
    });
};

export default connectDB;