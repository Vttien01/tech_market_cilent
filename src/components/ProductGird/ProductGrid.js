import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Button, Card, Col, Image, List, Row, Skeleton, Space, Typography } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Product from '@components/Product/Product';

const { Meta } = Card;
const countPerPage = 6;

const ProductGird = ({ products }) => {
    const [visibleItems, setVisibleItems] = useState(4);

    const onLoadMore = () => {
        setVisibleItems((prev) => prev + 4);
    };

    return (
        <div>
            <Row gutter={40}>
                {products.slice(0, visibleItems).map((item) => {
                    let discountedPrice = item.price - item.price * (item.saleOff / 100);
                    return (
                        <Col key={item.id} span={6} style={{ marginTop: 10 }}>
                            <Product key={item.id} product={{ ...item, discountedPrice }} />
                        </Col>
                    );
                })}
            </Row>

            {visibleItems < products.length && (
                <div style={{ textAlign: 'center', marginTop: 16, marginBottom:16 }}>
                    <Button onClick={onLoadMore}>Load More</Button>
                </div>
            )}
        </div>
    );
};

export default ProductGird;
