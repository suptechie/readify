import { MONGO_URI } from '@/config';
import { connect, connection } from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        connect(MONGO_URI);
        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        });
    } catch (error) {
        console.log('Something goes wrong!', error);
    }
};

export default connectDB;