/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './OrderPage.scss';
// import { fetchAsyncProductSingle, getProductSingle, getSingleProductStatus } from '../../store/productSlice';
// import { addToCart, getCartMessageStatus, setCartMessageOff, setCartMessageOn } from '../../store/cartSlice';
// import CartMessage from '../../components/CartMessage/CartMessage';
import { DeleteOutlined } from '@ant-design/icons';
import PageWrapper from '@components/common/layout/PageWrapper';
import { DATE_FORMAT_VALUE, DEFAULT_FORMAT } from '@constants';
import apiConfig from '@constants/apiConfig';
import { paidValues, paymentOptions } from '@constants/masterData';
import useAuth from '@hooks/useAuth';
import useDisclosure from '@hooks/useDisclosure';
import useFetch from '@hooks/useFetch';
import useTranslate from '@hooks/useTranslate';
import {
    IconEdit,
} from '@tabler/icons-react';
import { convertUtcToLocalTime, formatMoney } from '@utils';
import {
    Card,
    Form,
    Modal,
    Table,
    Tabs,
    Tag,
    Tooltip,
    theme,
} from 'antd';
import { defineMessage } from 'react-intl';
import ListDetailsForm from './ListDetailsForm';

const decription = defineMessage({
    first: 'Kiểm tra số lượng sản phẩm',
    second: 'Thanh toán đơn hàng',
    third: 'Hoàn thành các bước',
});

const HistoryOrderPage = () => {
    const { profile } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryParameters = new URLSearchParams(window.location.search);
    const [openedDetailsModal, handlerDetailsModal] = useDisclosure(false);
    const [form] = Form.useForm();
    const translate = useTranslate();
    const [item1, setItem1] = useState(null);
    const stateValues = translate.formatKeys(paymentOptions, ['label']);
    const onSearch = (value, _e, info) => {
        <TableMyOrder search={value} />;
    };
    const renderTitle = (title, item) => (
        <span>
            {title}
            <a
                style={{
                    float: 'right',
                }}
                onClick={() => handleEdit(item)}
            >
                <IconEdit size={17} />
            </a>
        </span>
    );

    const handleEdit = (item) => {
        setItem1(item);
        handlerDetailsModal.open();
    };

    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const [quantity, setQuantity] = useState(1);

    const steps = [
        {
            label: `Đang Xử Lý`,
            key: 1,
            children: <TableMyOrder stateValues={stateValues} state={1} />,
        },
        {
            label: `Đã được duyệt`,
            key: 2,
            children: <TableMyOrder stateValues={stateValues} state={2} />,
        },
        {
            label: `Hoàn Thành`,
            key: 3,
            children: <TableMyOrder stateValues={stateValues} state={4} />,
        },
        {
            label: `Đã Hủy`,
            key: 4,
            children: <TableMyOrder stateValues={stateValues} state={3} />,
        },
    ];
    const items = steps.map((item) => ({
        label: item.label,
        key: item.key,
        children: item.children,
    }));
    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
        width: 1100,
    };

    return (
        <div
            className="con1 py-4 bg-whitesmoke"
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                // height: '100vh',
                marginLeft: 150,
                marginRight: 150,
            }}
        >
            <PageWrapper
                routes={[{ breadcrumbName: 'Lịch sử đơn hàng' }]}
                // title={title}
                style={{ backgroundColor: '#282a36' }}
            ></PageWrapper>
            <div style={{ flex: '1', justifyContent: 'center', minHeight: 600 }}>
                <Card style={{ minHeight: 600, backgroundColor: '#d8dadd' }}>
                    <Tabs defaultActiveKey="1" centered size="large" items={items} style={{ marginBottom: 20 }} />
                </Card>
            </div>
        </div>
    );
};

