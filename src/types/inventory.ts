import { ColorType } from "./color";
import { SizeType } from "./size";

export type InventoryType = {
  id?: number;
  color?: ColorType;
  size?: SizeType;
  price: number;
  quantity: number;
  isActive: boolean;
  isDelete: boolean;
  
}