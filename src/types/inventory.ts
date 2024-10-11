import { ColorType } from "./color";
import { SizeType } from "./size";

export type InventoryType = {
  length: number;
  id: number;
  color?: ColorType;
  size?: SizeType;
  value: number;
  price: number;
  quantity: number;
  isActive: boolean;
  isDelete: boolean;
  
}