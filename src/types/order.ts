import { OrderItemsType } from "./orderItems";

export type OrderType = {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  userName: string;
  orderItems: OrderItemsType[];
}