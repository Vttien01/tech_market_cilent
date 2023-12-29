/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '@components/common/layout/PageWrapper';
import apiConfig from '@constants/apiConfig';
import { paidValues, paymentOptions } from '@constants/masterData';
import useAuth from '@hooks/useAuth';
import useDisclosure from '@hooks/useDisclosure';
import useFetch from '@hooks/useFetch';
import useTranslate from '@hooks/useTranslate';
import routes from '@routes';
import {
    IconEdit,
} from '@tabler/icons-react';
import {
    Card,
    Form,
    Table,
    Tabs,
    Typography,
    theme,
} from 'antd';
import { defineMessage } from 'react-intl';
import ListDetailsForm from './ListDetailsForm';
const { Text } = Typography;
let index = 0;

const decription = defineMessage({
    first: 'Kiểm tra số lượng sản phẩm',
    second: 'Thanh toán đơn hàng',
    third: 'Hoàn thành các bước',
});

const EvaluatePage = () => {
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
            label: `Chưa đánh giá`,
            key: 1,
            children: <TableMyOrder stateValues={stateValues} state={1} />,
        },
        {
            label: `Đã đánh giá`,
            key: 2,
            children: <TableMyOrder stateValues={stateValues} state={2} />,
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
                routes={[
                    { breadcrumbName: 'Trang cá nhân', path:routes.PersonInfo.path },
                    { breadcrumbName: 'Đánh giá sản phẩm' },
                ]}
                // title={title}
                style={{ backgroundColor:'#282a36' }}
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


    const {
        data: myOrder,
        loading: loadingMyOrder,
        execute: executeMyOrder,
    } = useFetch(apiConfig.review.getUnratedProduct, {
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
        // executeDetailOrder({
        //     pathParams: { id: record.id },
        //     onCompleted: (response) => {
        //         setDetail(response.data);
        //         setDataOrder(record);
        //     },
        // });
        console.log(1);
    };

    const { execute: excuteCancelOrder } = useFetch({
        ...apiConfig.order.cancelMyOrder,
    });

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
                title: 'Người nhận',
                dataIndex: 'receiver',
                align: 'center',
            },
        ];


        return items;
    };

    return (
        <div>
            {/* <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal> */}
            <ListDetailsForm
                open={openedDetailsModal}
                onCancel={() => handlerDetailsModal.close()}
                form={form}
                detail={detail}
                isEditing={!!detail}
                state={state}
                dataOrder={dataOrder}
            />
            <Table
                pagination={true}
                onRow={(record, rowIndex) => ({
                    onClick: (e) => {
                        e.stopPropagation();
                        handleFetchDetail(record);
                        handlerDetailsModal.open();
                    },
                })}
                columns={itemHeader()}
                dataSource={myOrder}
                bordered
                style={{ cursor:'pointer' }}
            ></Table>
        </div>
    );
}

export default EvaluatePage;
