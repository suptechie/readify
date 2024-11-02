import Article from "@/lib/db/models/Article";
import { ErrorMessage, StatusCode } from "@/types";
import { IExtendedArticle } from "@/types/entities";
import { NextResponse } from "next/server";

export const GET = async ()=>{
    try {

        const articles = await Article.aggregate([
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "article",
                    as: "likes"
                }
            },
            {
                $addFields: {
                    likeCount: { $size: "$likes" },
                    userIds: {
                        $map: {
                            input: "$likes",
                            as: "like",
                            in: { $toString: "$$like.user" }
                        }
                    }
                }
            },
            {
                $project: {
                    likes: 0
                }
            }
        ]) as IExtendedArticle[];

        return NextResponse.json({ articles });
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : ErrorMessage.ERROR_DEFAULT;
        return NextResponse.json(
            { error: errorMessage },
            { status: StatusCode.InternalServerError }
        );
    }
}