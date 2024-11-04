import { MONGO_URI, NODE_ENV } from '@/config';
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
        });

        connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

    } catch (error) {
        console.log(error);
    }
};

export default connectDB;