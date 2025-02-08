import { CreditCardOutlined, MoneyCollectOutlined } from "@ant-design/icons";
import { Button, Input, Space, Typography } from "antd";
import { IOrder } from "interfaces/order.interface";
import { IProduct } from "interfaces/product.interface";
import React from "react";

interface IProps {
  data: IProduct[];
  order: IOrder;
  setOrder: (order: IOrder) => void;
  setIsModalVisible: (value: boolean) => void;
}

const CartTotal = (props: IProps) => {
  const { data, order, setOrder, setIsModalVisible } = props;
  return (
    <div className="h-full w-1/2 p-5">
      <Typography.Title level={3} className="border-b-2 border-dashed pb-3">
        Cart Total
      </Typography.Title>
      <Space className="w-full justify-between">
        <span>Items ({data?.length})</span>
        <span>{order?.total}</span>
      </Space>
      <Space>
        <Typography.Text>Payment Method</Typography.Text>
        <Button
          icon={<MoneyCollectOutlined />}
          iconPosition="start"
          className={
            order.paymentMethod !== "card"
              ? "border-[#4773eb] text-[#4773eb]"
              : ""
          }
          onClick={() => {
            setOrder({
              ...order,
              paymentMethod: "cash",
            });
          }}
        >
          Cash
        </Button>
        <Button
          icon={<CreditCardOutlined />}
          iconPosition="start"
          className={
            order.paymentMethod == "card"
              ? "border-[#4773eb] text-[#4773eb]"
              : ""
          }
          onClick={() => {
            setOrder({ ...order, paymentMethod: "card" });
          }}
        >
          Card
        </Button>
      </Space>
      <Input
        placeholder="Customer Pay"
        className="font-normal"
        disabled={order?.paymentMethod == "card"}
        value={order?.customerPaid}
        onChange={(e) =>
          setOrder({ ...order, customerPaid: parseFloat(e.target.value) })
        }
      />
      <Button
        className="w-full mt-5"
        type="primary"
        onClick={() => {
          setIsModalVisible(true);
          console.log("Order", order);
        }}
      >
        Create Order
      </Button>
    </div>
  );
};

export default CartTotal;
