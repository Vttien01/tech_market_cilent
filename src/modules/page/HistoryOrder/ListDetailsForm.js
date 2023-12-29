import { StarFilled } from '@ant-design/icons';
import apiConfig from '@constants/apiConfig';
import { statusOptions } from '@constants/masterData';
import useDisclosure from '@hooks/useDisclosure';
import useFetch from '@hooks/useFetch';
import useTranslate from '@hooks/useTranslate';
import { showErrorMessage, showSucsessMessage } from '@services/notifyService';
import { formatMoney } from '@utils';
import { Avatar, Button, Card, List, Modal, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, defineMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import ReviewListModal from '../ReviewPage/ReviewListModal';

const messages = defineMessage({
    copyRight: '{brandName} - © Copyright {year}. All Rights Reserved',
    loginFail: 'Chưa điền đủ các trường thông tin!!!',
    login: 'Đăng nhập',
});

const ListDetailsForm = ({ open, onCancel, detail, form, isEditing, orderId, state, dataOrder }) => {
    const [openReviewModal, handlersReviewModal] = useDisclosure(false);
    const [checkList, setCheckArray] = useState(false);
    const [skipFirstSubmit, setSkipFirstSubmit] = useState(true);
    const translate = useTranslate();
    const statusValues = translate.formatKeys(statusOptions, ['label']);
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState(null);
    const { execute: executeUpdate } = useFetch(apiConfig.address.update);
    const { execute: createTransaction, loading } = useFetch({
        ...apiConfig.transaction.create,
    });
    const [tableData, setTableData] = useState([]);
    const isPaid = dataOrder?.isPaid;
    const paymentMethod = dataOrder?.paymentMethod;


    // Kiểm tra xem itemCart có tồn tại không trước khi sử dụng map
    const [newArray, setnewArray] = useState([]);
    const [orderDetailId, setOrderDetailId] = useState(null);

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    const [province, setProvince] = useState(null);
    const [district, setDistrict] = useState(null);
    const [checkReivew,setCheckReview] = useState(true);


    const onChange = (id, item) => {
        form.setFieldValue('provinceId', item);
    };

    useEffect(() => {
        if (province !== null) {
            setDistrict(null);
        }
    }, [province]);

    useEffect(() => {
        if (skipFirstSubmit) {
            setSkipFirstSubmit(false);
            return;
        }
        setnewArray((prevArray) => prevArray.filter((item) => item.quantity !== 0));
        setCheckArray(false);
    }, [checkList]);
    const handleFinish = () => {
        createTransaction({
            data: {
                orderId: orderId,
                urlCancel: 'http://localhost:3000/my-order-fail',
                urlSuccess: 'http://localhost:3000/my-order-success',
            },
            onCompleted: (res) => {
                window.location.href = res.data;
                showSucsessMessage('Đơn hàng đang được xử lý!');
            },
            onError: () => {
                showErrorMessage('Thanh toán PAYPAL thất bại');
            },
        });
    };

    const { data: dataListReview, loading:dataListLoading, execute: listReview } = useFetch(
        apiConfig.review.getByProduct,
        { immediate: false,
            mappingData: ({ data }) => data.content,
        });

    const getListReview = (id) => {
        listReview({
            pathParams: {
                id : id,
            },
        });
    };
    const { data: starData,loading:starDataLoading, execute: starReview } = useFetch(
        apiConfig.review.starListReview,
        { immediate: false,
            mappingData: ({ data }) => data.content,
        });

    const getStarReview = (id) => {
        starReview({
            pathParams: {
                productId : id,
            },
        });
    };


    return (
        <Modal
            title={<FormattedMessage defaultMessage="Chi tiết đơn hàng" />}
            open={open}
            width={700}
            onCancel={onCancel}
            // onOk={handleFinish}
            // okText="Tiến hành thanh toán"
            // cancelText="Xóa đơn hàng"
            footer={[
                state === 1 && (
                    <Button key="cancel" onClick={onCancel}>
                        Đóng
                    </Button>
                ),
                state === 1 && paymentMethod === 1 && !isPaid && (
                    <Button key="ok" type="primary" onClick={handleFinish}>
                        Tiến hành thanh toán
                    </Button>
                ),
                state === 3 && <Button key="buyAgain">Mua lại</Button>,
            ]}
        >
            <Card>
                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={detail.content}
                    style={{ marginBottom: 10 }}
                    renderItem={(item) => (
                        <Card style={{ backgroundColor: '#eff0f1', marginTop: 10 }}>
                            <List.Item key={item?.id}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item?.image} size={100} alt="" />}
                                    title={
                                        <a href="https://ant.design" style={{ fontSize: 25 }}>
                                            {item?.name}
                                        </a>
                                    }
                                    // description={item?.price}
                                    description={
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <div style={{ flex: '1', justifyContent: 'center' }}>
                                                Số lượng: {item.amount}
                                            </div>
                                            <div style={{ flex: '1', justifyContent: 'center' }}>Màu: {item.color}</div>
                                            <div style={{ flex: '1', justifyContent: 'center', fontSize: 20 }}>
                                                {' '}
                                                Tổng tiền:{' '}
                                                {formatMoney(item?.price, {
                                                    groupSeparator: ',',
                                                    decimalSeparator: '.',
                                                    currentcy: 'đ',
                                                    currentcyPosition: 'BACK',
                                                    currentDecimal: '0',
                                                })}
                                            </div>
                                        </div>
                                    }
                                />
                                <div>
                                    { state === 4 &&  (<Tooltip title="Đánh giá sản phẩm">
                                        <StarFilled
                                            style={{ fontSize: 45, color: '#fbfb00', cursor: 'pointer' }}
                                            onClick={(e) => {
                                                getListReview(item?.productId);
                                                getStarReview(item?.productId);
                                                setOrderDetailId(item?.id);
                                                e.stopPropagation();
                                                handlersReviewModal.open();
                                            }}
                                        />
                                    </Tooltip>)}
                                </div>
                            </List.Item>
                        </Card>
                    )}
                />
            </Card>
            <ReviewListModal
                open={openReviewModal}
                onCancel={() => handlersReviewModal.close()}
                data={dataListReview || {}}
                // courseId = {courseId}
                orderDetailId={orderDetailId}
                star={starData}
                // loading={dataListLoading || starDataLoading || loadingData}
                width={800}
                checkReivew={checkReivew}
            />
        </Modal>
    );
};

export default ListDetailsForm;
