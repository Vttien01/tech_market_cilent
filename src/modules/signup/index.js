import { Button, Form, Image } from 'antd';
import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import imgContact from '@assets/images/imgContact.png';
import logo from '@assets/images/logoTech.png';
import DatePickerField from '@components/common/form/DatePickerField';
import InputTextField from '@components/common/form/InputTextField';
import { DATE_FORMAT_DISPLAY, DATE_FORMAT_VALUE, DEFAULT_FORMAT, appAccount } from '@constants';
import apiConfig from '@constants/apiConfig';
import useAuth from '@hooks/useAuth';
import useDisclosure from '@hooks/useDisclosure';
import useFetch from '@hooks/useFetch';
import useFetchAction from '@hooks/useFetchAction';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@locales/intl';
import { showErrorMessage, showSucsessMessage } from '@services/notifyService';
import { accountActions } from '@store/actions';
import { IconCake, IconMailExclamation, IconPhone } from '@tabler/icons-react';
import { formatDateString } from '@utils';
import { Buffer } from 'buffer';
import dayjs from 'dayjs';
import ListDetailsForm from './ListDetailsForm';
import './style.css';

window.Buffer = window.Buffer || Buffer;
const message = defineMessages({
    copyRight: '{brandName} - © Copyright {year}. All Rights Reserved',
    loginFail: 'Chưa điền đủ các trường thông tin!!!',
    login: 'Đăng nhập',
});

const SignupPage = () => {
    const intl = useIntl();
    const translate = useTranslate();
    const [idHash, setidHash] = useState('');
    const [email, setEmail] = useState('');
    const [openedDetailsModal, handlerDetailsModal] = useDisclosure(false);
    const base64Credentials = Buffer.from(`${appAccount.APP_USERNAME}:${appAccount.APP_PASSWORD}`).toString('base64');
    const { execute, loading } = useFetch({
        ...apiConfig.user.create,
        authorization: `Basic ${base64Credentials}`,
    });
    const [form] = Form.useForm();
    const { execute: executeGetProfile } = useFetchAction(accountActions.getProfile, {
        loading: useFetchAction.LOADING_TYPE.APP,
    });
    const { profile } = useAuth();

    const onFinish = (values) => {
        values.birthday = values.birthday + '00:00:00' && formatDateString(values.birthday, DEFAULT_FORMAT);
        console.log(values.grant_type);
        let data;

        // Kiểm tra giá trị của grant_type
        if (values.grant_type === 'user') {
            // Nếu grant_type rỗng, sử dụng phone làm username
            data = {
                phone: values.phone,
                password: values.password,
                email: values.email,
                fullName: values.fullName,
                birthday: values.birthday,
            };
        } else {
            // Nếu grant_type không rỗng, sử dụng giá trị của values
            data = values;
        }
        execute({
            data: { ...data },
            onCompleted: (response) => {
                // setCacheAccessToken(res.access_token);
                // executeGetProfile();
                setidHash(response.data.idHash);
                setEmail(values.email);
                showSucsessMessage(response.message);
                handlerDetailsModal.open();
                form.resetFields();
            },
            onError: (error) => {
                showErrorMessage(error.message);
                form.resetFields();
            },
        });
    };

    const validateStartDate = (_, value) => {
        const date = dayjs(formatDateString(new Date(), DEFAULT_FORMAT), DATE_FORMAT_VALUE);
        if (date && value && value.isAfter(date)) {
            return Promise.reject('Ngày sinh phải nhỏ hơn ngày hiện tại');
        }
        return Promise.resolve();
    };

    return (
        <div className="grid-container">
            <ListDetailsForm
                open={openedDetailsModal}
                onCancel={() => handlerDetailsModal.close()}
                form={form}
                idHash={idHash}
                email={email}
            />
            <div className="area_login_1">
                <nav className="nav">
                    <div className="nav-left">
                        <a href="#">
                            <img width="300" height="80" src={logo} alt="Tech-market" />
                        </a>
                    </div>
                    <div className="nav-right">
                        <ul>
                            <li className="active">
                                <a href="/home">Trang chủ</a>
                            </li>
                            <li>
                                <a href="/introduction">Giới thiệu</a>
                            </li>
                            <li>
                                <a href="/all-product">Sản phẩm</a>
                            </li>
                            <li>
                                <a href="#">Liên hệ</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className="area_login_left">
                {/* <div className="loginForm"> */}
                <Image
                    src={imgContact}
                    style={{ objectFit: 'cover', height: 500, width: 500, borderRadius: 20 }}
                    preview={false}
                />
            </div>
            <div className="area_login_right">
                <div className="top">
                    <h2>Welcome to our website</h2>
                    <h4>Vui lòng đăng ký</h4>
                </div>
                <Form
                    name="login-form"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <div className="input">
                        <InputTextField
                            name="phone"
                            fieldProps={{ prefix: <IconPhone /> }}
                            placeholder="Số điện thoại"
                            size="large"
                            required
                        />
                    </div>
                    <div className="input">
                        <InputTextField
                            name="email"
                            fieldProps={{ prefix: <IconMailExclamation /> }}
                            type="email"
                            placeholder={intl.formatMessage(commonMessage.email)}
                            size="large"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Định dạng email không hợp lệ',
                                },
                            ]}
                            required
                        />
                    </div>
                    <div className="input">
                        <InputTextField
                            name="fullName"
                            fieldProps={{ prefix: <UserOutlined /> }}
                            // label={intl.formatMessage(message.username)}
                            placeholder="Họ và tên"
                            size="large"
                            required
                        />
                    </div>
                    <div className="input">
                        <DatePickerField
                            fieldProps={{ prefix: <IconCake /> }}
                            // showTime={true}
                            name="birthday"
                            placeholder="Ngày sinh"
                            format={DATE_FORMAT_DISPLAY}
                            style={{ width: '100%', height: 60 }}
                            size="large"
                            rules={[
                                {
                                    validator: validateStartDate,
                                },
                            ]}
                        />
                    </div>
                    <div className="input">
                        <InputTextField
                            name="password"
                            fieldProps={{ prefix: <LockOutlined /> }}
                            // label={intl.formatMessage(message.password)}
                            placeholder={intl.formatMessage(commonMessage.password)}
                            size="large"
                            required
                            type="password"
                        />
                        <i className="fa-solid fa-eye"></i>
                    </div>
                    <Button
                        type="primary"
                        size="large"
                        loading={loading}
                        htmlType="submit"
                        className="btnLogin"
                        style={{ width: '100%' }}
                    >
                        ĐĂNG KÝ
                    </Button>
                    <div className="or">
                        <p>
                            Nếu có tài khoản hãy <a href="/login">Đăng nhập</a>
                        </p>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default SignupPage;
