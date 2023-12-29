import CropImageField from '@components/common/form/CropImageField';
import TextField from '@components/common/form/TextField';
import { AppConstants } from '@constants';
import apiConfig from '@constants/apiConfig';
import useBasicForm from '@hooks/useBasicForm';
import useFetch from '@hooks/useFetch';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@locales/intl';
import { Card, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { defineMessages } from 'react-intl';

const message = defineMessages({
    objectName: 'group permission',
});

const ProfileForm = (props) => {
    const translate = useTranslate();
    const { formId, dataDetail, onSubmit, setIsChangedFormValues, actions } = props;
    const [imageUrl, setImageUrl] = useState(null);
    const { execute: executeUpFile } = useFetch(apiConfig.file.upload);

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
        form.setFieldsValue({
            ...dataDetail,
            city: dataDetail.info?.city,
            country: dataDetail.info?.country,
            jobTitle: dataDetail.info?.jobTitle,
            department: dataDetail.info?.department,
            employeeId: dataDetail.info?.employeeId,
            postalCode: dataDetail.info?.postalCode,
        });
        setImageUrl(dataDetail.avatar);
    }, [dataDetail]);

    const handleFinish = (values) => {
        mixinFuncs.handleSubmit({
            fullName: values.fullName,
            oldPassword: values.oldPassword,
            password: values.password,
            avatar: imageUrl,
        });
    };

    return (
        <Card className="card-form" bordered={false} style={{ minHeight: 'calc(100vh - 190px)' }}>
            <Form
                style={{ width: '50%' }}
                labelCol={{ span: 8 }}
                id={formId}
                onFinish={handleFinish}
                form={form}
                layout="horizontal"
                onValuesChange={onValuesChange}
            >
                <CropImageField
                    label={translate.formatMessage(commonMessage.avatar)}
                    name="avatar"
                    imageUrl={imageUrl && `${AppConstants.contentRootUrl}${imageUrl}`}
                    aspect={1 / 1}
                    uploadFile={uploadFile}
                />
                <TextField readOnly label={translate.formatMessage(commonMessage.username)} name="username" />
                <TextField label={translate.formatMessage(commonMessage.fullName)} name="fullName" />
                <TextField
                    type="password"
                    label={translate.formatMessage(commonMessage.currentPassword)}
                    required
                    name="oldPassword"
                />
                <TextField
                    type="password"
                    label={translate.formatMessage(commonMessage.newPassword)}
                    name="password"
                    rules={[
                        {
                            validator: async () => {
                                const isTouched = form.isFieldTouched('newPassword');
                                if (isTouched) {
                                    const value = form.getFieldValue('newPassword');
                                    if (value.length < 6) {
                                        throw new Error(translate.formatMessage(commonMessage.validatePassword));
                                    }
                                }
                            },
                        },
                    ]}
                />
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

                <div className="footer-card-form">{actions}</div>
            </Form>
        </Card>
    );
};

export default ProfileForm;
