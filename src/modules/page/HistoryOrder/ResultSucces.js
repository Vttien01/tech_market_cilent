import React, { useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import './OrderPage.scss';
import { LoadingOutlined, SmileOutlined, SolutionOutlined } from '@ant-design/icons';
import PageWrapper from '@components/common/layout/PageWrapper';
import useAuth from '@hooks/useAuth';
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

const ResultSuccess = () => {

    const { token } = theme.useToken();
    const [current, setCurrent] = useState(2);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };



    const steps = [
        {
            title: 'Đơn hàng',
            status: 'finish',
            icon: <SolutionOutlined />,
            decription: decription.first,
        },
        {
            title: 'Thanh toán',
            status: 'process',
            icon: <LoadingOutlined />,
            decription: decription.second,
        },
        {
            title: 'Hoàn thành',
            status: 'wait',
            icon: <SmileOutlined />,
            content: (
                <Result
                    status="success"
                    title="Đơn hàng của bạn đang được xử lý"
                    subTitle="Vui lòng theo dõi email để biết quá trình giao hàng."
                    extra={[
                        <Button type="primary" key="console">
                            <a href="/">Quay về trang chủ</a>
                        </Button>,
                        <Button key="buy">
                            <a href="/all-product">Xem sản phẩm khác</a>
                        </Button>,
                    ]}
                />
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

    const [quantity, setQuantity] = useState(1);

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
                <Steps current={current} items={items} size="large" />
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

export default ResultSuccess;
