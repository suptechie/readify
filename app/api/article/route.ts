import connectDB from "@/lib/db/connectDB";
import Article from "@/lib/db/models/Article";
import { getTokenDetailsServer } from "@/lib/utils/getTokenData";
import { ErrorMessage, StatusCode } from "@/types";
import { NextRequest, NextResponse } from "next/server";

connectDB();


export const POST = async (req: NextRequest) => {
    try {
        const tokenResult = await getTokenDetailsServer(req);
        if (!tokenResult.success || !tokenResult.data) {
            return NextResponse.json(
                { error: tokenResult.error?.message ?? ErrorMessage.UNAUTHORIZED },
                { status: tokenResult.error?.code ?? StatusCode.Unauthorized }
            );
        };

        const data = await req.json();
        const article = await Article.create({ ...data, author: tokenResult.data.id });

        return NextResponse.json({ article });

    } catch (error) {        
        const errorMessage = error instanceof Error ? error.message : ErrorMessage.ERROR_DEFAULT;
        return NextResponse.json(
            { error: errorMessage },
            { status: StatusCode.InternalServerError }
        );
    }
};