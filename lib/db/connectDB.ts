import { MONGO_URI } from '@/config';
import { connect, connection, connections } from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        
        if (connections[0].readyState) {
            console.log('Already connected to MongoDB');
            return;
        }

        connect(MONGO_URI);


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