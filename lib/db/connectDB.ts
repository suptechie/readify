import { MONGO_URI } from '@/config';
import { connect, connection } from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        if (!MONGO_URI) {
            throw new Error(
                'MONGO_URI is not defined in environment variables. ' +
                'Please check your .env file or environment configuration.'
            );
        }
        connect(MONGO_URI);
        
        connection.on('error', (err) => {
            console.log('MongoDB connection error: ' + err);
            if (process.env.NODE_ENV === 'production') {
                process.exit(1);
            }
        });

    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
};

export default connectDB;