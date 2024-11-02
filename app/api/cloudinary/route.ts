import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: Request) {
  try {
    // Add basic auth check if needed
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const { folder = 'default' } = await request.json();

    // Current timestamp
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Generate signature
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
        // Add any additional parameters you want to sign
        // resource_type: 'image',
        // allowed_formats: 'jpg,png,gif',
        // max_file_size: 10000000, // 10MB
      },
      process.env.CLOUDINARY_API_SECRET!
    );

    // Return the necessary data for client-side upload
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
}
