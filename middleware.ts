import { NextRequest, NextResponse } from 'next/server';
import JWTService from './lib/services/JWTService';

const jwt = new JWTService();

export const middleware = async (request: NextRequest) => {
    const token = request.cookies.get("token");
    const urlPath = request.nextUrl.pathname;

    const isProtectedRoute = 
    urlPath === '/profile' || 
    urlPath === '/api/user' || 
    urlPath === '/api/cloudinary' ||
    urlPath.includes('/api/article');

    if (isProtectedRoute) {
        const isUnAuthorized = !token || !jwt.verifyToken(token.value);

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
        if (token && jwt.verifyToken(token.value)) {
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
        '/api/user',
        '/api/article', 
        '/api/article/:path*',
        '/api/cloudinary',
    ],
};