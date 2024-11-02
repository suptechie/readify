import { NEXT_PUBLIC_API_URL } from '@/config';
import { IExtendedArticle } from '@/types/entities';
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
        throw new Error(error as string);
    }
};


export const fetchArticles = async (url: string = '/api/article') => {
    const response = await fetchWithToken(url);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch articles');
    }
    const data = await response.json();
    return data.articles as IExtendedArticle[];
};