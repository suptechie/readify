import connectDB from '@/lib/db/connectDB';
import Article from '@/lib/db/models/Article';
import catchError from '@/lib/utils/catchError';
import { ErrorMessage, StatusCode } from '@/types';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
  params: Promise<{ id: string; }>;
};

connectDB();

export const DELETE = async (req: NextRequest, { params }: Props) => {
  try {
    const id = (await params).id;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }

    

  } catch (error) {
    catchError(error);
  }
};

export const GET = async (req: NextRequest, { params }: Props) => {
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