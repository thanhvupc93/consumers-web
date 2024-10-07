import { ProductType } from "./product";

export type CategoryType = {
  id: string;
  image: string;
  title: string;
  type: string;
  isActive: boolean;
  isDelete: boolean;
  products: ProductType[];
}