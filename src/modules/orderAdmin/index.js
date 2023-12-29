import { DeleteOutlined } from '@ant-design/icons';
import ListPage from '@components/common/layout/ListPage';
import PageWrapper from '@components/common/layout/PageWrapper';
import BaseTable from '@components/common/table/BaseTable';
import { DATE_FORMAT_VALUE, DEFAULT_FORMAT, DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import apiConfig from '@constants/apiConfig';
import { FieldTypes } from '@constants/formConfig';
import { orderStateOption, paidValues, paymentOptions, statusOptions } from '@constants/masterData';
import useListBase from '@hooks/useListBase';
import useTranslate from '@hooks/useTranslate';
import routes from '@routes';
import { convertUtcToLocalTime, formatMoney } from '@utils';
import { Button, Tag } from 'antd';
import React from 'react';
import { defineMessages } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const message = defineMessages({
    objectName: 'Đơn hàng',
    name: 'Tên',
    status: 'Trạng thái',
    createDate: 'Ngày tạo',
    category: 'Danh mục hệ',
});

const OrderAdminPage = () => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const statusValues = translate.formatKeys(statusOptions, ['label']);
    const stateValues = translate.formatKeys(paymentOptions, ['label']);
    const orderStatetateValues = translate.formatKeys(orderStateOption, ['label']);
    const isPaidValues = translate.formatKeys(paidValues, ['label']);

    const { data, mixinFuncs, queryFilter, loading, pagination, changePagination } = useListBase({
        apiConfig: apiConfig.order,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: translate.formatMessage(message.objectName),
        },
        override: (funcs) => {
            funcs.additionalActionColumnButtons = () => {
                return {
                    deleteItem: ({ buttonProps, ...dataRow }) => {
                        return (
                            <Button
                                {...buttonProps}
                                type="link"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    mixinFuncs.showDeleteItemConfirm(dataRow._id);
                                }}
                                style={{ padding: 0 }}
                            >
                                <DeleteOutlined />
                            </Button>
                        );
                    },
                };
            };
            const prepareGetListParams = funcs.prepareGetListParams;
            funcs.prepareGetListParams = (params) => {
                return {
                    ...prepareGetListParams(params),
                };
            };
        },
    });

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'orderCode',
            align: 'center',
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'createdDate',
            align: 'center',
            render: (createdDate) => {
                const result = convertUtcToLocalTime(createdDate, DEFAULT_FORMAT, DATE_FORMAT_VALUE);
                return <div>{result}</div>;
            },
        },
        {
            title: 'Ngày dự kiến nhận hàng',
            dataIndex: 'expectedDeliveryDate',
            align: 'center',
            render: (expectedDeliveryDate) => {
                const result = convertUtcToLocalTime(expectedDeliveryDate, DEFAULT_FORMAT, DATE_FORMAT_VALUE);
                return <div>{result}</div>;
            },
        },
        {
            title: 'Người nhận',
            dataIndex: 'receiver',
            align: 'center',
        },
        {
            title: 'Hình thức trả tiền',
            dataIndex: 'paymentMethod',
            align: 'center',
            width: 120,
            render(dataRow) {
                const state = stateValues.find((item) => item.value == dataRow);
                return (
                    <Tag
                        color={state.color}
                        style={{ minWidth: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <div style={{ padding: '3px 0px 3px 0px', fontSize: 14 }}>{state.label}</div>
                    </Tag>
                );
            },
        },
        {
            title: 'Trạng thái đơn hàng',
            dataIndex: 'state',
            align: 'center',
            width: 120,
            render(dataRow) {
                const state = orderStatetateValues.find((item) => item.value == dataRow);
                return (
                    <Tag
                        color={state.color}
                        style={{
                            minWidth: 80,
                            height: 28,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <div style={{ padding: '0 0px', fontSize: 14 }}>{state.label}</div>
                    </Tag>
                );
            },
        },
        {
            title: 'Trạng thái thanh toán',
            dataIndex: 'isPaid',
            align: 'center',
            render(dataRow) {
                const state = isPaidValues.find((item) => item.value == dataRow);
                return (
                    <Tag
                        color={state.color}
                        style={{
                            minWidth: 80,
                            height: 28,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <div style={{ padding: '0 0px', fontSize: 14 }}>{state.label}</div>
                    </Tag>
                );
            },
        },
        {
            title: 'Tổng tiền',
            dataIndex: ['totalMoney'],
            name: 'totalMoney',
            align: 'center',
            render: (value) => {
                return (
                    <span>
                        {formatMoney(value, {
                            groupSeparator: ',',
                            decimalSeparator: '.',
                            currentcy: 'đ',
                            currentcyPosition: 'BACK',
                            currentDecimal: '0',
                        })}
                    </span>
                );
            },
        },
        // mixinFuncs.renderStatusColumn({ width: '120px' }),
        mixinFuncs.renderActionColumn({ edit: true, delete: false }, { width: '60px' }),
    ];

    const searchFields = [
        {
            key: 'orderCode',
            placeholder: 'Mã đơn hàng',
        },
        {
            key: 'userId',
            placeholder: 'Mã người dùng',
        },
        {
            key: 'state',
            placeholder: 'Tình trạng đơn hàng',
            type: FieldTypes.SELECT,
            options: orderStatetateValues,
        },
    ];
    const breadRoutes = [{ breadcrumbName: translate.formatMessage(message.objectName) }];

    const handleFetchDetail = (id) => {
        navigate(
            routes.DetailOrderAdmin.path +
                `?orderId=${id}`,
        );
    };

    return (
        <PageWrapper routes={breadRoutes}>
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
                actionBar={mixinFuncs.renderActionBar()}
                baseTable={
                    <BaseTable
                        onRow={(record, rowIndex) => ({
                            onClick: (e) => {
                                e.stopPropagation();
                                handleFetchDetail(record.id);

                                // handlersModal.open();
                            },
                        })}
                        onChange={changePagination}
                        pagination={pagination}
                        loading={loading}
                        dataSource={data}
                        columns={columns}
                        style={{ cursor:'pointer' }}
                    />
                }
            />
        </PageWrapper>
    );
};

export default OrderAdminPage;
