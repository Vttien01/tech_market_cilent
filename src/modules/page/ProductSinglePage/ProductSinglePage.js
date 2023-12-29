/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import './ProductSinglePage.scss';
// import { fetchAsyncProductSingle, getProductSingle, getSingleProductStatus } from '../../store/productSlice';
// import { addToCart, getCartMessageStatus, setCartMessageOff, setCartMessageOn } from '../../store/cartSlice';
// import CartMessage from '../../components/CartMessage/CartMessage';
import { ArrowDownOutlined, StarFilled, UserOutlined } from '@ant-design/icons';
import AvatarField from '@components/common/form/AvatarField';
import PageWrapper from '@components/common/layout/PageWrapper';
import { DEFAULT_FORMAT } from '@constants';
import apiConfig from '@constants/apiConfig';
import useDisclosure from '@hooks/useDisclosure';
import useFetch from '@hooks/useFetch';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { convertUtcToLocalTime, formatMoney } from '@utils';
import { Button, Card, Col, Form, Progress, Rate, Row, Space, Spin, Typography } from 'antd';
import ListDetailsForm from './ListDetailsForm';
import styles from './ReviewModal.module.scss';

const ProductSinglePage = () => {
    const { id } = useParams();
    const { pathname: pagePath } = useLocation();
    const [visibleItems, setVisibleItems] = useState(10);
    // console.log(pagePath);
    // console.log(id);
    const dispatch = useDispatch();
    const queryParameters = new URLSearchParams(window.location.search);
    const [detail, setDetail] = useState([]);
    const [openedDetailsModal, handlerDetailsModal] = useDisclosure(false);
    const [form] = Form.useForm();
    const maxLines = 7;
    // const productId = queryParameters.get('productId');
    // const productId = useParams();

    // const product = useSelector(getProductSingle);
    // const productSingleStatus = useSelector(getSingleProductStatus);
    // const cartMessageStatus = useSelector(getCartMessageStatus);
    const [quantity, setQuantity] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const {
        data: product,
        loading: allproductsLoading,
        execute: executgeallproducts,
    } = useFetch(apiConfig.product.getProductAutocomplete, {
        immediate: true,
        pathParams: { id },
        mappingData: ({ data }) => data,
    });
    useEffect(() => {
        if (product?.length > 0) setDetail(product);
        else setDetail([]);
    }, [product]);

    useEffect(() => {
        executgeallproducts({
            pathParams: { id },
            onCompleted: (res) => {
                // setCacheAccessToken(res.access_token);
                // executeGetProfile();
                // window.location.reload();
                setDetail(res.data);
                console.log(res.data);
            },
            onError: (error) => {
                // showErrorMessage(translate.formatMessage(message.loginFail));
                // form.resetFields();
                console.log(error);
            },
        });
    }, [id]);

    // getting single product
    // useEffect(() => {
    //     dispatch(fetchAsyncProductSingle(id));

    //     if (cartMessageStatus) {
    //         setTimeout(() => {
    //             dispatch(setCartMessageOff());
    //         }, 2000);
    //     }
    // }, [cartMessageStatus]);

    let discountedPrice;
    if (product?.saleOff) {
        discountedPrice = product?.price - product?.price * (product?.saleOff / 100);
    } else {
        discountedPrice = 0;
    }
    // if (productSingleStatus === STATUS.LOADING) {
    //     return <Loading />;
    // }

    const increaseQty = () => {
        setQuantity((prevQty) => {
            let tempQty = prevQty + 1;
            if (tempQty > product?.totalInStock) tempQty = product?.totalInStock;
            return tempQty;
        });
    };

    const decreaseQty = () => {
        setQuantity((prevQty) => {
            let tempQty = prevQty - 1;
            if (tempQty < 1) tempQty = 1;
            return tempQty;
        });
    };

    const {
        data: dataListReview,
        loading: dataListLoading,
        execute: listReview,
    } = useFetch(apiConfig.review.getByProduct, {
        immediate: true,
        pathParams: {
            id: id,
        },
        mappingData: ({ data }) => data.content,
    });

    const getListReview = (id) => {
        listReview({
            pathParams: {
                id: id,
            },
        });
    };
    const {
        data: starData,
        loading: starDataLoading,
        execute: starReview,
    } = useFetch(apiConfig.review.starListReview, {
        immediate: true,
        pathParams: {
            productId: id,
        },
        mappingData: ({ data }) => data.content,
    });

    const getStarReview = (id) => {
        starReview({
            pathParams: {
                productId: id,
            },
        });
    };

    useEffect(() => {
        listReview();
        starReview();
    }, []);

    let totalStars = 0;
    let totalRatings = 0;
    const ratingCount = Array(5).fill(0);

    starData?.forEach((item) => {
        totalStars += item.star * item.amount;
        totalRatings += item.amount;

        if (item.star >= 1 && item.star <= 5) {
            ratingCount[item.star - 1] += item.amount;
        }
    });
    const averageRating = totalRatings > 0 ? totalStars / totalRatings : 0;
    const ratingPercentages = ratingCount.map((count) =>
        totalRatings > 0 ? Math.floor((count / totalRatings) * 100) : 0,
    );

    const dataToShow = dataListReview?.length > 0 ? dataListReview.slice(0, visibleItems) : dataListReview;

    const handleShowMore = () => {
        setIsLoadingMore(true);
        setTimeout(() => {
            setVisibleItems(visibleItems + 10);
            setIsLoadingMore(false);
        }, 150);
    };
    useEffect(() => {
        if (!open) {
            setVisibleItems(10);
        }
    }, [open]);

    return (
        <div className="con1 py-4 bg-whitesmoke" style={{ display: 'flex', justifyContent: 'center' }}>
            <PageWrapper
                routes={[
                    { breadcrumbName: 'Sản phẩm' },
                ]}
            >
                <ListDetailsForm
                    open={openedDetailsModal}
                    onCancel={() => handlerDetailsModal.close()}
                    form={form}
                    itemCart={product?.listProductVariant}
                    quantity={quantity}
                    saleOff={product?.saleOff !== 0 ? product?.saleOff : 0}
                    nameProduct={product?.name}
                />
                <Space direction="vertical">
                    <Space size={'large'} style={{ alignItems: 'center' }}>
                        <div className="product-single-l">
                            <div className="product-img">
                                <div className="product-img-zoom">
                                    <img
                                        src={product ? (product?.image ? product?.image : '') : ''}
                                        alt=""
                                        className="img-cover"
                                    />
                                </div>

                                <div className="product-img-thumbs flex align-center my-2">
                                    <div className="thumb-item">
                                        <img
                                            src={product ? (product?.image ? product?.image : '') : ''}
                                            alt=""
                                            className="img-cover"
                                        />
                                    </div>
                                    {product?.listProductVariant[0]?.image && (
                                        <div className="thumb-item">
                                            <img
                                                src={
                                                    product
                                                        ? product?.image
                                                            ? product?.listProductVariant[0]?.image
                                                            : ''
                                                        : ''
                                                }
                                                alt=""
                                                className="img-cover"
                                            />
                                        </div>
                                    )}
                                    {product?.listProductVariant[1]?.image && (
                                        <div className="thumb-item">
                                            <img
                                                src={
                                                    product
                                                        ? product?.image
                                                            ? product?.listProductVariant[1]?.image
                                                            : ''
                                                        : ''
                                                }
                                                alt=""
                                                className="img-cover"
                                            />
                                        </div>
                                    )}
                                    {product?.listProductVariant[2]?.image && (
                                        <div className="thumb-item">
                                            <img
                                                src={
                                                    product
                                                        ? product?.image
                                                            ? product?.listProductVariant[2]?.image
                                                            : ''
                                                        : ''
                                                }
                                                alt=""
                                                className="img-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="product-single-r">
                            <div className="product-details font-manrope">
                                <div className="title fs-20 fw-5">{product?.name}</div>
                                <div>
                                    <p className="para fw-3 fs-15">{product?.description}</p>
                                </div>
                                <div className="info flex align-center flex-wrap fs-14">
                                    <div className="rating">
                                        <span className="text-orange fw-5">Đánh giá:</span>
                                        {/* <span className="mx-1">{product?.rating}</span> */}
                                    </div>
                                    <div className="vert-line"></div>
                                    <div className="brand">
                                        <span className="text-orange fw-5">Thương hiệu:</span>
                                        <span className="mx-1">{product?.brandDto.name}</span>
                                    </div>
                                    <div className="vert-line"></div>
                                    <div className="brand">
                                        <span className="text-orange fw-5">Loại:</span>
                                        <span className="mx-1 text-capitalize">
                                            {product?.categoryDto.name
                                                ? product?.categoryDto.name.replace('-', ' ')
                                                : ''}
                                        </span>
                                    </div>
                                </div>
                                {discountedPrice !== 0 ? (
                                    <div className="price">
                                        <div className="flex align-center">
                                            <div className="old-price text-gray">
                                                {formatMoney(product?.price, {
                                                    groupSeparator: ',',
                                                    decimalSeparator: '.',
                                                    currentcy: 'đ',
                                                    currentcyPosition: 'BACK',
                                                    currentDecimal: '0',
                                                })}
                                            </div>
                                            <span className="fs-14 mx-2 text-dark">Bao gồm tất cả các loại thuế</span>
                                        </div>

                                        <div className="flex align-center my-1">
                                            <div className="new-price fw-5 font-poppins fs-24 text-orange">
                                                {formatMoney(discountedPrice, {
                                                    groupSeparator: ',',
                                                    decimalSeparator: '.',
                                                    currentcy: 'đ',
                                                    currentcyPosition: 'BACK',
                                                    currentDecimal: '0',
                                                })}
                                            </div>
                                            <div className="discount bg-orange fs-13 text-white fw-6 font-poppins">
                                                {product?.saleOff}% OFF
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="price">
                                        <div className="flex align-center my-1">
                                            <div className="new-price fw-5 font-poppins fs-24 text-orange">
                                                {formatMoney(product?.price, {
                                                    groupSeparator: ',',
                                                    decimalSeparator: '.',
                                                    currentcy: 'đ',
                                                    currentcyPosition: 'BACK',
                                                    currentDecimal: '0',
                                                })}
                                            </div>
                                            <span className="fs-14 mx-2 text-dark">Bao gồm tất cả các loại thuế</span>
                                        </div>
                                    </div>
                                )}

                                <div className="qty flex align-center my-4">
                                    <div className="qty-text">Quantity:</div>
                                    <div className="qty-change flex align-center mx-3">
                                        <button
                                            type="button"
                                            className="qty-decrease flex align-center justify-center"
                                            onClick={() => decreaseQty()}
                                        >
                                            <i className="fas fa-minus"></i>
                                            <IconMinus />
                                        </button>
                                        <div className="qty-value flex align-center justify-center">{quantity}</div>
                                        <button
                                            type="button"
                                            className="qty-increase flex align-center justify-center"
                                            onClick={() => increaseQty()}
                                        >
                                            <i className="fas fa-plus"></i>
                                            <IconPlus />
                                        </button>
                                    </div>
                                    {product?.stock === 0 ? (
                                        <div className="qty-error text-uppercase bg-danger text-white fs-12 ls-1 mx-2 fw-5">
                                            out of stock
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>

                                <div className="btns">
                                    {/* {product && <AddToCardButton onClick={() => AddToCardButton(product?.listProductVariant[0], quantity)} />} */}
                                    <button type="button" className="add-to-cart-btn btn">
                                        <i className="fas fa-shopping-cart"></i>
                                        <span
                                            className="btn-text mx-2"
                                            onClick={() => {
                                                handlerDetailsModal.open();
                                            }}
                                        >
                                            Thêm giỏ hàng
                                        </span>
                                    </button>
                                    <button type="button" className="buy-now btn mx-3">
                                        <span className="btn-text">Mua ngay</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Space>
                    <Space size={'large'} style={{ alignItems: 'center', minHeight: 200 }}>
                        <Card style={{ backgroundColor: '#ffffff', minWidth: 1200 }}>
                            <Spin spinning={isLoadingMore}>
                                <div className={styles.modalReview}>
                                    <div
                                        style={{
                                            marginBottom: '10px',
                                            borderBottom: '1px solid #ddd',
                                            paddingBottom: '20px',
                                        }}
                                    >
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Row>
                                                    <Col span={24} align="center">
                                                        <Typography.Title style={{ color: '#e6e600' }}>
                                                            Đánh giá sản phẩm
                                                        </Typography.Title>

                                                        <h3
                                                            style={{
                                                                marginBottom: '10px',
                                                                fontSize: '30px',
                                                                color: '#1890FF',
                                                            }}
                                                        >
                                                            {averageRating}
                                                        </h3>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={24} align="center">
                                                        <Rate disabled allowHalf value={averageRating} />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <>
                                                    <Row>
                                                        <Col
                                                            span={24}
                                                            style={{ display: 'flex', alignItems: 'center' }}
                                                        >
                                                            <span style={{ marginRight: '8px' }}>5</span>
                                                            <StarFilled
                                                                style={{ color: '#FFD700', marginRight: '8px' }}
                                                            />
                                                            <Progress
                                                                strokeColor={'#FFD700'}
                                                                percent={ratingPercentages[4]}
                                                                style={{ flex: 1 }}
                                                            />
                                                        </Col>
                                                        <Col
                                                            span={24}
                                                            style={{ display: 'flex', alignItems: 'center' }}
                                                        >
                                                            <span style={{ marginRight: '8px' }}>4</span>
                                                            <StarFilled
                                                                style={{ color: '#FFD700', marginRight: '8px' }}
                                                            />
                                                            <Progress
                                                                strokeColor={'#FFD700'}
                                                                percent={ratingPercentages[3]}
                                                                style={{ flex: 1 }}
                                                            />
                                                        </Col>
                                                        <Col
                                                            span={24}
                                                            style={{ display: 'flex', alignItems: 'center' }}
                                                        >
                                                            <span style={{ marginRight: '8px' }}>3</span>
                                                            <StarFilled
                                                                style={{ color: '#FFD700', marginRight: '8px' }}
                                                            />
                                                            <Progress
                                                                strokeColor={'#FFD700'}
                                                                percent={ratingPercentages[2]}
                                                                style={{ flex: 1 }}
                                                            />
                                                        </Col>
                                                        <Col
                                                            span={24}
                                                            style={{ display: 'flex', alignItems: 'center' }}
                                                        >
                                                            <span style={{ marginRight: '8px' }}>2</span>
                                                            <StarFilled
                                                                style={{ color: '#FFD700', marginRight: '8px' }}
                                                            />
                                                            <Progress
                                                                strokeColor={'#FFD700'}
                                                                percent={ratingPercentages[1]}
                                                                style={{ flex: 1 }}
                                                            />
                                                        </Col>
                                                        <Col
                                                            span={24}
                                                            style={{ display: 'flex', alignItems: 'center' }}
                                                        >
                                                            <span style={{ marginRight: '8px' }}>1</span>
                                                            <StarFilled
                                                                style={{ color: '#FFD700', marginRight: '8px' }}
                                                            />
                                                            <Progress
                                                                strokeColor={'#FFD700'}
                                                                percent={ratingPercentages[0]}
                                                                style={{ flex: 1 }}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </>
                                            </Col>
                                        </Row>
                                    </div>
                                    <>
                                        <Row>
                                            <span
                                                style={{
                                                    color: '#1890FF',
                                                    fontSize: '16px',
                                                    marginLeft: '8px',
                                                    marginBottom: '10px',
                                                }}
                                            >
                                                Danh sách đánh giá ({totalRatings} Review)
                                            </span>
                                        </Row>
                                        <div>
                                            {dataToShow?.length > 0
                                                ? dataToShow?.map((item, index) => (
                                                      <Row
                                                          gutter={16}
                                                          key={index}
                                                          style={{
                                                              border: '1px solid #ddd',
                                                              borderRadius: '6px',
                                                              padding: '6px',
                                                              margin: '0px 8px 14px 8px',
                                                          }}
                                                      >
                                                          <Col span={2} align="center" justify="center">
                                                              <AvatarField
                                                                  size="large"
                                                                  icon={<UserOutlined />}
                                                                  src={
                                                                      item?.userDto?.accountAutoCompleteDto?.avatarPath
                                                                  }
                                                              />
                                                          </Col>
                                                          <Col span={17}>
                                                              <div style={{ fontWeight: '500', fontSize: '16px' }}>
                                                                  {item?.userDto?.accountAutoCompleteDto?.fullName}
                                                              </div>
                                                              <Row>
                                                                  <span>{item.message}</span>
                                                              </Row>
                                                              <Row>
                                                                  <span>
                                                                      {convertUtcToLocalTime(
                                                                          item.createdDate,
                                                                          DEFAULT_FORMAT,
                                                                          DEFAULT_FORMAT,
                                                                      )}
                                                                  </span>
                                                              </Row>
                                                          </Col>
                                                          <Col span={5} style={{ textAlign: 'right' }}>
                                                              <Rate
                                                                  disabled
                                                                  defaultValue={item?.star}
                                                                  style={{ fontSize: '14px' }}
                                                              />
                                                          </Col>
                                                      </Row>
                                                  ))
                                                : ''}
                                            {visibleItems < dataToShow?.length && (
                                                <Col align="center">
                                                    <Button
                                                        className={styles.btnAdd}
                                                        type="text"
                                                        onClick={handleShowMore}
                                                    >
                                                        <ArrowDownOutlined />
                                                        Xem thêm
                                                    </Button>
                                                </Col>
                                            )}
                                        </div>
                                    </>
                                </div>
                            </Spin>
                        </Card>
                    </Space>
                </Space>
            </PageWrapper>
        </div>
    );
};

function AddToCardButton({ itemCart, quantity }) {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Lấy giỏ hàng từ localStorage khi component được render
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
        calculateTotal(storedCart);
    }, []);

    useEffect(() => {
        // Lưu giỏ hàng vào localStorage khi giỏ hàng thay đổi
        localStorage.setItem('cart', JSON.stringify(cart));
        calculateTotal(cart);
    }, [cart]);

    const calculateTotal = (cartItems) => {
        const newTotal = cartItems.reduce((acc, item) => acc + item.price, 0);
        setTotal(newTotal);
    };

    const addToCart = (product) => {
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng lên
            const updatedCart = cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item?.quantity + product.quantity } : item,
            );
            setCart(updatedCart);
        } else {
            // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
            setCart([...cart, { ...product }]);
        }
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
    };
    // const {
    //     data: addcard,
    //     loading: addCardLoading,
    //     execute: executeAddCard,
    // } = useFetch(apiConfig.cart.add, {
    //     immediate: true,
    //     params: { productVariantId:item, quantity:quantity },
    //     mappingData: ({ data }) => data,
    // });
    const AddProducttoCard = () => {
        // Lấy tất cả cookies
        // Gọi API và thêm cookie vào headers
        // executeAddCard({
        //     headers: {
        //         Cookie: allCookies,
        //     },
        // })
    };

    // return (
    //     <button type="button" className="add-to-cart-btn btn">
    //         <i className="fas fa-shopping-cart"></i>
    //         <span
    //             className="btn-text mx-2"
    //             onClick={() => {
    //                 addToCart(itemCart);
    //             }}
    //         >
    //             add to cart
    //         </span>
    //     </button>
    // );
}

export default ProductSinglePage;
