
export type PagingDto = {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export type ResponseCustom ={
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    paging: PagingDto | null;
    status: number;
    statusText: string;

}