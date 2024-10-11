import { ProductType } from "./product";

export type CategoryType = {
  id: number;
  image: string;
  title: string;
  type: string;
  isActive: boolean;
  isDelete: boolean;
  products: ProductType[];
}