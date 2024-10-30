"use server";

import connectDb from "@/lib/db/connectDb";
import User from "@/lib/db/models/User";
import { ErrorResponse } from "@/types";
import { IUser } from "@/types/entities";

export const createUser = async (userData: IUser): Promise<ErrorResponse> => {
    try {
        await connectDb();
        await User.create({
            ...userData,
            image: "a"
        });
        console.log('done');
        return {};
        
    } catch (error: any) {     
        const code = error?.errorResponse?.code   
        if (code === 11000) {
            return { message: "User Already exists" };
        } else {
            console.log(error);  
            return { message: "Unknown error occurred" };
        }
    }
};
