"use server";

import connectDb from "@/lib/db/connectDb";
import User from "@/lib/db/models/User";
import { BcryptService } from "@/lib/services/BcryptService";
import { ErrorResponse } from "@/types";
import { IUser } from "@/types/entities";

connectDb();

const bcrypt = new BcryptService();

export const createUser = async (userData: IUser): Promise<ErrorResponse> => {
    try {
        const password = await bcrypt.hash(userData.password!);

        await User.create({
            ...userData,
            password
        });

        return {};
    } catch (error: any) {
        const code = error?.errorResponse?.code;
        if (code === 11000) {
            return { message: "User Already exists" };
        } else {
            console.log(error);
            return { message: "Unknown error occurred" };
        }
    }
};

