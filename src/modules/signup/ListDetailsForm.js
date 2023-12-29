import { BaseForm } from '@components/common/form/BaseForm';
import apiConfig from '@constants/apiConfig';
import { statusOptions } from '@constants/masterData';
import useFetch from '@hooks/useFetch';
import useTranslate from '@hooks/useTranslate';
import { showErrorMessage } from '@services/notifyService';
import { Alert, Button, Card, Col, Form, Input, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, defineMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const message = defineMessage({
    copyRight: '{brandName} - © Copyright {year}. All Rights Reserved',
    loginFail: 'Chưa điền đủ các trường thông tin!!!',
    login: 'Đăng nhập',
});

const ListDetailsForm = ({ open, onCancel, data, form, idHash, email }) => {
    const translate = useTranslate();
    const statusValues = translate.formatKeys(statusOptions, ['label']);
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState(null);
    const { execute: executeUpFile } = useFetch(apiConfig.file.upload);
    const { execute, loading } = useFetch({
        ...apiConfig.user.forgetPassword,
    });
    const { execute: executeRequestForgetPassword, loading: loadingRequestForgetPassword } = useFetch({
        ...apiConfig.account.requestForgetPassword,
    });
    useEffect(() => {
        if (data) form.setFieldsValue({ ...data });
    }, [data]);
    const handleFinish = (values) => {
        let data;
        data = { otp: values.otp, idHash: idHash };
        execute({
            data: { ...data },
            onCompleted: (res) => {
                // setCacheAccessToken(res.access_token);
                // executeGetProfile();
                navigate('/login');
                onCancel();
                form.resetFields();
            },
            onError: (error) => {
                if (error.code === 'ERROR-ACCOUNT-0005' || error.code === 'ERROR-ACCOUNT-0006')
                    showErrorMessage('Vui lòng nhập mã khác!');
                // console.log(error.code);
                form.resetFields();
            },
        });
    };

    const handleGetOtp = () => {
        // Xử lý sự kiện khi người dùng click vào "Quên mật khẩu?"
        console.log('Người dùng đã click vào "Quên mật khẩu?"');
        // const email = form.getFieldValue('email');
        let data;
        data = { email: email };
        executeRequestForgetPassword({
            data: { ...data },
            onCompleted: (response) => {
                <Alert message="OTP đã được gửi" description="Vui lòng kiểm tra email." type="success" showIcon />;
                form.resetFields();
            },
            onError: (error) => {
                showErrorMessage(error.message);
                form.resetFields();
            },
        });
    };

    return (
        <Modal
            title={<FormattedMessage defaultMessage="Vui lòng kiểm tra email và nhập OTP" />}
            open={open}
            onCancel={onCancel}
            onOk={() => form.submit()}
        >
            <BaseForm form={form} onFinish={handleFinish} size="100%">
                <Card>
                    <Form.Item label="OTP" extra="Vui lòng kiểm tra email!">
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="otp"
                                    noStyle
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mã otp!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Button onClick={handleGetOtp}>Lấy mã</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Card>
            </BaseForm>
        </Modal>
    );
};

export default ListDetailsForm;
