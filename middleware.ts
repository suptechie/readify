import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import JWTService from './lib/services/JWTService';

const jwt = new JWTService();

export const middleware = async (request: NextRequest) => {
    const token = (await cookies()).get("token");

    if (token && jwt.verifyToken(token.value)) {
        return NextResponse.rewrite(new URL('/404', request.url));
    }
    

    return NextResponse.next();
};

export const config = {
    matcher: ['/login', '/register'],
};
