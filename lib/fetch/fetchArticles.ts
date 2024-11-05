import { NEXT_PUBLIC_API_URL } from "@/config";
import { IExtendedArticle } from "@/types/entities";

export const fetchData = async (
  page: number, 
  limit: number, 
  search: string
): Promise<{ articles: IExtendedArticle[]; totalPages: number; }> => {
    try {
        const apiUrl = `${NEXT_PUBLIC_API_URL}/api?page=${page}&limit=${limit}&search=${search}`;
       
        const response = await fetch(apiUrl, {
            cache: "no-cache"
        });

        if (response.status === 401) {
            throw new Error('Session expired. Please login again.');
        }

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error ${response.status}: ${errorMessage}`);
        }

        const data = await response.json();
        return {
            articles: data.articles as IExtendedArticle[],
            totalPages: data.totalPages,
        };
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return { articles: [], totalPages: 0 };
    }
}