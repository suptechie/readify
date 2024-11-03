import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '@/config';
import catchError from '@/lib/utils/catchError';
import { getTokenDetailsServer } from '@/lib/utils/getTokenData';
import { ErrorMessage, StatusCode } from '@/types';
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

export const POST = async (request: NextRequest) => {
  try {

    const tokenResult = await getTokenDetailsServer(request);
    if (!tokenResult.success || !tokenResult.data) {
      return NextResponse.json(
        { error: tokenResult.error?.message },
        { status: tokenResult.error?.code }
      );
    };

    const { folder } = await request.json();

    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
      CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
      signature,
      timestamp,
      cloudName: CLOUDINARY_CLOUD_NAME,
      apiKey: CLOUDINARY_API_KEY,
      folder,
    });

  } catch (error) {
    catchError(error);
  }
};
