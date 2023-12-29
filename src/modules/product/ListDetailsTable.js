import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { BaseTooltip } from '@components/common/form/BaseTooltip';
import BaseTable from '@components/common/table/BaseTable';
import useTranslate from '@hooks/useTranslate';
import { formatMoney } from '@utils';
import { Button, Divider } from 'antd';
import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';

const messages = defineMessages({
    objectName: 'Yêu cầu',
});
const ListDetailsTable = ({ data, loading, handleEditList, handleDeleteList }) => {
    const translate = useTranslate();
    const columns = [
        { dataIndex: 'color', title: <FormattedMessage defaultMessage="Màu sắc" />, width: '100px', align: 'center' },
        {
            title: <FormattedMessage defaultMessage="Giá sản phẩm" />,
            dataIndex: 'price',
            width: 150,
            align: 'right',
            render: (money) => {
                const formattedValue = formatMoney(money, {
                    groupSeparator: ',',
                    decimalSeparator: '.',
                    currentcy: 'đ',
                    currentcyPosition: 'BACK',
                    currentDecimal: '0',
                });
                return <div>{formattedValue}</div>;
            },
        },
        { dataIndex: 'totalStock', title: <FormattedMessage defaultMessage="Hàng trong kho" />, width: '100px', align: 'center' },
        {
            title: <FormattedMessage defaultMessage="Hành động" />,
            align: 'center',
            width: '150px',
            render: (item) => {
                return (
                    <>
                        <BaseTooltip type="edit" objectName={translate.formatMessage(messages.objectName)}>
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditList(item);
                                }}
                                type="link"
                                style={{ padding: 0 }}
                            >
                                <EditOutlined />
                            </Button>
                        </BaseTooltip>
                        <Divider type="vertical" />
                        <BaseTooltip type="delete" objectName={translate.formatMessage(messages.objectName)}>
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteList(item.index);
                                }}
                                type="link"
                                style={{ padding: 0 }}
                            >
                                <DeleteOutlined style={{ color: 'red' }} />
                            </Button>
                        </BaseTooltip>
                    </>
                );
            },
        },
    ];
    return <BaseTable rowKey={(record) => record.index} columns={columns} dataSource={data} loading={loading} />;
};

export default ListDetailsTable;
