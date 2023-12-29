import { EditOutlined } from '@ant-design/icons';
import ListPage from '@components/common/layout/ListPage';
import PageWrapper from '@components/common/layout/PageWrapper';
import BaseTable from '@components/common/table/BaseTable';
import apiConfig from '@constants/apiConfig';
import { FieldTypes } from '@constants/formConfig';
import { DEFAULT_TABLE_ITEM_SIZE } from '@constants/index';
import { statusOptions } from '@constants/masterData';
import useAuth from '@hooks/useAuth';
import useListBase from '@hooks/useListBase';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@locales/intl';
import { formatMoney } from '@utils/index';
import { Button } from 'antd';
import React, { useState } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';

const message = defineMessages({
    objectName: 'Sản phẩm',
    product: 'Sản phẩm',
});

const ProductListPage = () => {
    const translate = useTranslate();
    const statusValues = translate.formatKeys(statusOptions, ['label']);
    const { pathname: pagePath } = useLocation();
    const queryParameters = new URLSearchParams(window.location.search);
    const [companyOptions, setCompanyOptions] = useState([]);
    const navigate = useNavigate();
    const { profile } = useAuth();
    const companyId = profile.id;


    const { data, mixinFuncs, loading, pagination, queryFiter } = useListBase({
        apiConfig: apiConfig.product,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: translate.formatMessage(message.objectName),
        },
        override: (funcs) => {
            funcs.mappingData = (response) => {
                if (response.result === true) {
                    return {
                        data: response.data.content,
                        total: response.data.totalElements,
                    };
                }
            };
            funcs.getCreateLink = () => {
                return `${pagePath}/create`;
            };
            // funcs.getItemDetailLink = (dataRow) => {
            //     return `${pagePath}/${dataRow.id}?companyId=${profile.id}`;
            // };
            funcs.additionalActionColumnButtons = () => ({
                edit: (item) => (
                    <Button
                        type="link"
                        style={{ padding: 0 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(mixinFuncs.getItemDetailLink(item), {
                                state: { action: 'edit', prevPath: location.pathname },
                            });
                        }}
                    >
                        <EditOutlined />
                    </Button>
                ),
            });
        },
    });

    const columns = [
        {
            title: <FormattedMessage defaultMessage="Tên sản phẩm" />,
            dataIndex: ['name'],
        },
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
        {
            title: <FormattedMessage defaultMessage="Giảm giá" />,
            align: 'center',
            width: 130,
            dataIndex: 'saleOff',
            render: (saleOff) => {
                if (saleOff > 0) {
                    return <div>{saleOff} %</div>;
                } else return <div>{saleOff}</div>;
            },
        },
        {
            title: <FormattedMessage defaultMessage="Đã bán" />,
            dataIndex: ['soldAmount'],
            align: 'center',
            width: 140,
        },
        {
            title: <FormattedMessage defaultMessage="Hàng tồn kho" />,
            dataIndex: ['totalInStock'],
            align: 'center',
            width: 140,
        },
        // mixinFuncs.renderStatusColumn({ width: '120px' }),
        mixinFuncs.renderActionColumn({ edit: true, delete: true }, { width: '120px' }),
    ];

    const searchFields = [
        {
            key: 'name',
            placeholder: translate.formatMessage(message.product),
        },
        {
            key: 'status',
            placeholder: translate.formatMessage(commonMessage.status),
            type: FieldTypes.SELECT,
            options: statusValues,
        },
    ];


    return (
        <PageWrapper routes={[{ breadcrumbName: translate.formatMessage(message.product) }]}>
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFiter })}
                actionBar={mixinFuncs.renderActionBar()}
                baseTable={
                    <BaseTable
                        onChange={mixinFuncs.changePagination}
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        pagination={pagination}
                    />
                }
            ></ListPage>
        </PageWrapper>
    );
};
export default ProductListPage;
