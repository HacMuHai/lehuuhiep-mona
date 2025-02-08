import {
  Col,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Space,
  Typography,
} from "antd";
import { mock_products } from "mocks/product.mock";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ListOrderLine from "./children/ListOrderLine";
import { IProduct } from "interfaces/product.interface";
import { useDebounce } from "use-debounce";
import CartItem from "./children/CartItem";
import CartTotal from "./children/CartTotal";
import { IOrder } from "interfaces/order.interface";
import ConfirmOrder from "./children/ConfirmOrder";
import { mock_vouchers } from "mocks/vourcher.mock";

const CreateOrderPage = () => {
  const [dataOrderLine, setDataOrderLine] = useState<IProduct[]>(mock_products);
  const [search, setSearch] = useState("");
  const [searchDeb] = useDebounce(search, 500);
  const [cart, setCart] = useState<IProduct[]>([]);
  const [order, setOrder] = useState<IOrder>({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setDataOrderLine(
      mock_products.filter((product) =>
        product.name.toLowerCase().includes(searchDeb.toLowerCase())
      )
    );
  }, [searchDeb]);

  const calcTotal = (cartNew: IProduct[]) => {
    return cartNew.reduce(
      (acc, item) =>
        acc +
        (item.price - (item.discount ? +item.discount : 0)) * item.quantity,
      0
    );
  };

  const updateCart = (product: IProduct) => {
    const cartNew = [...cart];
    const indexF = cart.findIndex((item) => item.id === product.id);

    if (indexF !== -1) cartNew[indexF].quantity += 1;
    else cartNew.push({ ...product, quantity: 1 });

    order.products = cartNew;
    setCart(cartNew);

    setOrder({ ...order, total: calcTotal(cartNew) });
  };

  const updateQuantity = (
    product: IProduct,
    value: number | undefined | null
  ) => {
    const cartNew = [...cart];
    const indexF = cart.findIndex((item) => item.id === product.id);
    if (indexF !== -1) {
      if (value === 0) cartNew.splice(indexF, 1);
      else cartNew[indexF].quantity = value || 1;
    }
    setCart(cartNew);
    setOrder({ ...order, total: calcTotal(cartNew) });
  };

  const updatePrice = (product: IProduct, value: number | undefined | null) => {
    const cartNew = [...cart];
    const indexF = cart.findIndex((item) => item.id === product.id);
    if (indexF !== -1) {
      cartNew[indexF].price = value || 1;
    }
    setCart(cartNew);
    setOrder({ ...order, total: calcTotal(cartNew) });
  };

  const updateDiscount = (product: IProduct, value: string) => {
    const cartNew = [...cart];
    const indexF = cart.findIndex((item) => item.id === product.id);

    const vourcher = mock_vouchers.filter(
      (voucher) => voucher.product_id === product.id && voucher.code == value
    );

    if (vourcher?.length > 0) {
      cartNew[indexF].discount =
        vourcher[0].type === "money"
          ? vourcher[0].value
          : ((cartNew[indexF].price * vourcher[0].value) / 100) *
            cartNew[indexF].quantity;
      cartNew[indexF].vourcher = vourcher[0];
    }
    setCart(cartNew);
    setOrder({ ...order, total: calcTotal(cartNew) });
  };

  const deleteProduct = (product: IProduct) => {
    const cartNew = [...cart];
    const indexF = cart.findIndex((item) => item.id === product.id);
    if (indexF !== -1) {
      cartNew.splice(indexF, 1);
    }
    setCart(cartNew);
    setOrder({ ...order, total: calcTotal(cartNew) });
  };

  return (
    <>
      <Flex className="h-screen bg-[#f0f2f5]">
        <Flex vertical className="w-3/5 px-10 py-5 pb-0 h-full">
          <Flex justify="space-between" className="border-b-2">
            <Typography.Title level={3}>Order Line</Typography.Title>
            <Input.Search
              className="w-64"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Flex>
          <ListOrderLine data={dataOrderLine} updateCart={updateCart} />
        </Flex>

        <Flex vertical className="w-2/5 h-full max-h-full">
          <CartItem
            data={cart}
            updateQuantity={updateQuantity}
            updatePrice={updatePrice}
            updateDiscount={updateDiscount}
            deleteProduct={deleteProduct}
          />

          <Flex className="h-max rounded-tl-lg shadow-lg bg-white mt-5">
            <Form
              labelCol={{ span: 6 }}
              labelAlign="left"
              className="h-full w-1/2 p-5"
            >
              <Typography.Title
                level={3}
                className="border-b-2 border-dashed pb-3"
              >
                Customer information
              </Typography.Title>
              <Form.Item label="Name" className="font-bold mb-3">
                <Input
                  placeholder="Name"
                  className="font-normal"
                  onChange={(e) => setOrder({ ...order, name: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="Phone" className="font-bold mb-3">
                <Input
                  placeholder="Phone"
                  className="font-normal"
                  onChange={(e) =>
                    setOrder({ ...order, phone: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Email" className="font-bold mb-3">
                <Input
                  placeholder="Email"
                  className="font-normal"
                  onChange={(e) =>
                    setOrder({ ...order, email: e.target.value })
                  }
                />
              </Form.Item>
            </Form>
            <Divider className="h-full !m-0" type="vertical" />
            <CartTotal
              data={cart}
              order={order}
              setOrder={setOrder}
              setIsModalVisible={setIsModalVisible}
            />
          </Flex>
        </Flex>
      </Flex>

      <ConfirmOrder
        isOpen={isModalVisible}
        setIsOpen={setIsModalVisible}
        order={order}
      />
    </>
  );
};

export default CreateOrderPage;
