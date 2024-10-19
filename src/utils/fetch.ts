import { ResponseCustom } from "@/types/response";

export const fetchAPI = async (url: string, method: string, body: string | null) => {
    const token = sessionStorage.getItem('access_token');
    const option = {
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
    if (!response.ok) {
        throw new Error('Failed to fetch protected data');
    }
    const result = await response.json();
    const data: ResponseCustom = { data: result?.data, paging: result?.paging };
    return data;

}