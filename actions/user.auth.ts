"use server";

import { ERROR_DEFAULT } from "@/constants";
import connectDb from "@/lib/db/connectDb";
import User from "@/lib/db/models/User";
import { BcryptService } from "@/lib/services/BcryptService";
import { ErrorResponse, StatusCode } from "@/types";
import { IUser } from "@/types/entities";
import { validateUserData } from "@/actions/helpers/dataValidations";
import { cookies } from "next/headers";
import { NODE_ENV } from "@/config";
import JWTService from "@/lib/services/JWTService";

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
            return { message: "User Already exists", code: StatusCode.Conflict };
        } else {
            console.log(error);
            return { message: error.message ?? ERROR_DEFAULT };
        }
    }
};

export const validateUser = async (email: string, password: string): Promise<ErrorResponse | undefined> => {
    try {
        const user = await User.findOne({ email }).lean();
        if (!user) {
            return { message: "Invalid Credentials" };
        }

        const isPasswordValid = await bcrypt.compare(password,user.password!);
        if (!isPasswordValid) {
            return { message: "Invalid Credentials" };
        }

        const token = jwt.createToken(user._id, user.email!);

        (await cookies()).set("token", token, {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            path: "/",
            maxAge: 60 * 60 * 24 * 30
        });

    } catch (error: any) {
        console.log(error);
        return { message: error.message ?? ERROR_DEFAULT };
    }
};

