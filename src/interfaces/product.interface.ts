import { IVoucher } from "./vourcher.interface";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  discount?: number;
  vourcher?: IVoucher;
}
