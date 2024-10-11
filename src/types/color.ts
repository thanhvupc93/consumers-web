import { InventoryType } from "./inventory";

export type ColorType = {
  id: number;
  title: string;
  value: string;
  inventories?: InventoryType;
  isActive: boolean;
  isDelete: boolean;
  countData: number;
}