import { CategoryType } from "./category";
import { ColorType } from "./color";
import { InventoryType } from "./inventory";
import { SizeType } from "./size";

export type ProductType = {
  id: number;
  image: string
  title: string
  type: string
  description: string;
  defaultPrice: number;
  inventories?: InventoryType[];
  colors?: ColorType[];
  category?: CategoryType;
  sizes?: SizeType[];
  isActive: boolean;
  isDelete: boolean;
  
}