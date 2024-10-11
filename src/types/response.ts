export type PagingDto = {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export class ResponseCustom {
    data: any;
    paging: PagingDto;

     constructor(data: any, paging: PagingDto) {
        this.data = data;
        this.paging = paging;
  }
}