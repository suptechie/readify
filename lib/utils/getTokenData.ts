import { cookies } from "next/headers";
import JWTService from "../services/JWTService";
import { TokenPayload } from "@/types";
import { ErrorMessage, ErrorResponse, StatusCode } from "@/types";
import { NextRequest } from "next/server";

const jwt = new JWTService();

const getTokenData = async (): Promise<TokenPayload | null> => {
    const token = (await cookies()).get("token");
    if (!token) {
        return null;
    }

    const data = jwt.verifyToken(token.value);
    if ((data as TokenPayload).id) {
        return data as TokenPayload;
    } else {
        return null;
    }
};

export default getTokenData;


interface TokenDetails {
    success: boolean;
    data?: TokenPayload;
    error?: {
        message: string;
        code: number;
    };
}

export const getTokenDetailsServer = async (req:NextRequest): Promise<TokenDetails> => {
    try {
        const jwt = new JWTService();
        const token = (req.headers.get("Authorization")?.split('Bearer ')[1]);        

        if (!token) {
            return {
                success: false,
                error: {
                    message: ErrorMessage.UNAUTHORIZED,
                    code: StatusCode.Unauthorized
                }
            };
        }

        const data = jwt.verifyToken(token);

        if ('id' in data) {
            return {
                success: true,
                data: data as TokenPayload
            };
        } else {
            return {
                success: false,
                error: {
                    message: (data as ErrorResponse).message!,
                    code: (data as ErrorResponse).code!
                }
            };
        }
    } catch (error) {
        return {
            success: false,
            error: {
                message: ErrorMessage.UNAUTHORIZED,
                code: StatusCode.Unauthorized
            }
        };
    }
};
