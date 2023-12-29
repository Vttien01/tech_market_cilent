import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';
import './Product.scss';
import { formatMoney } from '@utils';

const Product = ({ product }) => {
    function truncateText(text, maxLength) {
        return text && text.length > maxLength ? text.slice(0, maxLength).replace(/(\s+\S+)$/, '...') : text;
    }

    return (
        <Link to={`/productdetail/${product?.id}`} key={product?.id}>
            <div className="product-item bg-white">
                <div className="category">{product?.categoryDto.name}</div>
                <div className="product-item-img">
                    <img className="img-cover" src={product?.image} alt={product.name} />
                </div>
                <div className="product-item-info fs-14">
                    <div className="brand">
                        <span>Brand: </span>
                        <span className="fw-7">{product?.brandDto?.name}</span>
                    </div>
                    <div className="title py-2">{truncateText(product?.name, 40)}</div>
                    <div className="price flex align-center justify-center">
                        {product?.discountedPrice ? (
                            <>
                                <span className="old-price" style={{ color:"#ff4d4f" }}>
                                    {formatMoney(
                                        product?.price,
                                        {
                                            groupSeparator: ',',
                                            decimalSeparator: '.',
                                            currentcy: 'đ',
                                            currentcyPosition: 'BACK',
                                            currentDecimal: '0',
                                        },
                                    )}
                                </span>
                                <span className="new-price">
                                    {formatMoney(
                                        product?.discountedPrice,
                                        {
                                            groupSeparator: ',',
                                            decimalSeparator: '.',
                                            currentcy: 'đ',
                                            currentcyPosition: 'BACK',
                                            currentDecimal: '0',
                                        },
                                    )}
                                </span>
                                {/* <span className="discount fw-6">({product?.saleOff}% Off)</span> */}
                            </>
                        ) : (
                            <span className="new-price">{formatMoney(
                                product?.price,
                                {
                                    groupSeparator: ',',
                                    decimalSeparator: '.',
                                    currentcy: 'đ',
                                    currentcyPosition: 'BACK',
                                    currentDecimal: '0',
                                },
                            )}</span>
                        )}
                        {/* <span className="discount fw-6">({product?.saleOff}% Off)</span> */}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Product;
