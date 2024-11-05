import { NEXT_PUBLIC_API_URL } from '@/config';
import { IExtendedArticle } from '@/types/entities';
import { cookies } from 'next/headers';
import getTokenData from '../utils/getTokenData';
import { TokenPayload } from '@/types';

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
    let error: Error | null = null;
    let token: TokenPayload | null = null;
    let articles: IExtendedArticle[] = [];
    let totalPages: number | null = null;

    try {
        token = await getTokenData() as TokenPayload;
        const response = await fetchWithToken(url, {
            cache: "no-cache"
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch articles');
        }
        const data = await response.json();
        articles = data.articles as IExtendedArticle[];
        totalPages = data.totalPages;
    } catch (e) {
        error = e instanceof Error ? e : new Error('An unexpected error occurred');
    }

    return {
        articles,
        error,
        token,
        totalPages
    };
};
export const fetchArticleDetails = async (id: string) => {
    const response = await fetchWithToken(`/api/article/${id}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch article Details");
    }
    const data = await response.json();
    return data.article as IExtendedArticle;
};