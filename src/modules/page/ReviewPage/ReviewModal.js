import { UserOutlined } from '@ant-design/icons';
import AvatarField from '@components/common/form/AvatarField';
import { BaseForm } from '@components/common/form/BaseForm';
import TextField from '@components/common/form/TextField';
import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';
import useNotification from '@hooks/useNotification';
import useTranslate from '@hooks/useTranslate';
import { showErrorMessage } from '@services/notifyService';
import { Button, Col, Form, Modal, Rate, Row } from 'antd';
import React, { useState } from 'react';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
    objectName: 'Thêm đánh giá',
    update: 'Cập nhật',
    create: 'Thêm mới',
    createSuccess: 'Tạo {objectName} thành công',
});
const ReviewModal = ({ open, onCancel, profile, orderDetailId }) => {
    const translate = useTranslate();
    const [form] = Form.useForm();
    const [star, setStar] = useState();
    const notification = useNotification();
    const handleOnCancel = () => {
        onCancel();
    };
    const { execute: executeCreateReview } = useFetch(apiConfig.review.create, {
        immediate: false,
    });
    const handleCreateReview = (value) => {
        executeCreateReview({
            data: {
                orderDetailId: orderDetailId,
                message: value.message,
                star: star,
            },
            onCompleted: () => {
                notification({
                    message: 'Tạo đánh giá thành công',
                });
                onCancel();
            },
            onError: (err) => {
                if (err.code === 'ERROR-REVIEW-0001') {
                    showErrorMessage('Bạn đã tạo đánh giá cho sản phẩm này!');
                    onCancel();
                }
            },
        });
    };
    const handleRateChange = (value) => {
        setStar(value);
    };
    return (
        <Modal
            centered
            open={open}
            onCancel={handleOnCancel}
            footer={null}
            title={translate.formatMessage(messages.objectName)}
        >
            <BaseForm form={form} onFinish={handleCreateReview} size="100%">
                <Row style={{ textAlign: 'center' }}>
                    <Col span={24} style={{ margin: '0 auto', textAlign: 'center' }}>
                        <AvatarField size={100} icon={<UserOutlined />} src={profile?.avatar} />
                        <div style={{ fontWeight: '500', fontSize: '18px', margin: '10px 0' }}>{profile.fullName}</div>
                        <Rate style={{ marginBottom: '30px' }} name="star" onChange={handleRateChange} />
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <TextField name="message" type="textarea" />
                    </Col>
                </Row>
                <Row>
                    <Button key="submit" type="primary" htmlType="submit" style={{ width: '100%' }}>
                        {translate.formatMessage(messages.create)}
                    </Button>
                </Row>
            </BaseForm>
        </Modal>
    );
};

export default ReviewModal;
