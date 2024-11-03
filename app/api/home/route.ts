import connectDB from "@/lib/db/connectDB";
import Article from "@/lib/db/models/Article";
import catchError from "@/lib/utils/catchError";
import { ErrorMessage, StatusCode } from "@/types";
import { IExtendedArticle } from "@/types/entities";
import { NextResponse } from "next/server";

connectDB();

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
        catchError(error);
    }
}