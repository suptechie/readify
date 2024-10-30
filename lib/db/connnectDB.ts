import { MONGO_URL } from "@/config";
import { connect } from "mongoose";

const connectDb = async()=>{
    try {
        await connect(MONGO_URL);
        console.log("mongodb connected")
    } catch (error) {
        console.log('Error in connecting to db', error);
        
    }
}

export default connectDb;