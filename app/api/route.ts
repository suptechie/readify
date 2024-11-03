import connectDB from "@/lib/db/connectDB";
import Article from "@/lib/db/models/Article";
import User from "@/lib/db/models/User";
import catchError from "@/lib/utils/catchError";
import { getTokenDetailsServer } from "@/lib/utils/getTokenData";
import { IExtendedArticle } from "@/types/entities";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export const GET = async (req: NextRequest) => {
    try {
        const tokenResult = await getTokenDetailsServer(req);
        const isUserAuthenticated: boolean = tokenResult.success || !!tokenResult.data;

        let articles = await Article.aggregate([
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

        if (isUserAuthenticated) {
            const user = await User.findById(tokenResult.data?.id).lean();
            
            if (user?.preferences?.length) {
                articles = articles.filter(article => 
                    article.genre && user.preferences!.includes(article.genre)
                );
            }
        }

        return NextResponse.json({ 
            success: true,
            articles,
            totalCount: articles.length
        });

    } catch (error) {
        return catchError(error);
    }
};