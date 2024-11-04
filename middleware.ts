import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (request: NextRequest) => {
    const token = request.cookies.get("token");
    const urlPath = request.nextUrl.pathname;

    const isProtectedRoute = 
    urlPath === '/profile' || 
    urlPath === '/api/user' || 
    urlPath === '/api/cloudinary' ||
    urlPath.includes('/api/article');

    if (isProtectedRoute) {
        const isUnAuthorized = !token 

        if (isUnAuthorized) {
            if (urlPath.includes("/api")) {
                return NextResponse.next();
            }
            return NextResponse.rewrite(new URL('/404', request.url));
        }

        const response = NextResponse.next();
        response.headers.set("Authorization", `Bearer ${token.value}`);
        return response;
    }  else {
        if (token) {
            return NextResponse.rewrite(new URL('/404', request.url));
        }
        return NextResponse.next();
    }
};

export const config = {
    matcher: [
        '/login',
        '/register',
        '/profile',
        '/api/:path*'
    ],
};