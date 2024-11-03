import connectDB from "@/lib/db/connectDB";
import User from "@/lib/db/models/User";
import catchError from "@/lib/utils/catchError";
import { getTokenDetailsServer } from "@/lib/utils/getTokenData";
import { ErrorMessage, StatusCode } from "@/types";
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
        return  catchError(error);
    }
};


export async function GET(req: NextRequest) {
    try {
        const tokenResult = await getTokenDetailsServer(req);
        if (!tokenResult.success || !tokenResult.data) {
            return NextResponse.json(
                { error: tokenResult.error?.message },
                { status: tokenResult.error?.code }
            );
        };

        const user = await User.findById(tokenResult.data.id).select("-password").lean();

        if (!user) {
            return NextResponse.json(
                { error: ErrorMessage.NOT_FOUND },
                { status: StatusCode.NotFound }
            );
        };

        return NextResponse.json({ user });

    } catch (error) {
        return  catchError(error);
    }
}