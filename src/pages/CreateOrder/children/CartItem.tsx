import { DeleteOutlined } from "@ant-design/icons";
import {
  Col,
  Divider,
  Flex,
  Input,
  InputNumber,
  Row,
  Space,
  Typography,
} from "antd";
import { IProduct } from "interfaces/product.interface";
import React from "react";

interface IProps {
  data: IProduct[];
  updateQuantity: (product: IProduct, value: number | undefined | null) => void;
  updatePrice: (product: IProduct, value: number | undefined | null) => void;
  updateDiscount: (product: IProduct, value: string) => void;
  deleteProduct: (product: IProduct) => void;
}

const CartItem = (props: IProps) => {
  const { data, updateQuantity, updateDiscount, updatePrice, deleteProduct } =
    props;
  return (
    <>
      <div className="bg-white p-5 pb-0">
        <Typography.Title level={3} className="border-b-2 border-dashed pb-3">
          Cart Item
        </Typography.Title>
        <Row gutter={[16, 16]} className="w-full border-b-2 font-bold">
          <Col span={6} className="text-left">
            Name
          </Col>
          <Col span={5} className="text-left">
            Quantity
          </Col>
          <Col span={5} className="text-left">
            Price
          </Col>
          <Col span={6} className="text-left">
            Discount
          </Col>
          <Col span={2}>
            <div />
          </Col>
        </Row>
      </div>
      <Col className="flex-grow p-5 pt-0 overflow-y-auto w-full bg-white rounded-bl-lg shadow-lg">
        {data.map((product) => (
          <Row
            key={product.id}
            gutter={[16, 16]}
            className="w-full pb-2 mt-0 mb-2 border-b-2 first:pt-2"
          >
            <Col span={6} className="text-left align-middle">
              {product.name}
            </Col>
            <Col span={5} className="text-left">
              <InputNumber
                min={1}
                value={product.quantity}
                size="small"
                onChange={(value) => updateQuantity(product, value)}
              />
            </Col>
            <Col span={5} className="text-left">
              <InputNumber
                min={1}
                size="small"
                value={product.price}
                onChange={(value) => updatePrice(product, value)}
              />
            </Col>
            <Col span={6} className="text-left">
              <Input
                size="small"
                onChange={(e) => updateDiscount(product, e.target.value)}
              />
            </Col>
            <Col span={2}>
              <DeleteOutlined
                className="text-red-400 cursor-pointer"
                onClick={() => deleteProduct(product)}
              />
            </Col>
          </Row>
        ))}
      </Col>
    </>
  );
};

export default CartItem;
