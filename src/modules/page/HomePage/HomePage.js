import banner2 from '@assets/images/HomePage/banner2.jpg';
import banner3 from '@assets/images/HomePage/banner3.jpg';
import banner4 from '@assets/images/HomePage/banner4.jpg';
import banner5 from '@assets/images/HomePage/slider-banner1.jpg';
import banner6 from '@assets/images/HomePage/slider-banner2.jpg';
import banner7 from '@assets/images/HomePage/slider-banner3.jpg';
import ProductGird from '@components/ProductGird/ProductGrid';
import ProductList from '@components/ProductList/ProductList';
import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';
import NavSiderCommon from '@modules/main/NavSiderCommon';
import { Carousel, Col, Image, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAllProduct, getProductsByCategory } from '../Components/API/index';
import './home.css';

window.onload = function () {};

const HomePage = () => {
    const [position, setPosition] = useState(' ');
    const contentStyle = {
        height: '250px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
        marginTop: 1,
        marginBottom: 0,
    };

    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => setCollapsed((prev) => !prev);
    const params = 'all-product';
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (params?.categoryId ? getProductsByCategory(params.categoryId) : getAllProduct()).then((res) => {
            setItems(res.products);
            setLoading(false);
        });
    }, [params]);

    const {
        data: products,
        loading: getCategorysLoading,
        execute: executeGetCategorys,
    } = useFetch(apiConfig.product.top10BestSellingt, {
        immediate: true,
    });
    const {
        data: allproducts,
        loading: allproductsLoading,
        execute: executgeallproducts,
    } = useFetch(apiConfig.product.autocomplete, {
        immediate: true,
        mappingData: ({ data }) => data,
    });

    const list = [];

    let catProductsOne = allproducts?.filter((product) => product?.categoryDto.name === 'Laptop') || [];
    let catProductsTwo = allproducts?.filter((product) => product?.categoryDto.name === 'Điện Thoại') || [];
    let catProductsThree = allproducts?.filter((product) => product?.categoryDto?.name === 'Phụ kiện') || [];
    let catProductsFour = allproducts?.filter((product) => product?.categoryDto?.name === 'Tai Nghe') || [];


    return (
        <div className="container">
            <div className="siderHome" >
                <NavSiderCommon collapsed={collapsed} onCollapse={toggleCollapsed} />
            </div>
            <div className="BannerHome" style={{ marginLeft:14 }}>
                <Row justify="space-around" align="middle" style={{ paddingTop: 0 }}>
                    <Col span={17}>
                        <Carousel autoplay>
                            <div>
                                <Image src={banner2} />
                            </div>
                            <div>
                                <Image src={banner3} />
                            </div>
                            <div>
                                <Image src={banner4} />
                            </div>
                        </Carousel>
                        <Space>
                            <Image src={banner5} style={{ height: '200px' }} />
                            <Image src={banner6} style={{ height: '200px' }} />
                        </Space>
                    </Col>
                    <Col span={7}>
                        <Image src={banner7} />
                    </Col>
                </Row>
            </div>
            <div className="contentFlask">
                <div className="main-content bg-whitesmoke">
                    <div>
                        <div className="categories py-0">
                            <div className="categories-item">
                                <div className="title-md">
                                    <h3>Sản phẩm bán chạy</h3>
                                </div>
                                {products && <ProductList products={products?.data} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contentTrend">
                <div className="main-content bg-whitesmoke">
                    <div>
                        <div className="categories py-0">
                            <div className="categories-item">
                                <div className="title-md">
                                    <h3>Điện thoại</h3>
                                </div>
                                {products && <ProductGird products={catProductsTwo} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contentProduct">
                <div className="main-content bg-whitesmoke">
                    <div>
                        <div className="categories py-0">
                            <div className="categories-item">
                                <div className="title-md">
                                    <h3>Laptop</h3>
                                </div>
                                {products && <ProductGird products={catProductsOne} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contentProudctBonus"></div>
        </div>
    );
};

export default HomePage;
