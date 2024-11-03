import { ErrorMessage } from "@/types";
import { fetchWithToken } from "./fetchWithToken";

export const fetcher = (url: string) => fetchWithToken('/api/home').then(async res => {
    if (!res.ok) {
        throw new Error((await res.json()).error || ErrorMessage.ERROR_DEFAULT);
    }
    return await res.json();
});
