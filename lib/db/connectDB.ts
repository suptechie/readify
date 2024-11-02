import { MONGO_URI } from '@/config';
import { connect, connection, connections } from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        if (!MONGO_URI) {
            throw new Error(
                'MONGO_URI is not defined in environment variables. ' +
                'Please check your .env file or environment configuration.'
            );
        }

        if (connections[0].readyState) {
            console.log('Already connected to MongoDB');
            return;
        }

        connect(MONGO_URI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        connection.on('error', (err) => {
            console.log('MongoDB connection error: ' + err);
            if (process.env.NODE_ENV === 'production') {
                process.exit(1);
            }
        });

        connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
};

export default connectDB;