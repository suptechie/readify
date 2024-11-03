import connectDB from "@/lib/db/connectDB";
import User from "@/lib/db/models/User";
import catchError from "@/lib/utils/catchError";
import { getTokenDetailsServer } from "@/lib/utils/getTokenData";
import { CustomError, ErrorMessage, StatusCode } from "@/types";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";


connectDB();

export const PUT = async (req: NextRequest) => {
    try {
        const data = await req.json();

        const user = await User.findByIdAndUpdate(data._id, data).select("-password");

        revalidatePath('/profile');

        return NextResponse.json({ user });

    } catch (error) {
        return catchError(error);
    }
};


export async function GET(req: NextRequest) {
    try {
        const tokenResult = await getTokenDetailsServer(req);
        if (!tokenResult.success || !tokenResult.data) {
            throw new CustomError(tokenResult.error?.message!, tokenResult.error?.code!);
        }
        
        const user = await User.findById(tokenResult.data.id).select("-password").lean();

        if (!user) {
            throw new CustomError(ErrorMessage.NOT_FOUND, StatusCode.NotFound);
        };

        return NextResponse.json({ user });

    } catch (error) {
        return catchError(error);
    }
}