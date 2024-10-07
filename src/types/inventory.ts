import { ColorType } from "./color";
import { SizeType } from "./size";

export type InventoryType = {
  id: number;
  color?: ColorType;
  size?: SizeType;
  value: number;
  price: number;
  isActive: boolean;
  isDelete: boolean;
  
}