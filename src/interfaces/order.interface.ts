import { IProduct } from "./product.interface";

export interface IOrder {
  name?: string;
  phone?: string;
  email?: string;
  paymentMethod?: "cash" | "card";
  customerPaid?: number;
  products?: IProduct[];
  total?: number;
}
