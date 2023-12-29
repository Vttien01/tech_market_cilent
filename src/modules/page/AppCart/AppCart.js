/* eslint-disable indent */
import { ShoppingCartOutlined } from '@ant-design/icons';
import AutoCompleteField from '@components/common/form/AutoCompleteField';
import SelectField from '@components/common/form/SelectField';
import { paymentSelect } from '@constants';
import apiConfig from '@constants/apiConfig';
import useAuth from '@hooks/useAuth';
import useFetch from '@hooks/useFetch';
import useTranslate from '@hooks/useTranslate';
import routes from '@routes';
import { showErrorMessage, showSucsessMessage } from '@services/notifyService';
import { IconMinus, IconPlus, IconTrash } from '@tabler/icons-react';
import { formatMoney } from '@utils';
import {
    Badge,
    Button,
    Checkbox,
    Drawer,
    Form,
    Input,
    Table,
    Tag,
    Tooltip,
    Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { defineMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import './AppCart.scss';
const { Text } = Typography;

const decription = defineMessage({
    first: 'Kiểm tra số lượng sản phẩm',
    second: 'Thanh toán đơn hàng',
    third: 'Hoàn thành các bước',
});

const AppCart = () => {
    const { profile } = useAuth();
    const navigate = useNavigate();
    const translate = useTranslate();

    const [CartDrawer, setCartDrawer] = useState(false);
    const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);
    const [cartItem, setCartItem] = useState([]);
    const [total, setTotal] = useState(0);
    const [check, setCheck] = useState(false);

    const {
        data: cart,
        execute: getCartExcute,
        loading,
    } = useFetch({
        ...apiConfig.cart.getList,
    });

    const { data: order, execute: createOrderForGuest } = useFetch({
        ...apiConfig.order.create,
    });
    useEffect(() => {
        if (!profile) {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartItem(storedCart);
        } else {
            getCartExcute({
                onCompleted: (response) => {
                    const data = response.data.cartDetailDtos;
                    setCartItem(response.data.cartDetailDtos);
                },
                onError: () => {
                    // showErrorMessage('Không lấy được giả hàng!');
                    // form.resetFields();
                },
            });
        }
    }, []);

    const { execute: createTransaction } = useFetch({
        ...apiConfig.transaction.create,
    });

    const { execute: executeDeleteCart } = useFetch({
        ...apiConfig.cart.delete,
    });

    const handleDeleteCart = (id) => {
        executeDeleteCart({
            pathParams: { id: id },
            onCompleted: () => {
                setCheck(!check);
                // window.location.reload();
            },
        });
    };

    const removeFromCart = (productId) => {
        const updatedCart = cartItem.filter((item) => item.productVariantId !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        // setCartItem(updatedCart);
        setCheck(!check);
        console.log(1);
        // window.location.reload();
    };

    useEffect(() => {
        if (profile) {
            getCartExcute({
                onCompleted: (response) => {
                    // setCacheAccessToken(res.access_token);
                    // executeGetProfile();
                    const data = response.data.cartDetailDtos;
                    setCartItem(response.data.cartDetailDtos);
                },
                onError: () => {
                    // showErrorMessage('Không lấy được giả hàng!');
                    // form.resetFields();
                },
            });
        } else {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartItem(storedCart);
        }
    }, [check]);

    function onConfirmOrder(values) {
        let array2 = new Array(cartItem.length).fill(null);

        array2 = cartItem.map((item) => ({
            color: item.color,
            price: item.price,
            productName: item.productName,
            productVariantId: item.productVariantId,
            quantity: item.quantity,
        }));
        const updatedValues = {
            ...values,
            listOrderProduct: array2, // Thay yourListOrderProductArray bằng mảng thực tế của bạn
        };
        createOrderForGuest({
            data: { ...updatedValues },
            onCompleted: (respone) => {
                if (values.paymentMethod === 1) {
                    createTransaction({
                        data: {
                            orderId: respone.data.orderId,
                            urlCancel: 'http://localhost:3000/my-order-fail',
                            urlSuccess: 'http://localhost:3000/my-order-success',
                        },
                        onCompleted: (res) => {
                            window.location.href = res.data;
                            localStorage.removeItem('cart');
                            // setCheckoutDrawerOpen(false);
                            showSucsessMessage('Đặt hàng thành công');
                        },
                        onError: () => {
                            localStorage.removeItem('cart');
                            showErrorMessage('Thanh toán thất bại!');
                            setTimeout(() => {
                                window.location.reload();
                            }, 1800);
                        },
                    });
                } else {
                    localStorage.clear();
                    setCheckoutDrawerOpen(false);
                    showSucsessMessage('Đặt hàng thành công');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1800);
                }
            },
            onError: () => {
                showErrorMessage('Đặt hàng thất bại');
            },
        });
        // message.success('Đặt hàng thành công');
    }
    const [loadings, setLoadings] = useState([]);
    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 4000);
    };

    const QuantityComponent = ({ value, record }) => {
        const [isInitialRender, setIsInitialRender] = useState(true);
        const [quantity, setQuantity] = useState(record.quantity);
        const [triggerEffect, setTriggerEffect] = useState(false);
        const [updatedCart, setUpdatedCart] = useState({});
        const { execute: executeUpdateCart } = useFetch({
            ...apiConfig.cart.updateItemCart,
        });
        const increaseQty = () => {
            setQuantity((prevQty) => {
                setTriggerEffect(!triggerEffect);
                let tempQty = prevQty + 1;
                // if (tempQty > product?.totalInStock) tempQty = product?.totalInStock;
                return tempQty;
            });
        };

        const decreaseQty = () => {
            setQuantity((prevQty) => {
                setTriggerEffect(!triggerEffect);
                let tempQty = prevQty - 1;
                if (tempQty < 1) tempQty = 1;
                return tempQty;
            });
        };
        const updateCartItemById = (idToUpdate, newValues) => {
            setCartItem((prevCart) =>
                prevCart.map((item) => (item.id === idToUpdate ? { ...item, ...newValues } : item)),
            );
        };

        useEffect(() => {
            if (isInitialRender) {
                setIsInitialRender(false);
                return;
            }
            const updatedCart = {
                cartDetailId: record.cartDetailId,
                quantity: quantity,
                totalPriceSell: record.price * quantity,
            };
            // updateCartItemById(record.cartDetailId, updatedCart);
            // console.log(updatedCart);
            setUpdatedCart(updatedCart);
            console.log(1);
            executeUpdateCart({
                data: { ...updatedCart },
                onCompleted: (respone) => {
                    setCheck(!check);
                },
                onError: (error) => {
                    console.log(error);
                },
            });
        }, [triggerEffect]);

        console.log(updatedCart);

        return (
            <div className="qty flex align-center my-4">
                <div className="qty-change flex align-center mx-3">
                    <button
                        type="button"
                        className="qty-decrease flex align-center justify-center"
                        onClick={() => decreaseQty(record)}
                    >
                        <i className="fas fa-minus"></i>
                        <IconMinus />
                    </button>

                    <div className="qty-value flex align-center justify-center">
                        {/* {record.quantity > 5 && (
                <span style={{ color: 'red' }}>Quantity is greater than 5</span>
              )} */}
                        {quantity}
                    </div>

                    <button
                        type="button"
                        className="qty-increase flex align-center justify-center"
                        onClick={() => increaseQty(record)}
                    >
                        <i className="fas fa-plus"></i>
                        <IconPlus />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Badge
                onClick={() => {
                    setCartDrawer(true);
                }}
                count={cartItem?.length}
                className="ShopingCartIcon"
            >
                <ShoppingCartOutlined style={{ fontSize: 20 }} />
            </Badge>
            <Drawer
                open={CartDrawer}
                onClose={() => {
                    setCartDrawer(false);
                }}
                title="Giỏ hàng"
                contentWrapperStyle={{ width: 700 }}
            >
                {profile ? (
                    <Table
                        pagination={false}
                        columns={[
                            {
                                title: 'Tên sản phẩm',
                                dataIndex: 'productName',
                                align: 'center',
                                width: 200,
                            },
                            {
                                title: 'Màu sắc',
                                dataIndex: ['color'],
                                align: 'center',
                            },
                            {
                                title: 'Giá',
                                dataIndex: ['price'],
                                name: 'price',
                                align: 'center',
                                width: 150,
                                render: (value) => {
                                    return (
                                        <span>
                                            {formatMoney(value, {
                                                groupSeparator: ',',
                                                decimalSeparator: '.',
                                                currentcy: 'đ',
                                                currentcyPosition: 'BACK',
                                                currentDecimal: '0',
                                            })}
                                        </span>
                                    );
                                },
                            },
                            {
                                title: 'Số lượng',
                                dataIndex: 'quantity',
                                align: 'center',
                                width: 200,
                                render: (value, record) => <QuantityComponent value={value} record={record} />,
                            },
                            {
                                title: 'Tổng',
                                dataIndex: 'totalPriceSell',
                                width: 200,
                                align: 'center',
                                render: (value) => {
                                    return (
                                        <>
                                            {formatMoney(value, {
                                                groupSeparator: ',',
                                                decimalSeparator: '.',
                                                currentcy: 'đ',
                                                currentcyPosition: 'BACK',
                                                currentDecimal: '0',
                                            })}
                                        </>
                                    );
                                },
                            },
                            {
                                title: 'Hành động',
                                key: 'action',
                                align: 'center',
                                render: (_, record) => (
                                    <Tooltip title="Xóa giỏ hàng">
                                        <Button
                                            style={{
                                                padding: 3,
                                                display: 'table-cell',
                                                verticalAlign: 'middle',
                                                backgroundColor: '#e70d0d',
                                                fontWeight: 600,
                                                color: 'white',
                                                fontSize: 12,
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteCart(record.cartDetailId);
                                            }}
                                        >
                                            <IconTrash />
                                        </Button>
                                    </Tooltip>
                                ),
                            },
                        ]}
                        dataSource={cartItem}
                        summary={(data) => {
                            const total = data.reduce((pre, current) => {
                                return pre + current.totalPriceSell;
                            }, 0);
                            return (
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0} colSpan={4} align="end">
                                        <Tag color={'green'} style={{ fontSize: 18, fontWeight: 700 }}>
                                            Tổng trả
                                        </Tag>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}>
                                        <Text type="danger" style={{ fontWeight: 700 }}>
                                            {formatMoney(total, {
                                                groupSeparator: ',',
                                                decimalSeparator: '.',
                                                currentcy: 'đ',
                                                currentcyPosition: 'BACK',
                                                currentDecimal: '0',
                                            })}
                                        </Text>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            );
                        }}
                    ></Table>
                ) : (
                    <Table
                        pagination={false}
                        columns={[
                            {
                                title: 'Tên sản phẩm',
                                dataIndex: 'productName',
                                align: 'center',
                                width: 200,
                            },
                            {
                                title: 'Màu sắc',
                                dataIndex: 'color',
                                align: 'center',
                            },
                            {
                                title: 'Giá',
                                dataIndex: 'price',
                                name: 'price',
                                align: 'center',
                                width: 150,
                                render: (value) => {
                                    return (
                                        <span>
                                            {formatMoney(value, {
                                                groupSeparator: ',',
                                                decimalSeparator: '.',
                                                currentcy: 'đ',
                                                currentcyPosition: 'BACK',
                                                currentDecimal: '0',
                                            })}
                                        </span>
                                    );
                                },
                            },
                            {
                                title: 'Số lượng',
                                dataIndex: 'quantity',
                                align: 'center',
                            },
                            {
                                title: 'Tổng',
                                dataIndex: 'totalPriceSell',
                                width: 150,
                                align: 'center',
                                render: (value) => {
                                    return (
                                        <>
                                            {formatMoney(value, {
                                                groupSeparator: ',',
                                                decimalSeparator: '.',
                                                currentcy: 'đ',
                                                currentcyPosition: 'BACK',
                                                currentDecimal: '0',
                                            })}
                                        </>
                                    );
                                },
                            },
                            {
                                title: 'Hành động',
                                key: 'action',
                                align: 'center',
                                render: (_, record) => (
                                    <Tooltip title="Xóa giỏ hàng">
                                        <Button
                                            style={{
                                                padding: 3,
                                                display: 'table-cell',
                                                verticalAlign: 'middle',
                                                backgroundColor: '#e70d0d',
                                                fontWeight: 600,
                                                color: 'white',
                                                fontSize: 12,
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // handleDeleteCart(record.cartDetailId);
                                                removeFromCart(record.productVariantId);
                                                console.log(record);
                                            }}
                                        >
                                            <IconTrash />
                                        </Button>
                                    </Tooltip>
                                ),
                            },
                        ]}
                        dataSource={cartItem}
                        summary={(data) => {
                            const total = data.reduce((pre, current) => {
                                return pre + current.totalPriceSell;
                            }, 0);
                            return (
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0} colSpan={4} align="end">
                                        <Tag color={'green'} style={{ fontSize: 18, fontWeight: 700 }}>
                                            Tổng trả
                                        </Tag>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={1}>
                                        <Text type="danger" style={{ fontWeight: 700 }}>
                                            {formatMoney(total, {
                                                groupSeparator: ',',
                                                decimalSeparator: '.',
                                                currentcy: 'đ',
                                                currentcyPosition: 'BACK',
                                                currentDecimal: '0',
                                            })}
                                        </Text>
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            );
                        }}
                    ></Table>
                )}

                {cartItem?.length > 0 ? (
                    <Button
                        type="primary"
                        style={{ marginTop: 20 }}
                        onClick={() => {
                            profile ? navigate(routes.OderPage.path) : setCheckoutDrawerOpen(true);
                            setCartDrawer(false);
                        }}
                    >
                        Đặt hàng
                    </Button>
                ) : (
                    <Button
                        type="primary"
                        style={{ marginTop: 20 }}
                        onClick={() => {
                            navigate(routes.ProductHomePage1.path);
                            setCartDrawer(false);
                        }}
                    >
                        Thêm giỏ hàng
                    </Button>
                )}
            </Drawer>
            <Drawer
                open={checkoutDrawerOpen}
                onClose={() => {
                    setCheckoutDrawerOpen(false);
                }}
                title="Đặt hàng"
                contentWrapperStyle={{ width: 650 }}
            >
                <Form
                    onFinish={onConfirmOrder}
                    labelCol={{
                        span: 7,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    layout="horizontal"
                    style={{
                        maxWidth: 600,
                    }}
                >
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng điền tên',
                            },
                        ]}
                        label="Họ và tên"
                        name="receiver"
                        contentWrapperStyle={{ width: 200 }}
                    >
                        <Input placeholder="Nhập tên ..." />
                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: 'Vui lòng điền email',
                            },
                        ]}
                        label="Email"
                        name="email"
                    >
                        <Input placeholder="Nhập email ..." />
                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng điền địa chỉ',
                            },
                        ]}
                        label="Địa chỉ"
                        name="address"
                    >
                        <Input placeholder="Nhập địa chỉ ..." />
                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng điền số điện thoại',
                            },
                        ]}
                        label="Số điện thoại"
                        name="phone"
                    >
                        <Input placeholder="Nhập số điện thoại ..." />
                    </Form.Item>

                    <Form.Item label="Ghi chú" name="note">
                        <Input placeholder="Nhập ghi chú ..." />
                    </Form.Item>
                    <Form.Item labelAlign="right" label="Mã giảm giá" name="voucherId">
                        <Input placeholder="Nhập mã giảm giá ..." />
                    </Form.Item>
                    <AutoCompleteField
                        label="Tỉnh"
                        name="province"
                        apiConfig={apiConfig.nation.autocomplete}
                        mappingOptions={(item) => ({ value: item.name, label: item.name })}
                        initialSearchParams={{ kind: 1 }}
                        searchParams={(text) => ({ name: text, kind: 1 })}
                    />
                    <AutoCompleteField
                        label="Quận"
                        name="district"
                        apiConfig={apiConfig.nation.autocomplete}
                        mappingOptions={(item) => ({ value: item.name, label: item.name })}
                        initialSearchParams={{ kind: 2 }}
                        searchParams={(text) => ({ name: text, kind: 2 })}
                    />
                    <AutoCompleteField
                        label="Huyện"
                        name="ward"
                        apiConfig={apiConfig.nation.autocomplete}
                        mappingOptions={(item) => ({ value: item.name, label: item.name })}
                        initialSearchParams={{ kind: 3 }}
                        searchParams={(text) => ({ name: text, kind: 3 })}
                    />

                    <SelectField
                        name="paymentMethod"
                        label="Hình thức thanh toán"
                        allowClear={false}
                        options={paymentSelect}
                        required
                    />
                    <Form.Item>
                        <Checkbox defaultChecked disabled>
                            Cash on Delivery
                        </Checkbox>
                        <Typography.Paragraph type="secondary">More method coming soom</Typography.Paragraph>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={loadings[0]} onClick={() => enterLoading(0)}>
                        Xác nhận đơn hàng
                    </Button>
                </Form>
            </Drawer>
        </div>
    );
};

export default AppCart;
