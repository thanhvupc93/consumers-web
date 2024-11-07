import { FetchType } from "@/types/fetchType";
import { ResponseCustom } from "@/types/response";

export const fetchAPI = async (url: string, method: string, body: string | null) => {
    const token = localStorage.getItem('access_token');
    const option:FetchType = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };
    if (body) {
        option.body = body
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, option);
    if (!response.ok && response.status != 401) {
        throw new Error('Failed to fetch protected data');
    }
    if (response.status == 401) {
        const data: ResponseCustom = {
            status: response.status,
            statusText: response.statusText,
            data: undefined,
            paging: null
        }
        return data;
    }
    const result = await response.json();   
    const data: ResponseCustom = {
        data: result?.data || result,
        paging: result?.paging,
        status: 200,
        statusText: result?.message || "success"
    };
    return data;

}