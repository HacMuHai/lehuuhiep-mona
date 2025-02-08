import { IVoucher } from "interfaces/vourcher.interface";

export const mock_vouchers: IVoucher[] = Array.from({ length: 30 }, (_, i) => ({
  code: "voucher-" + (i + 1),
  product_id: "product-" + (i % 30),
  type: i % 2 == 0 ? "percentage" : "money",
  value:
    i % 2 == 0
      ? Math.floor(Math.random() * 10) + 1
      : Math.floor(Math.random() * 100) + 1,
}));
