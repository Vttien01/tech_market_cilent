/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import './OrderPage.scss';
// import { fetchAsyncProductSingle, getProductSingle, getSingleProductStatus } from '../../store/productSlice';
// import { addToCart, getCartMessageStatus, setCartMessageOff, setCartMessageOn } from '../../store/cartSlice';
// import CartMessage from '../../components/CartMessage/CartMessage';
import PageWrapper from '@components/common/layout/PageWrapper';
import apiConfig from '@constants/apiConfig';
import useAuth from '@hooks/useAuth';
import useFetch from '@hooks/useFetch';
import useTranslate from '@hooks/useTranslate';
import routes from '@routes';
import {
    Button,
    Form,
    Result,
    Steps,
    theme,
} from 'antd';
import { defineMessage } from 'react-intl';

const decription = defineMessage({
    first: 'Kiểm tra số lượng sản phẩm',
    second: 'Thanh toán đơn hàng',
    third: 'Hoàn thành các bước',
});

const ResultFail = () => {
    const { profile } = useAuth();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const translate = useTranslate();
    const queryParameters = new URLSearchParams(window.location.search);
    const orderId = queryParameters.get('orderId');
    const [item1, setItem1] = useState(null);

    const { token } = theme.useToken();
    const [current, setCurrent] = useState(2);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };

    const { execute: executeSuccessPay } = useFetch({
        ...apiConfig.transaction.cancelPay,
    });

    useEffect(() => {
      executeSuccessPay({
        params:{
            orderId  : orderId,
        },
        onCompleted: (respone) => {
            setTimeout(() => {
                navigate(routes.HistoryOrder.path);
             }, 2000);
        },
      });
    }, []);

    const steps = [
        {
            title: 'Đơn hàng',
            status: 'finish',
            // icon: <SolutionOutlined />,
            decription: decription.first,
        },
        {
            title: 'Thanh toán',
            status: 'error',
            // icon: <LoadingOutlined />,
            decription: decription.second,
        },
        {
            title: 'Hoàn thành',
            status: 'finish',
            // icon: <SmileOutlined />,
            content: (
                <Result
                    status="warning"
                    title="Đơn hàng của bạn đã được đặt!"
                    subTitle="Vui lòng kiểm tra thông tin đặt hàng."
                    extra={[
                        <Button type="primary" key="console">
                            <a href="/">Quay về trang chủ</a>
                        </Button>,
                        <Button key="buy">
                            <a href="/all-product">Xem sản phẩm khác</a>
                        </Button>,
                    ]}
                >
                </Result>
            ),
            decription: decription.third,
        },
    ];
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
        icon: item.icon,
        status: item.status,
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
        <div className="con1 py-4 bg-whitesmoke" style={{ display: 'flex', justifyContent: 'start', marginLeft: 200 }}>
            <PageWrapper
                routes={[
                    {
                        breadcrumbName: 'Trang chủ',
                        path: generatePath(routes.homePage.path),
                    },
                    { breadcrumbName: 'Đặt hàng' },
                ]}
                // title={title}
            >
                <Steps current={2} items={items} size="large" />
                <div style={contentStyle}>{steps[current].content}</div>
                <div
                    style={{
                        marginTop: 24,
                    }}
                >
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {/* {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )} */}
                    {current > 0 && current < steps.length - 1 && (
                        <Button
                            style={{
                                margin: '0 8px',
                            }}
                            onClick={() => prev()}
                        >
                            Previous
                        </Button>
                    )}
                </div>
            </PageWrapper>
        </div>
    );
};

export default ResultFail;
