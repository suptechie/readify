import { TOKEN_SECRET } from '@/config';
import { ErrorResponse, StatusCode, TokenPayload } from '@/types';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

export default class JWTService {
    createToken(id: string, image: string) {
        return jwt.sign({ id, image }, TOKEN_SECRET, {
            expiresIn: "30d"
        });
    }

    verifyToken(token: string): TokenPayload | ErrorResponse {
        try {
            return jwt.verify(token, TOKEN_SECRET) as TokenPayload;
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                return { message: "Token Expired", code: StatusCode.Unauthorized };
            } else {
                return { message: "Invalid Token", code: StatusCode.Forbidden };
            }
        }
    }
}