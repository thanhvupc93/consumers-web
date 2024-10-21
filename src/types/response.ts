import { CategoryType } from "./category";
import { ProductType } from "./product";

export type PagingDto = {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export type ResponseCustom ={
    data: ProductType[] | CategoryType[] | ProductType[] |  ProductType| null;
    paging: PagingDto| null;
}