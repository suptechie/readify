import connectDB from '@/lib/db/connectDB';
import Article from '@/lib/db/models/Article';
import { ErrorMessage, StatusCode } from '@/types';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
  params: Promise<{ id: string; }>;
};

connectDB();

export const GET = async (
  request: NextRequest,
  { params }: Props
) => {
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
        $addFields: {
          likeCount: { $size: "$likes" },
          userIds: {
            $map: {
              input: '$likes',
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
    ]))[0];

    if (!article) {
      return NextResponse.json(
        { error: ErrorMessage.NOT_FOUND },
        { status: StatusCode.NotFound }
      );
    }


    return NextResponse.json({ article }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : ErrorMessage.ERROR_DEFAULT;
    return NextResponse.json(
      { error: errorMessage },
      { status: StatusCode.InternalServerError }
    );
  }
};