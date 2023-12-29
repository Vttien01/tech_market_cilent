import { StarFilled, UserOutlined } from '@ant-design/icons';
import AvatarField from '@components/common/form/AvatarField';
import { BaseTooltip } from '@components/common/form/BaseTooltip';
import ListPage from '@components/common/layout/ListPage';
import PageWrapper from '@components/common/layout/PageWrapper';
import BaseTable from '@components/common/table/BaseTable';
import { DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import apiConfig from '@constants/apiConfig';
import { orderStateOption, paymentOptions, statusOptions } from '@constants/masterData';
import useDisclosure from '@hooks/useDisclosure';
import useFetch from '@hooks/useFetch';
import useListBase from '@hooks/useListBase';
import useTranslate from '@hooks/useTranslate';
import ReviewListModal from '@modules/page/ReviewPage/ReviewListModal';
import routes from '@routes';
import { formatMoney } from '@utils';
import { Button } from 'antd';
import React, { useState } from 'react';
import { defineMessages } from 'react-intl';

const message = defineMessages({
    objectName: 'Chi tiết đơn hàng',
    name: 'Tên',
    status: 'Trạng thái',
    createDate: 'Ngày tạo',
    category: 'Danh mục hệ',
});

const DetailOrder = () => {
    const translate = useTranslate();
    const queryParameters = new URLSearchParams(window.location.search);
    const [orderDetailId, setOrderDetailId] = useState(null);
    const [openReviewModal, handlersReviewModal] = useDisclosure(false);



    const orderId = queryParameters.get('orderId');
    const statusValues = translate.formatKeys(statusOptions, ['label']);
    const stateValues = translate.formatKeys(paymentOptions, ['label']);
    const orderStatetateValues = translate.formatKeys(orderStateOption, ['label']);


    const { data, mixinFuncs, queryFilter, loading, pagination, changePagination, serializeParams, serializeParam } =
        useListBase({
            apiConfig: {
                getList: apiConfig.orderDetail.getByOrder,
            },
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
                // const prepareGetListParams = funcs.prepareGetListParams;
                // funcs.prepareGetListParams = (params) => {
                //     return {
                //         ...prepareGetListParams(params),
                //     };
                // };
                funcs.prepareGetListPathParams = () => {
                    return {
                        id: orderId,
                    };
                };
                // funcs.changeFilter = (filter) => {
                //     mixinFuncs.setQueryParams(
                //         serializeParam({
                //             id:orderId,
                //             ...filter,
                //         }),
                //     );
                // };
                // funcs.getList = () => {
                //     const params = mixinFuncs.prepareGetListPathParams(queryFilter);
                //     mixinFuncs.handleFetchList({ ...params });
                // };
                funcs.getList = () => {
                    const params = mixinFuncs.prepareGetListParams(queryFilter);
                    mixinFuncs.handleFetchList({ ...params, orderId: null });
                };
                funcs.additionalActionColumnButtons = () => {
                    return {
                        review: ({ buttonProps, ...dataRow }) => (
                            <BaseTooltip title="Đánh giá sản phẩm">
                                <Button
                                    type="link"
                                    // disabled={state !== 3}
                                    style={{ padding: 0 }}
                                    onClick={(e) => {
                                        getListReview(dataRow?.productId);
                                        getStarReview(dataRow?.productId);
                                        setOrderDetailId(dataRow?.id);
                                        e.stopPropagation();
                                        console.log(dataRow);
                                        handlersReviewModal.open();
                                    }}
                                >
                                    <StarFilled style={{ fontSize:20, color:'yellow' }}/>
                                </Button>
                            </BaseTooltip>
                        ),
                    };
                };
            },
        });
    console.log(data);

    const columns = [
        {
            title: '#',
            dataIndex: 'image',
            align: 'center',
            width: 40,
            render: (avatar) => (
                <AvatarField
                    size="large"
                    icon={<UserOutlined />}
                    src={avatar ? avatar : null}
                />
            ),
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            align: 'center',
        },
        {
            title: 'Màu',
            dataIndex: 'color',
            align: 'center',
            // render: (createdDate) => {
            //     const result = convertUtcToLocalTime(createdDate, DEFAULT_FORMAT, DATE_FORMAT_VALUE);
            //     return <div>{result}</div>;
            // },
        },
        {
            title: 'Số lượng',
            dataIndex: 'amount',
            align: 'center',
        },
        {
            title: 'Đơn giá',
            dataIndex: ['price'],
            name: 'price',
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
        mixinFuncs.renderActionColumn({ review: true }, { width: '120px' }),
    ];

    const searchFields = [
        {
            key: 'name',
            placeholder: 'Tên sản phẩm',
        },
    ];
    const breadRoutes = [
        { breadcrumbName: "Đơn hàng", path:routes.OrderPageAdmin.path },
        { breadcrumbName: translate.formatMessage(message.objectName) },
    ];

    const { data: dataListReview, loading:dataListLoading, execute: listReview } = useFetch(
        apiConfig.review.getByProduct,
        { immediate: false,
            mappingData: ({ data }) => data.content,
        });

    const getListReview = (id) => {
        listReview({
            pathParams: {
                id : id,
            },
        });
    };
    const { data: starData,loading:starDataLoading, execute: starReview } = useFetch(
        apiConfig.review.starListReview,
        { immediate: false,
            mappingData: ({ data }) => data.content,
        });

    const getStarReview = (id) => {
        starReview({
            pathParams: {
                productId : id,
            },
        });
    };

    return (
        <PageWrapper routes={breadRoutes}>
            <ReviewListModal
                open={openReviewModal}
                onCancel={() => handlersReviewModal.close()}
                data={dataListReview || {}}
                // courseId = {courseId}
                orderDetailId={orderDetailId}
                star={starData}
                // loading={dataListLoading || starDataLoading || loadingData}
                width={800}
            />
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
                // actionBar={mixinFuncs.renderActionBar()}
                baseTable={
                    <BaseTable
                        onChange={changePagination}
                        pagination={pagination}
                        loading={loading}
                        dataSource={data}
                        columns={columns}
                    />
                }
            />
        </PageWrapper>
    );
};

export default DetailOrder;