function TableMyOrder({ stateValues, state, search }) {
    const translate = useTranslate();
    const [form] = Form.useForm();
    const [openedDetailsModal, handlerDetailsModal] = useDisclosure(false);
    const [detail, setDetail] = useState([]);
    const [check, setCheck] = useState(false);
    const [dataOrder, setDataOrder] = useState({});
    // const [state, setState] = useState(null);
    const isPaidValues = translate.formatKeys(paidValues, ['label']);
    const [orderId, setOrderId] = useState(null);

    const {
        data: myOrder,
        loading: loadingMyOrder,
        execute: executeMyOrder,
    } = useFetch(apiConfig.order.myOrder, {
        immediate: true,
        mappingData: ({ data }) => data.content,
        params: { state: state },
    });

    // const {
    //     execute: executeDetailOrder,
    // } = useFetch(apiConfig.orderDetail.getByOrder, {
    //     immediate: true,
    // });
    const { execute: executeDetailOrder } = useFetch({
        ...apiConfig.orderDetail.getByOrder,
    });

    const handleFetchDetail = (record) => {
        executeDetailOrder({
            pathParams: { id: record.id },
            onCompleted: (response) => {
                setDetail(response.data);
                setDataOrder(record);
            },
            // onError: mixinFuncs.handleGetDetailError,
        });
    };

    const { execute: excuteCancelOrder } = useFetch({
        ...apiConfig.order.cancelMyOrder,
    });

    const showDeleteItemConfirm = (id) => {
        // if (!apiConfig.delete) throw new Error('apiConfig.delete is not defined');
        console.log(id);
        Modal.confirm({
            title: 'Hủy đơn hàng',
            content: 'Bạn có chắc muốn hủy đơn hàng?',
            okText: 'Xác nhận',
            cancelText: 'Đóng',
            centered: true,
            onOk: () => {
                handleCancelOrder(id);
            },
        });
    };

    const handleCancelOrder = (id) => {
        excuteCancelOrder({
            data: { id: id, state: 3 },
            onCompleted: (response) => {
                setCheck(!check);
            },
            // onError: mixinFuncs.handleGetDetailError,
        });
    };
    useEffect(() => {
        executeMyOrder();
    }, [check]);

    const itemHeader = () => {
        const items = [
            {
                title: 'Mã đơn hàng',
                dataIndex: 'orderCode',
                align: 'center',
            },
            {
                title: 'Ngày đặt',
                dataIndex: 'createdDate',
                align: 'center',
                with:200,
                render: (createdDate) => {
                    const result = convertUtcToLocalTime(createdDate, DEFAULT_FORMAT, DATE_FORMAT_VALUE);
                    return <div>{result}</div>;
                },
            },
            {
                title: 'Người nhận',
                dataIndex: 'receiver',
                align: 'center',
            },
            {
                title: 'Phương thức thanh toán',
                dataIndex: 'paymentMethod',
                align: 'center',
                width: 120,
                render(dataRow) {
                    const state = stateValues.find((item) => item.value == dataRow);
                    return (
                        <Tag color={state.color} style={{ width: 65, display: 'flex', justifyContent: 'center' }}>
                            <div style={{ padding: '0 4px', fontSize: 14 }}>{state.label}</div>
                        </Tag>
                    );
                },
            },
            {
                title: 'Trạng thái thanh toán',
                dataIndex: 'isPaid',
                align: 'center',
                width: 120,
                render(dataRow) {
                    const state = isPaidValues.find((item) => item.value == dataRow);
                    return (
                        <Tag color={state.color} style={{ width: 110, display: 'flex', justifyContent: 'center' }}>
                            <div style={{ padding: '0 4px', fontSize: 14 }}>{state.label}</div>
                        </Tag>
                    );
                },
            },
            {
                title: 'Tổng tiền',
                dataIndex: ['totalMoney'],
                name: 'totalMoney',
                align: 'center',
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
        ];
        if (state === 1) {
            items.push({
                title: 'Hành động',
                key: 'action',
                align: 'center',
                render: (_, record) => (
                    // <Popconfirm
                    //     title="Hủy đơn hàng"
                    //     description="Bạn có chắc muốn hủy đơn hàng này?"
                    //     onConfirm={(e) => {
                    //         e.stopPropagation();
                    //         showDeleteItemConfirm(record.id);
                    //     }}
                    //     // onCancel={cancel}
                    //     okText="Xóa"
                    //     cancelText="Hủy"
                    // >
                    //     <Button
                    //         style={{
                    //             padding: 3,
                    //             display: 'table-cell',
                    //             verticalAlign: 'middle',
                    //             backgroundColor: '#e70d0d',
                    //             fontWeight: 600,
                    //             color: 'white',
                    //             fontSize: 12,
                    //         }}
                    //         onClick={(e) => {
                    //             e.stopPropagation();
                    //             // handleCancelOrder(record.id);
                    //         }}
                    //     >
                    //         HỦY ĐƠN HÀNG
                    //     </Button>
                    <Tooltip title="Xóa đơn hàng">
                        <DeleteOutlined
                            style={{ color: 'red', fontSize: 20 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                showDeleteItemConfirm(record.id);
                            }}
                            // disabled={true}
                        />
                    </Tooltip>
                ),
            });
        }
        if (state === 2) {
            items.push(
                {
                    title: 'Ngày dự kiến giao hàng',
                    dataIndex: 'expectedDeliveryDate',
                    align: 'center',
                    width:200,
                    render: (expectedDeliveryDate) => {
                        const result = convertUtcToLocalTime(expectedDeliveryDate, DEFAULT_FORMAT, DATE_FORMAT_VALUE);
                        return <div>{result}</div>;
                    },
                },
            );
        }
        return items;
    };



    return (
        <div>
            <ListDetailsForm
                open={openedDetailsModal}
                onCancel={() => handlerDetailsModal.close()}
                form={form}
                detail={detail}
                isEditing={!!detail}
                state={state}
                dataOrder={dataOrder}
                orderId={orderId}
            />
         <Table
                pagination={true}
                onRow={(record, rowIndex) => ({
                    onClick: (e) => {
                        setOrderId(record.id);
                        e.stopPropagation();
                        handleFetchDetail(record);
                        handlerDetailsModal.open();
                    },
                })}
                columns={itemHeader()}
                dataSource={myOrder}
                bordered
                style={{ cursor: 'pointer' }}
            ></Table>
        </div>
    );
}

export default HistoryOrderPage;
