import connectDB from "@/lib/db/connectDB";
import Article from "@/lib/db/models/Article";
import User from "@/lib/db/models/User";
import catchError from "@/lib/utils/catchError";
import { getTokenDetailsServer } from "@/lib/utils/getTokenData";
import { IExtendedArticle } from "@/types/entities";
import { NextRequest, NextResponse } from "next/server";
import { PipelineStage } from "mongoose";

connectDB();

export const GET = async (req: NextRequest) => {
    try {
        const tokenResult = await getTokenDetailsServer(req);
        const isUserAuthenticated: boolean = tokenResult.success || !!tokenResult.data;

        const { searchParams } = new URL(req.url);
        const page = Math.max(1, +(searchParams.get("page") || "1"));
        const limit = +(searchParams.get("limit") || "6");
        const skip = (page - 1) * limit;

        const search = searchParams.get("search");
        //eslint-disable-next-line
        let query: any = {};

        if (search) {
            const searchRegex = new RegExp(search.trim(), 'i');
            query = {
                $or: [
                    { title: { $regex: searchRegex } },
                    { tags: { $regex: searchRegex } }
                ]
            };
        }

        if (isUserAuthenticated && !search) {
            const user = await User.findById(tokenResult.data?.id).lean();
            if (user?.preferences?.length) {
                query = {
                    ...query,
                    genre: { $in: user.preferences }
                };
            }
        }

        const totalCount = await Article.countDocuments(query);

        const pipeline: PipelineStage[] = [
            { 
                $match: query 
            },
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
            }
        ];

        if (search) {
            pipeline.push({
                $addFields: {
                    searchScore: {
                        $add: [
                            {
                                $cond: {
                                    if: { 
                                        $regexMatch: { 
                                            input: "$title", 
                                            regex: search, 
                                            options: "i" 
                                        } 
                                    },
                                    then: 2,
                                    else: 0
                                }
                            },
                            {
                                $cond: {
                                    if: {
                                        $gt: [{
                                            $size: {
                                                $filter: {
                                                    input: "$tags",
                                                    cond: { 
                                                        $regexMatch: { 
                                                            input: "$$this", 
                                                            regex: search, 
                                                            options: "i" 
                                                        } 
                                                    }
                                                }
                                            }
                                        }, 0]
                                    },
                                    then: 1,
                                    else: 0
                                }
                            }
                        ]
                    }
                }
            });

            pipeline.push({ 
                $sort: { 
                    searchScore: -1 
                } 
            });
        }

        pipeline.push(
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    content: 1,
                    tags: 1,
                    genre: 1,
                    image:1,
                    author: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    likeCount: 1,
                    userIds: 1,
                     
                }
            },
            { $skip: skip },
            { $limit: limit }
        );

        const articles = await Article.aggregate(pipeline) as IExtendedArticle[];

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