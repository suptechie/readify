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
        console.log('req', req.url);
        
        const tokenResult = await getTokenDetailsServer(req);
        const isUserAuthenticated: boolean = tokenResult.success || !!tokenResult.data;


        const { searchParams } = new URL(req.url);
        const page = Math.max(1, +(searchParams.get("page") || "1"));
        const limit = +(searchParams.get("limit") || "6");
        const skip = (page - 1) * limit;

        let query = {};
        
        if (isUserAuthenticated) {
            const user = await User.findById(tokenResult.data?.id).lean();
            if (user?.preferences?.length) {
                query = { genre: { $in: user.preferences } };
            }
        }

        const totalCount = await Article.countDocuments(query);

        const articles = await Article.aggregate([
            { $match: query },
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
            },
            { $skip: skip },
            { $limit: limit }
        ]) as IExtendedArticle[];

        return NextResponse.json({
            success: true,
            articles,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit)
        });

    } catch (error) {
        return catchError(error);
    }
};