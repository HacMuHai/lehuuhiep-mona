export interface IVoucher {
  code: string;
  type: "percentage" | "money";
  value: number;
  product_id: string;
}
