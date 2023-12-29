// CardProduct.js
import { formatMoney } from '@utils';
import { Badge, Card, Image, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const CardProduct = ({ product, index }) => {
    // console.log(product);
    return (
        // <Badge.Ribbon text={`${product.discountPercentage}% Off`} className="itemCardBadge" color="red">
        <Link to={`/productdetail/${product?.id}`} key={product?.id}>
            <Card
                className="itemCard"
                title={product.name}
                key={index}
                cover={<Image src={product.image} className="itemCardImage" />}
                actions={
                    [
                        // <Rate allowHalf disabled value={product.rating} />,
                        // <AddToCardButton item={product} />,
                    ]
                }
            >
                {product.saleOff !== 0 ? (
                    <Badge.Ribbon text={`${product.saleOff}% Off`} className="itemCardBadge" color="red">
                        <Card.Meta
                            title={
                                <Typography.Paragraph>
                                    Price:{' '}
                                    {formatMoney(product.price, {
                                        groupSeparator: ',',
                                        decimalSeparator: '.',
                                        currentcy: 'đ',
                                        currentcyPosition: 'BACK',
                                        currentDecimal: '0',
                                    })}{' '}
                                    {
                                        <Typography.Text delete type="danger">
                                            {formatMoney(
                                                parseFloat(
                                                    product.price + (product.price * product.saleOff) / 100,
                                                ).toFixed(2),
                                                {
                                                    groupSeparator: ',',
                                                    decimalSeparator: '.',
                                                    currentcy: 'đ',
                                                    currentcyPosition: 'BACK',
                                                    currentDecimal: '0',
                                                },
                                            )}
                                        </Typography.Text>
                                    }
                                </Typography.Paragraph>
                            }
                            description={
                                <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                                    {product.description}
                                </Typography.Paragraph>
                            }
                        />
                    </Badge.Ribbon>
                ) : (
                    <Card.Meta
                        title={
                            <Typography.Paragraph>
                                Price:{' '}
                                {formatMoney(product.price, {
                                    groupSeparator: ',',
                                    decimalSeparator: '.',
                                    currentcy: 'đ',
                                    currentcyPosition: 'BACK',
                                    currentDecimal: '0',
                                })}{' '}
                            </Typography.Paragraph>
                        }
                        description={
                            <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                                {product.description}
                            </Typography.Paragraph>
                        }
                    />
                )}
            </Card>
        </Link>
    );
};

export default CardProduct;
