import { BaseForm } from '@components/common/form/BaseForm';
import DatePickerField from '@components/common/form/DatePickerField';
import InputTextField from '@components/common/form/InputTextField';
import SelectField from '@components/common/form/SelectField';
import TextField from '@components/common/form/TextField';
import { DATE_FORMAT_DISPLAY, DATE_FORMAT_VALUE, DEFAULT_FORMAT } from '@constants';
import apiConfig from '@constants/apiConfig';
import {
    orderStateValue,
    paidOptions,
    paymentOptions,
} from '@constants/masterData';
import useBasicForm from '@hooks/useBasicForm';
import useFetch from '@hooks/useFetch';
import useTranslate from '@hooks/useTranslate';
import { formatDateString } from '@utils';
import { Card, Col, Row } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

const OrderAdminForm = (props) => {
    const { formId, actions, onSubmit, dataDetail, setIsChangedFormValues, isEditing } = props;
    const translate = useTranslate();
    const [isDisableStartDate, setIsDisableStartDate] = useState(false);
    // const lectureStateOptions = translate.formatKeys(lectureState, ['label']);
    // const [lectureStateFilter, setLectureStateFilter] = useState([lectureStateOptions[0]]);
    const paymentValues = translate.formatKeys(paymentOptions, ['label']);
    const orderStateValues = translate.formatKeys(orderStateValue, ['label']);
    const isPaidValues = translate.formatKeys(paidOptions, ['label']);
    const [orderStateFilter, setOrderStateFilter] = useState([orderStateValues[0]]);

    const [bannerUrl, setBannerUrl] = useState(null);
    const { execute: executeUpFile } = useFetch(apiConfig.file.upload);
    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
        setIsChangedFormValues,
    });
    const handleSubmit = (values) => {
        values.expectedDeliveryDate = formatDateString(values?.expectedDeliveryDate, DATE_FORMAT_VALUE) + ' 00:00:00';
        // if (!values?.status) {
        //     values.status = 1;
        // }
        return mixinFuncs.handleSubmit({ ...values });
    };

    const validateStartDate = (_, value) => {
        const date = dayjs(formatDateString(new Date(), DEFAULT_FORMAT), DATE_FORMAT_VALUE);
        if (date && value && value.isBefore(date)) {
            return Promise.reject('Ngày bắt đầu phải lớn hơn hoặc bằng ngày hiện tại');
        }
        return Promise.resolve();
    };
    const validateDueDate = (_, value) => {
        const { createdDate } = form.getFieldValue();
        if (createdDate && value && value <= createdDate) {
            return Promise.reject('Ngày giao hàng phải lớn hơn ngày đặt!');
        }
        return Promise.resolve();
    };

    useEffect(() => {
        orderStateValues.map((state, index) => {
            // if (!dataDetail?.isPaid && dataDetail?.paymentMethod === 1) {
            //     const length = orderStateValues.length;
            //     let arrayStateFilter = [];
            //     setOrderStateFilter(arrayStateFilter);
            // } else {
            if (dataDetail?.state == state.value) {
                const length = orderStateValues.length;
                let arrayStateFilter = [];
                if (index < length - 3) {
                    arrayStateFilter = [state, orderStateValues[index + 1], orderStateValues[length - 1]];
                } else if (index === length - 3) {
                    arrayStateFilter = [state, orderStateValues[2], orderStateValues[length - 1]];
                } else {
                    arrayStateFilter = [state];
                }

                setOrderStateFilter(arrayStateFilter);
            }
            // }
        });
        if (dataDetail.state !== undefined && dataDetail.state !== 1) {
            setIsDisableStartDate(true);
        } else {
            setIsDisableStartDate(false);
        }
    }, [dataDetail.state]);
    const initialRules = [
        {
            required: true,
            message: 'Vui lòng chọn ngày bắt đầu',
        },
    ];
    useEffect(() => {
        dataDetail.createdDate = dataDetail?.createdDate && dayjs(dataDetail?.createdDate, DATE_FORMAT_VALUE);
        dataDetail.expectedDeliveryDate =
            dataDetail?.expectedDeliveryDate && dayjs(dataDetail?.expectedDeliveryDate, DATE_FORMAT_VALUE);
        if (dataDetail) form.setFieldsValue({ ...dataDetail });
    }, [dataDetail]);

    const getRules = () => {
        let rules = [...initialRules];

        if (!isDisableStartDate) {
            rules.push({
                validator: validateStartDate,
            });
        }

        return rules;
    };
    return (
        <BaseForm formId={formId} onFinish={handleSubmit} form={form} onValuesChange={onValuesChange}>
            <Card className="card-form" bordered={false}>
                <Row gutter={12}>
                    <Col span={12}>
                        <TextField
                            label={<FormattedMessage defaultMessage="Tên người nhận" />}
                            name="receiver"
                            required
                            disabled={isEditing}
                        />
                    </Col>
                    <Col span={12}>
                        <TextField
                            label={<FormattedMessage defaultMessage="Địa chỉ" />}
                            name="address"
                            disabled={isEditing}
                        />
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={12}>
                        <InputTextField
                            label={<FormattedMessage defaultMessage="Tổng tiền thanh toán" />}
                            name="totalMoney"
                            readOnly={true}
                        />
                    </Col>
                    <Col span={12}>
                        <SelectField
                            disabled={isEditing}
                            name="paymentMethod"
                            label={<FormattedMessage defaultMessage="Phương thức thanh toán" />}
                            allowClear={false}
                            options={paymentValues}
                            style={{ width: '100%', height: 45 }}
                        />
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={12}>
                        <DatePickerField
                            label="Ngày đặt"
                            showTime={false}
                            name="createdDate"
                            placeholder="Ngày đặt"
                            format={DATE_FORMAT_DISPLAY}
                            style={{ width: '100%', height: 30 }}
                            size="small"
                            disabled={isEditing}
                        />
                    </Col>
                    <Col span={12}>
                        <DatePickerField
                            disabled={dataDetail?.state === 4 || dataDetail?.state === 3}
                            label="Ngày dự kiến giao hàng"
                            showTime={false}
                            name="expectedDeliveryDate"
                            format={DATE_FORMAT_DISPLAY}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn ngày giao hàng!',
                                },
                                {
                                    validator: validateDueDate,
                                },
                            ]}
                            style={{ width: '100%', height: 30 }}
                            size="small"
                        />
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={12}>
                        <SelectField
                            disabled={dataDetail?.state === 4}
                            defaultValue={orderStateFilter[0]}
                            name="state"
                            label={<FormattedMessage defaultMessage="Trạng thái đơn hàng" />}
                            allowClear={false}
                            options={orderStateFilter}
                        />
                    </Col>
                    <Col span={12}>
                        <SelectField
                            // disabled={isEditing}
                            name="isPaid"
                            label={<FormattedMessage defaultMessage="Trạng thái thanh toán" />}
                            allowClear={false}
                            options={isPaidValues}
                        />
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={12}></Col>
                    <Col span={12}></Col>
                </Row>

                <div className="footer-card-form">{actions}</div>
            </Card>
        </BaseForm>
    );
};

export default OrderAdminForm;
