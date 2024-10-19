import { CategoryType } from "./category"
import { ProductType } from "./product"

export type  HomeContextType = {
    allCategory: CategoryType[] | null,
    allProduct : ProductType[]| null,
}