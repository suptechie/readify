import connectDB from '@/lib/db/connectDB';
import Article from '@/lib/db/models/Article';
import Like from '@/lib/db/models/Like';
import catchError from '@/lib/utils/catchError';
import { getTokenDetailsServer } from '@/lib/utils/getTokenData';
import { ErrorMessage, StatusCode } from '@/types';
import { ArticleDetailsProps } from '@/types/props';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';


connectDB();

export const PUT = async (req: NextRequest, { params }: ArticleDetailsProps) => {
  try {
    const id = (await params).id;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    const tokenResult = await getTokenDetailsServer(req);
    if (!tokenResult.success || !tokenResult.data) {
      return NextResponse.json(
        { error: tokenResult.error?.message },
        { status: tokenResult.error?.code }
      );
    };

    const body = await req.json();

    await Article.findByIdAndUpdate(id, body);

    revalidatePath(`/article/${id}`);

    return NextResponse.json(
      { message: "Article Updated" },
    );

  } catch (error) {
    catchError(error);
  }
};


export const DELETE = async (req: NextRequest, { params }: ArticleDetailsProps) => {
  try {
    const id = (await params).id;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    const tokenResult = await getTokenDetailsServer(req);
    if (!tokenResult.success || !tokenResult.data) {
      return NextResponse.json(
        { error: tokenResult.error?.message },
        { status: tokenResult.error?.code }
      );
    };

    await Article.findByIdAndDelete(id);

    await Like.deleteOne({ article: id });

    return NextResponse.json(
      { message: "Article deleted" },
    );

  } catch (error) {
    catchError(error);
  }
};




export const GET = async (req: NextRequest, { params }: ArticleDetailsProps) => {
  try {
    const id = (await params).id;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    const article = (await Article.aggregate([
      {
        $match: {
          _id: new ObjectId(id)
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
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author"
        }
      },
      {
        $addFields: {
          likeCount: { $size: "$likes" },
          userIds: {
            $map: {
              input: '$likes',
              as: "like",
              in: { $toString: "$$like.user" }
            }
          },
          authorImage: { $arrayElemAt: ["$author.image", 0] },
          authorUsername: { $arrayElemAt: ["$author.username", 0] }
        }
      },
      {
        $project: {
          likes: 0,
          author: 0
        }
      }
    ]))[0];

    if (!article) {
      return NextResponse.json(
        { error: ErrorMessage.NOT_FOUND },
        { status: StatusCode.NotFound }
      );
    }


    return NextResponse.json({ article }, { status: 200 });
  } catch (error) {
    catchError(error);
  }
};