"use server";

import { ERROR_DEFAULT } from "@/constants";
import connectDb from "@/lib/db/connectDb";
import User from "@/lib/db/models/User";
import { BcryptService } from "@/lib/services/BcryptService";
import { ErrorResponse, StatusCode } from "@/types";
import { IUser } from "@/types/entities";
import { validateUserData } from "./helpers";

connectDb();

const bcrypt = new BcryptService();


export const createUser = async (userData: IUser): Promise<ErrorResponse | undefined> => {
    try {
        
        validateUserData(userData);
        const password = await bcrypt.hash(userData.password!);

        await User.create({
            ...userData,
            password
        });

    } catch (error: any) {
        const code = error?.errorResponse?.code;
        if (code === 11000) {
            return { message: "User Already exists", code: StatusCode.Conflict };
        } else {
            console.log(error);
            return { message: error.message ?? ERROR_DEFAULT };
        }
    }
};

export const validateUser = async (email: string, password: string): Promise<ErrorResponse> => {
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return { message: "Invalid Credentials" };
        } else {
            // copkies logic and all
        }
        return {};
    } catch (error: any) {
        console.log(error);
        return { message: error.message ?? ERROR_DEFAULT };
    }
};

