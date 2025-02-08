import { ShoppingCartOutlined } from "@ant-design/icons";
import { Col, Flex, Grid, Image, Row, Space, Typography } from "antd";
import { Hamburger, Hamburger1, Hamburger2 } from "assets/imgs";
import { IProduct } from "interfaces/product.interface";
import React, { memo } from "react";

interface IProps {
  data: IProduct[];
  updateCart: (product: IProduct) => void;
}
const ListOrderLine = (props: IProps) => {
  const { data, updateCart } = props;
  return (
    <Row gutter={[16, 16]} className="max-h-full overflow-auto py-4">
      {data.map((product) => (
        <Col key={product.id} xs={24} sm={24} md={12} lg={8} className="h-max">
          <Space
            className="bg-white p-4 w-full rounded-lg"
            direction="vertical"
            size={2}
          >
            <Image
              width={"100%"}
              src={Hamburger2}
              className="rounded-lg"
              preview={false}
            />
            <Space className="w-full justify-between">
              <Typography.Title level={5} className="!mb-0">
                {product.name}
              </Typography.Title>
              <ShoppingCartOutlined
                className="bg-[#265c65] text-white rounded-full p-[6px] cursor-pointer"
                onClick={() => {
                  console.log("product", product);
                  updateCart(product);
                }}
              />
            </Space>
          </Space>
        </Col>
      ))}
    </Row>
  );
};

export default memo(ListOrderLine);
