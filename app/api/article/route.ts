import connectDB from "@/lib/db/connectDB";
import Article from "@/lib/db/models/Article";
import { getTokenDetailsServer } from "@/lib/utils/getTokenData";
import { ErrorMessage, StatusCode } from "@/types";
import { IExtendedArticle } from "@/types/entities";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from 'mongodb';
import Like from "@/lib/db/models/Like";

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

        return NextResponse.json(article);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : ErrorMessage.ERROR_DEFAULT;
        return NextResponse.json(
            { error: errorMessage },
            { status: StatusCode.InternalServerError }
        );
    }
};


export const GET = async (req: NextRequest) => {
    try {
        const tokenResult = await getTokenDetailsServer(req);
        if (!tokenResult.success || !tokenResult.data) {
            return NextResponse.json(
                { error: tokenResult.error?.message ?? ErrorMessage.UNAUTHORIZED },
                { status: tokenResult.error?.code ?? StatusCode.Unauthorized }
            );
        }

        const articles = await Article.aggregate([
            {
                $match: {
                    author: new ObjectId(tokenResult.data.id)
                }
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
};


export const PATCH = async (req: NextRequest) => {
    try {
        const tokenResult = await getTokenDetailsServer(req);
        if (!tokenResult.success || !tokenResult.data) {
            return NextResponse.json(
                { error: tokenResult.error?.message ?? ErrorMessage.UNAUTHORIZED },
                { status: tokenResult.error?.code ?? StatusCode.Unauthorized }
            );
        }

        const body = await req.json();

        if (!body.id) {
            return NextResponse.json(
                { error: "Article ID is required" },
                { status: StatusCode.BadRequest }
            );
        }

        const deleteResult = await Like.findOneAndDelete({ 
            article: body.id, 
            user: tokenResult.data.id 
        });

        if (!deleteResult) {
            await Like.create({ 
                article: body.id, 
                user: tokenResult.data.id 
            });

            return NextResponse.json({
                success: true,
                create: true
            });
        }

        return NextResponse.json({
            success: true,
            delete: true
        });

    } catch (error) {
        console.error("Like toggle error:", error);
        const errorMessage = error instanceof Error ? error.message : ErrorMessage.ERROR_DEFAULT;
        return NextResponse.json(
            { error: errorMessage },
            { status: StatusCode.InternalServerError }
        );
    }
};