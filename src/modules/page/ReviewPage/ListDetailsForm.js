import apiConfig from '@constants/apiConfig';
import { statusOptions } from '@constants/masterData';
import useAuth from '@hooks/useAuth';
import useFetch from '@hooks/useFetch';
import useTranslate from '@hooks/useTranslate';
import { showErrorMessage, showSucsessMessage } from '@services/notifyService';
import { formatMoney } from '@utils';
import { Avatar, Button, Card, List, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, defineMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const messages = defineMessage({
    copyRight: '{brandName} - © Copyright {year}. All Rights Reserved',
    loginFail: 'Chưa điền đủ các trường thông tin!!!',
    login: 'Đăng nhập',
});

const ListDetailsForm = ({ open, onCancel, detail, form, isEditing, orderId, state, dataOrder }) => {
    const [checkList, setCheckArray] = useState(false);
    const [skipFirstSubmit, setSkipFirstSubmit] = useState(true);
    const translate = useTranslate();
    const { execute: createTransaction, loading } = useFetch({
        ...apiConfig.transaction.create,
    });
    const [tableData, setTableData] = useState([]);
    const isPaid = dataOrder.isPaid;
    const paymentMethod = dataOrder.paymentMethod;

    console.log(isPaid);

    console.log(dataOrder);

    // Kiểm tra xem itemCart có tồn tại không trước khi sử dụng map
    const [newArray, setnewArray] = useState([]);
    const [newArray1, setnewArray1] = useState([]);

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    const [province, setProvince] = useState(null);
    const [district, setDistrict] = useState(null);

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
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            },
        });
    };

    const isOkButtonDisabled = true;

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
                ( state === 1 && paymentMethod===1 && !isPaid ) && (<Button
                    key="ok"
                    type="primary"
                    onClick={handleFinish}
                >
                    Tiến hành thanh toán
                </Button>),
                state === 3 && (
                    <Button key="buyAgain">
                        Mua lại
                    </Button>
                ),
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
                                {/* <div>
                                    <IconTrash color='#f32020'/>
                                </div> */}
                            </List.Item>
                        </Card>
                    )}
                />
            </Card>
        </Modal>
    );
};

export default ListDetailsForm;
