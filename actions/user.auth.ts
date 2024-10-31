"use server";

import connectDb from "@/lib/db/connectDB";
import User from "@/lib/db/models/User";
import { BcryptService } from "@/lib/services/BcryptService";
import { ErrorMessage, ErrorResponse, StatusCode } from "@/types";
import { IUser } from "@/types/entities";
import { validateUserData } from "@/actions/helpers/dataValidations";
import { cookies } from "next/headers";
import JWTService from "@/lib/services/JWTService";
import { NODE_ENV } from "@/config";

connectDb();

const bcrypt = new BcryptService();
const jwt = new JWTService();


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
            return { message: ErrorMessage.ALREADY_EXISTS , code: StatusCode.Conflict };
        } else {
            console.log(error);
            return { message: error.message ?? ErrorMessage.ERROR_DEFAULT };
        }
    }
};

export const validateUser = async (email: string, password: string): Promise<ErrorResponse | undefined> => {
    try {
        const user = await User.findOne({ email }).lean();
        if (!user) {
            return { message: ErrorMessage.INVALID_CREDENTIALS };
        }

        const isPasswordValid = await bcrypt.compare(password,user.password!);
        if (!isPasswordValid) {
            return { message: ErrorMessage.INVALID_CREDENTIALS };
        }

        const token = jwt.createToken(user._id, user.image!);

        (await cookies()).set("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30
        });

    } catch (error: any) {
        console.log(error);
        return { message: error.message ??  ErrorMessage.ERROR_DEFAULT };
    }
};



export const logout = async (): Promise<void> => {
    (await cookies()).set("token", "", {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 0,
    });
};