import AutoCompleteField from '@components/common/form/AutoCompleteField';
import { BaseForm } from '@components/common/form/BaseForm';
import TextField from '@components/common/form/TextField';
import apiConfig from '@constants/apiConfig';
import useBasicForm from '@hooks/useBasicForm';
import useFetch from '@hooks/useFetch';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@locales/intl';
import { Card, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { defineMessages } from 'react-intl';

const message = defineMessages({
    objectName: 'group permission',
    address: 'Địa chỉ',
});

const AddressForm = (props) => {
    const translate = useTranslate();
    const { formId, actions, dataDetail, onSubmit, setIsChangedFormValues, groups, branchs, isEditing } = props;
    const { execute: executeUpFile } = useFetch(apiConfig.file.upload);
    const [imageUrl, setImageUrl] = useState(null);
    const [isHasProvince, setIsHasProvince] = useState(isEditing ? true : false);
    const [province, setProvince] = useState(null);
    const [district, setDistrict] = useState(null);

    const handleProvinceChange = (selectedValue) => {
        if (selectedValue === null) {
            setProvince(null);
            console.log(1);
        } else {
            setProvince(selectedValue);
            console.log(province);
        }
        // Các xử lý khác dựa trên giá trị province
    };

    const handleDistrictChange = (selectedValue) => {
        if (selectedValue === null) {
            setDistrict(null);
            console.log(1);
        } else {
            setDistrict(selectedValue);
            console.log(province);
        }
        // Các xử lý khác dựa trên giá trị district
    };

    useEffect(() => {
        // Thực hiện gọi lại AutoCompleteField của districtId khi province thay đổi
        // Nếu bạn muốn chắc chắn rằng nó chỉ được gọi lại khi province có giá trị, hãy thêm điều kiện kiểm tra ở đây
        if (province !== null) {
            // Gọi lại AutoCompleteField của districtId bằng cách cập nhật key (key={province}) để làm mới component
            setDistrict(null); // Đặt district về giá trị mặc định
        }
    }, [province]);

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
                    setIsChangedFormValues();
                }
            },
            onError: (error) => {
                onError();
            },
        });
    };

    const handleSubmit = (values) => {
        return mixinFuncs.handleSubmit({ ...values, avatar: imageUrl });
    };

    useEffect(() => {
        form.setFieldsValue({
            ...dataDetail,
            provinceId: dataDetail?.provinceInfo?.id,
            districtId: dataDetail?.districtInfo?.id,
            wardId: dataDetail?.wardInfo?.id,
        });
        setImageUrl(dataDetail.avatar);
    }, [dataDetail]);
    return (
        <Card className="card-form" bordered={false}>
            <BaseForm
                id={formId}
                onFinish={handleSubmit}
                form={form}
                onValuesChange={onValuesChange}
                style={{ width: '90%' }}
                labelCol={{ span: 9 }}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField label={translate.formatMessage(commonMessage.Name)} name="name" />
                    </Col>
                    <Col span={12}>
                        <TextField label={translate.formatMessage(commonMessage.phone)} name="phone" />
                    </Col>
                    <Col span={12}>
                        <AutoCompleteField
                            label="Tỉnh/Thành phố"
                            name="provinceId"
                            apiConfig={apiConfig.nation.autocomplete}
                            mappingOptions={(item) => ({ value: item.id, label: item.name })}
                            initialSearchParams={{ kind: 1 }}
                            searchParams={(text) => ({ name: text, kind: 1 })}
                            onChange={handleProvinceChange}
                            required
                        />
                    </Col>
                    <Col span={12}>
                        <AutoCompleteField
                            label="Quận/Huyện"
                            name="districtId"
                            apiConfig={apiConfig.nation.autocomplete}
                            mappingOptions={(item) => ({ value: item.id, label: item.name })}
                            initialSearchParams={{ parentId: province, kind: 2 }}
                            searchParams={(text) => ({ name: text, kind: 2 })}
                            required
                            key={province}
                        />
                    </Col>
                    <Col span={12}>
                        <AutoCompleteField
                            label="Phường/Xã"
                            name="wardId"
                            apiConfig={apiConfig.nation.autocomplete}
                            mappingOptions={(item) => ({ value: item.id, label: item.name })}
                            initialSearchParams={{ parentId: district, kind: 3 }}
                            searchParams={(text) => ({ name: text, kind: 3 })}
                            required
                            key={district}
                        />
                    </Col>

                    <Col span={12}>
                        <TextField label={translate.formatMessage(commonMessage.address)} name="address" />
                    </Col>
                </Row>
                <div className="footer-card-form">{actions}</div>
            </BaseForm>
        </Card>
    );
};

export default AddressForm;
