import { cookies } from "next/headers";
import JWTService from "../services/JWTService";
import { TokenPayload } from "@/types";

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