import { Col, Flex, Modal, Row, Space, Typography } from "antd";
import { IOrder } from "interfaces/order.interface";
import React from "react";
import formatNumber from "utils/function";

interface IProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  order: IOrder;
}
const ConfirmOrder = (props: IProps) => {
  const { isOpen, setIsOpen, order } = props;
  return (
    <Modal
      title={<Typography.Title level={3}>Confirm Order</Typography.Title>}
      width={"50%"}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      onOk={() => setIsOpen(false)}
    >
      <Typography.Title level={4} className="border-t-2 border-dashed pt-2">
        Customer information
      </Typography.Title>
      <Flex justify="space-between">
        <Space>
          <Typography.Text className="font-bold">Name:</Typography.Text>
          <Typography.Text>{order.name}</Typography.Text>
        </Space>
        <Space>
          <Typography.Text className="font-bold">Phone:</Typography.Text>
          <Typography.Text>{order.phone}</Typography.Text>
        </Space>
        <Space>
          <Typography.Text className="font-bold">Email:</Typography.Text>
          <Typography.Text>{order.email}</Typography.Text>
        </Space>
      </Flex>

      <Typography.Title
        level={4}
        className="border-t-2 border-dashed pb-1 pt-3 mt-2 !mb-0"
      >
        CartItem
      </Typography.Title>
      <Row gutter={[16, 16]} className="w-full border-b-2 font-bold mt-0 pt-0">
        <Col span={5} className="text-left">
          Name
        </Col>
        <Col span={5} className="text-left">
          Quantity
        </Col>
        <Col span={5} className="text-left">
          Price
        </Col>
        <Col span={5} className="text-left">
          Discount
        </Col>
        <Col span={4} className="text-left">
          <p className="text-right">Total</p>
        </Col>
      </Row>
      <Col className="flex-grow pt-0 overflow-y-auto w-ful">
        {(order?.products || []).map((product) => (
          <Row
            key={product.id}
            gutter={[16, 16]}
            className="w-full pb-2 mt-0 mb-2 border-b-2 first:pt-2"
          >
            <Col span={5} className="text-left align-middle">
              {product.name}
            </Col>
            <Col span={5} className="text-left">
              {product.quantity}
            </Col>
            <Col span={5} className="text-left">
              {product.price}
            </Col>
            <Col span={5} className="text-left">
              {product.discount}
              {product?.vourcher
                ? product?.vourcher?.type == "percentage"
                  ? "(%)"
                  : "($)"
                : ""}
            </Col>
            <Col span={4} className="text-left">
              <p className="text-right">
                {product.price * product.quantity - (product?.discount || 0)}
              </p>
            </Col>
          </Row>
        ))}
      </Col>
      <Row justify={"end"} className="mr-3">
        <Col span={4} offset={16}>
          <Typography.Text className="font-bold !text-end">
            Total Price:
          </Typography.Text>
        </Col>
        <Col span={4}>
          <p className="text-right"> {formatNumber(order.total || 0)}</p>
        </Col>
      </Row>
      <Row justify={"end"} className="mr-3">
        <Col span={4} offset={16}>
          <Typography.Text className="font-bold !text-end">
            Customer Paid:
          </Typography.Text>
        </Col>
        <Col span={4}>
          <p className="text-right">{formatNumber(order.customerPaid || 0)}</p>
        </Col>
      </Row>
      <Row justify={"end"} className="mr-3">
        <Col span={4} offset={16}>
          <Typography.Text className="font-bold !text-end">
            Change:
          </Typography.Text>
        </Col>
        <Col span={4}>
          <p className="text-right">
            {formatNumber((order.customerPaid || 0) - (order.total || 0))}
          </p>
        </Col>
      </Row>
    </Modal>
  );
};

export default ConfirmOrder;
