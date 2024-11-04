import { InventoryType } from "./inventory";

export type OrderItemsType = {
  id?: number;
  quantity: number;
  price: number;
  inventories: InventoryType;
}