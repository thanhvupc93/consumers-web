import { CategoryType } from "@/types/category";
import { HomeContextType } from "@/types/homeContext";
import { ProductType } from "@/types/product";
import { createContext, useContext } from "react";

export const HomeContext = createContext<HomeContextType | undefined>(undefined);

export function useAllCategoryHomeContex(): CategoryType[]  {
    const homeContext = useContext(HomeContext);
    if (homeContext === undefined) {
        throw new Error('allCategoryHomeContex must be use on HomeContext');
    }
    return homeContext.allCategory;
}

export function useAllProductHomeContex(): ProductType[]  {
    const homeContext = useContext(HomeContext);
    if (homeContext === undefined) {
        throw new Error('useAllProductHomeContex must be use on HomeContext');
    }
    return homeContext.allProduct;
}