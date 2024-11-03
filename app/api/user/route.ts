import connectDB from "@/lib/db/connectDB";
import User from "@/lib/db/models/User";
import catchError from "@/lib/utils/catchError";
import { getTokenDetailsServer } from "@/lib/utils/getTokenData";
import { CustomError, ErrorMessage, StatusCode } from "@/types";
import { Genres } from "@/types/entities";
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


export const GET = async (req: NextRequest) => {
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
};

export const PATCH = async (req: NextRequest) => {
    try {
        const tokenResult = await getTokenDetailsServer(req);
        if (!tokenResult.success || !tokenResult.data) {
            throw new CustomError(tokenResult.error?.message!, tokenResult.error?.code!);
        }

        const preferences: Genres[] = await req.json();

        console.log(preferences);
        
        const genres = Object.values(Genres);

        preferences.forEach(el => {
            if (!genres.includes(el)) {
                throw new CustomError(`Invalid Preference: ${el}`, StatusCode.BadRequest);
            }
        });

        await User.findByIdAndUpdate(tokenResult.data.id, { preferences });

        return NextResponse.json({ message: "Preference has updated" });

    } catch (error) {
        return catchError(error);
    }
};