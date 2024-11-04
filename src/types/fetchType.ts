
export type FetchType = {
    method: string;
    headers: {
        'Content-Type': string,
        Authorization: string
    };
    body?: string;
}