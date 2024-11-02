import { getTokenDetailsServer } from '@/lib/utils/getTokenData';
import { ErrorMessage, StatusCode } from '@/types';
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const POST = async (request: NextRequest) => {
  try {

    const tokenResult = await getTokenDetailsServer(request);
    if (!tokenResult.success || !tokenResult.data) {
      return NextResponse.json(
        { error: tokenResult.error?.message ?? ErrorMessage.UNAUTHORIZED },
        { status: tokenResult.error?.code ?? StatusCode.Unauthorized }
      );
    };

    const { folder  } = await request.json();

    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
      signature,
      timestamp,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder,
    });

  } catch (error) {
    console.error('[CLOUDINARY_UPLOAD_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
