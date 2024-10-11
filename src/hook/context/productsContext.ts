import { ProductSearchType } from "@/types/products_search";
import { createContext, useContext } from "react";

export const ProductsContext = createContext<ProductSearchType | undefined>(undefined);

export function useProductsContext(): ProductSearchType  {
    const productsContext = useContext(ProductsContext);
   
    if (productsContext === undefined) {
        throw new Error('useProductsContext must be use on ProductsContext');
    } 
    return productsContext;
}

