import { BaseForm } from '@components/common/form/BaseForm';
import CropImageField from '@components/common/form/CropImageField';
import SelectField from '@components/common/form/SelectField';
import TextField from '@components/common/form/TextField';
import apiConfig from '@constants/apiConfig';
import { statusOptions } from '@constants/masterData';
import useFetch from '@hooks/useFetch';
import useTranslate from '@hooks/useTranslate';
import { Card, Col, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

const ListDetailsForm = ({ handleAddList, open, onCancel, data, isEditing, form, handleEditItemList }) => {
    const translate = useTranslate();
    const statusValues = translate.formatKeys(statusOptions, ['label']);

    const [imageUrl, setImageUrl] = useState(null);
    const { execute: executeUpFile } = useFetch(apiConfig.file.upload);

    console.log(data);

    useEffect(() => {
        if (data) {
            form.setFieldsValue({ ...data, price: data.price.toString(), totalStock: data.totalStock.toString() });
            setImageUrl(data.image);
        }
    }, [data]);
    const handleFinish = (values) => {
        const updatedValues = { ...values, id: data?.id };
        if (isEditing) handleEditItemList({ ...updatedValues, image: imageUrl, index: data?.index });
        else handleAddList({ ...values, image: imageUrl });
        form.resetFields();
        onCancel();
    };
    const onChange = (id, item) => {
        form.setFieldValue('projectRoleId', item);
    };
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
                    // setIsChangedFormValues(true);
                }
            },
            onError: (error) => {
                onError();
            },
        });
    };
    return (
        <Modal
            title={<FormattedMessage defaultMessage="Danh sách yêu cầu" />}
            open={open}
            onCancel={onCancel}
            onOk={() => form.submit()}
        >
            <BaseForm form={form} onFinish={handleFinish} size="100%">
                <Card>
                    <Row>
                        <Col span={12}>
                            <CropImageField
                                label={<FormattedMessage defaultMessage="Ảnh" />}
                                name="image"
                                imageUrl={imageUrl}
                                aspect={1 / 1}
                                uploadFile={uploadFile}
                            />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <TextField label={<FormattedMessage defaultMessage="Màu sắc" />} name="color" required />
                        </Col>
                        <Col span={12}>
                            <TextField
                                label={<FormattedMessage defaultMessage="Giá sản phẩm" />}
                                name="price"
                                required
                            />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <TextField label={<FormattedMessage defaultMessage="Số lượng" />} name="totalStock" />
                        </Col>
                        <Col span={12}>
                            <SelectField
                                name="status"
                                label={<FormattedMessage defaultMessage="Trạng thái" />}
                                allowClear={false}
                                options={statusValues}
                            />
                        </Col>
                    </Row>
                </Card>
            </BaseForm>
        </Modal>
    );
};

export default ListDetailsForm;
