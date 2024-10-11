import { InventoryType } from "./inventory";

export type SizeType = {
  id: number;
  title: string
  value: string
  inventories?: InventoryType;
  isActive: boolean;
  isDelete: boolean;
  count: number;
}