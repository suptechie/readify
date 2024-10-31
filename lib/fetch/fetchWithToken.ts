import { NEXT_PUBLIC_API_URL } from '@/config';
import { cookies } from 'next/headers';

export const fetchWithToken = async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
    try {
        const token = (await cookies()).get("token")?.value;

        const headers = {
            ...init?.headers,
            Authorization: token ? `Bearer ${token}` : "",
        };

        const url = `${NEXT_PUBLIC_API_URL}${input}`;

        return fetch(url, {
            ...init,
            headers,
            credentials: 'include'
        });

    } catch (error) {
        console.log('err', error);
        throw new Error(error as string)
    }
};
