import { CategoryType } from "./category";
import { InventoryType } from "./inventory";

export type CartItemType = {
  id: number;
  image: string
  title: string
  type: string
  description: string;
  defaultPrice: number;
  inventories: InventoryType[];
  category?: CategoryType;
  isActive: boolean;
  isDelete: boolean;
  quantity: number;
}