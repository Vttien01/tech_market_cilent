import CropImageField from '@components/common/form/CropImageField';
import DatePickerField from '@components/common/form/DatePickerField';
import SelectField from '@components/common/form/SelectField';
import TextField from '@components/common/form/TextField';
import { DATE_FORMAT_DISPLAY, DATE_FORMAT_VALUE, genderValues } from '@constants';
import apiConfig from '@constants/apiConfig';
import useAuth from '@hooks/useAuth';
import useBasicForm from '@hooks/useBasicForm';
import useFetch from '@hooks/useFetch';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@locales/intl';
import { formatDateString } from '@utils';
import { Card, Col, Form, Row } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

const message = defineMessages({
    objectName: 'group permission',
});

const ProfileForm = (props) => {
    const { profile } = useAuth();
    const translate = useTranslate();
    const { formId, dataDetail, onSubmit, setIsChangedFormValues, actions } = props;
    const [imageUrl, setImageUrl] = useState(null);
    const { execute: executeUpFile } = useFetch(apiConfig.file.upload);

    console.log(profile);

    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
        setIsChangedFormValues,
    });
    const uploadFile = (file, onSuccess, onError) => {
        executeUpFile({
            data: {
                type: 'AVATAR',
                file: file,
            },
            onCompleted: (response) => {
                if (response.result === true) {
                    onSuccess();
                    setImageUrl(response.data.filePath);
                }
            },
            onError: (error) => {
                onError();
            },
        });
    };

    useEffect(() => {
        dataDetail.birthday = dataDetail?.birthday && dayjs(dataDetail?.birthday, DATE_FORMAT_VALUE);
        form.setFieldsValue({
            ...dataDetail,
            fullName: dataDetail?.account?.fullName,
            email: dataDetail?.account?.email,
            phone: dataDetail?.account?.phone,
            gender: dataDetail?.gender,
        });
        setImageUrl(dataDetail?.account?.avatar);
    }, [dataDetail]);

    const handleFinish = (values) => {
        mixinFuncs.handleSubmit({
            ...values,
            phone:values.phone,
            fullName: values.fullName,
            oldPassword: values.oldPassword,
            password: values.password,
            birthday: formatDateString(values?.birthday, DATE_FORMAT_VALUE) + ' 00:00:00',
            avatarPath: imageUrl,
        });
    };

    return (
        <Card
            className="card-form"
            bordered={false}
            style={{ minHeight: 'calc(100vh - 190px)', minWidth: 1200, marginBottom: 20 }}
        >
            <Form
                style={{ width: '90%' }}
                labelCol={{ span: 9 }}
                id={formId}
                onFinish={handleFinish}
                form={form}
                // layout="horizontal"
                onValuesChange={onValuesChange}
            >
                <CropImageField
                    label={translate.formatMessage(commonMessage.avatar)}
                    name="avatarPath"
                    imageUrl={imageUrl}
                    aspect={1 / 1}
                    uploadFile={uploadFile}
                />
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField label={translate.formatMessage(commonMessage.fullName)} name="fullName" required/>
                    </Col>
                    <Col span={12}>
                        <DatePickerField
                            label="Ngày sinh"
                            showTime={false}
                            name="birthday"
                            format={DATE_FORMAT_DISPLAY}
                            style={{ width: '100%', height: 45 }}
                            size="small"
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField label={translate.formatMessage(commonMessage.email)} name="email" />
                    </Col>
                    <Col span={12}>
                        <TextField label={translate.formatMessage(commonMessage.phone)} name="phone" required/>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField
                            type="password"
                            label={<FormattedMessage defaultMessage="Mật khẩu cũ" />}
                            required
                            name="oldPassword"
                        />
                    </Col>
                    <Col span={12}>
                        <SelectField
                            // disabled={dataDetail?.state === 3 || (dataDetail?.state === 4 && true)}
                            name="gender"
                            label={<FormattedMessage defaultMessage="Giới tính" />}
                            allowClear={false}
                            options={genderValues}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField
                            type="password"
                            label={<FormattedMessage defaultMessage="Mật khẩu mới" />}
                            name="password"
                            rules={[
                                {
                                    validator: async () => {
                                        const isTouched = form.isFieldTouched('newPassword');
                                        if (isTouched) {
                                            const value = form.getFieldValue('newPassword');
                                            if (value.length < 6) {
                                                throw new Error(
                                                    translate.formatMessage(commonMessage.validatePassword),
                                                );
                                            }
                                        }
                                    },
                                },
                            ]}
                        />
                    </Col>
                    <Col span={12}>
                        <TextField
                            type="password"
                            label={translate.formatMessage(commonMessage.confirmPassword)}
                            rules={[
                                {
                                    validator: async () => {
                                        const password = form.getFieldValue('newPassword');
                                        const confirmPassword = form.getFieldValue('confirmPassword');
                                        if (password !== confirmPassword) {
                                            throw new Error(translate.formatMessage(commonMessage.passwordNotMatch));
                                        }
                                    },
                                },
                            ]}
                        />
                    </Col>
                </Row>

                <div className="footer-card-form">{actions}</div>
            </Form>
        </Card>
    );
};

export default ProfileForm;
