import { v4 as uuidv4 } from "uuid";

export const mock_products = Array.from({ length: 30 }, (_, i) => ({
  id: "product-" + i,
  name: `Hamburger ${i + 1}`,
  quantity: Math.floor(Math.random() * 100) + 1,
  price: Math.floor(Math.random() * 491) + 10,
}));
