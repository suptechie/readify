import { NEXT_PUBLIC_API_URL } from '@/config';
import { cookies } from 'next/headers';

export const fetchWithToken = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    const token = (await cookies()).get("token")?.value;
    
    const headers = {
        ...init?.headers,
        Authorization: token ? `Bearer ${token}` : "",
    };

    const url = `${NEXT_PUBLIC_API_URL}${input}`;

    return fetch(url, {
        ...init,
        headers,
        credentials: 'include', 
    });
};
