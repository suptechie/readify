import connectDB from "@/lib/db/connectDB";
import Article from "@/lib/db/models/Article";
import { getTokenDetailsServer } from "@/lib/utils/getTokenData";
import { CustomError, StatusCode } from "@/types";
import { IExtendedArticle } from "@/types/entities";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from 'mongodb';
import Like from "@/lib/db/models/Like";
import catchError from "@/lib/utils/catchError";
import { revalidatePath } from "next/cache";

connectDB();


export const POST = async (req: NextRequest) => {
    try {
        const tokenResult = await getTokenDetailsServer(req);
        if (!tokenResult.success || !tokenResult.data) {
            throw new CustomError(tokenResult.error?.message!, tokenResult.error?.code!);
        }

        const data = await req.json();
        const tags = data.tags.split(" ");
        const article = await Article.create({ ...data, author: tokenResult.data.id, tags });

        return NextResponse.json(article);

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
        return catchError(error);
    }
};


export const PATCH = async (req: NextRequest) => {
    try {
        const tokenResult = await getTokenDetailsServer(req);
        if (!tokenResult.success || !tokenResult.data) {
            throw new CustomError(tokenResult.error?.message!, tokenResult.error?.code!);
        }

        const body = await req.json();

        if (!body.id) {
            throw new CustomError("Article Id is not provided", StatusCode.BadRequest);
        }

        revalidatePath('/home');
        revalidatePath('/articles');
        revalidatePath(`/articles/${body.id}`);

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
        return catchError(error);
    }
};