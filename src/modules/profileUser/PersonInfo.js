import { UserOutlined } from '@ant-design/icons';
import ListPage from '@components/common/layout/ListPage';
import PageWrapper from '@components/common/layout/PageWrapper';
import BaseTable from '@components/common/table/BaseTable';
import { DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import apiConfig from '@constants/apiConfig';
import { accountStatusOptions } from '@constants/masterData';
import useAuth from '@hooks/useAuth';
import useListBase from '@hooks/useListBase';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@locales/intl';
import routes from '@routes';
import { IconEdit, IconStar } from '@tabler/icons-react';
import { Avatar, Card, Divider, Space, Tag, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import { defineMessages } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';
import './PersonInfo.scss';

const message = defineMessages({
    objectName: 'Trang cá nhân',
});

const PersonInfo = () => {
    const navigate = useNavigate();
    const { profile } = useAuth();
    const translate = useTranslate();
    const [detail, setDetail] = useState({});
    const { pathname: pagePath } = useLocation();
    // const { execute, data: infoUser } = useFetch({ ...apiConfig.user.getProfile }, { immediate: false });
    // console.log(infoUser);
    // const { execute, loading } = useFetch({ ...apiConfig.account.getProfile }, { immediate: false });
    // const { execute: executeGetProfile } = useFetchAction(accountActions.getProfile);

    // useEffect(() => {
    //     execute({
    //         onCompleted: (response) => {
    //             if (response.result === true) setDetail(response.data);
    //         },
    //         onError: mixinFuncs.handleGetDetailError,
    //     });
    // }, []);

    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        // apiConfig: apiConfig.address,
        apiConfig: {
            getList: apiConfig.address.getMyAddress,
            delete: apiConfig.address.delete,
            update: apiConfig.address.update,
            getById: apiConfig.address.getById,
        },
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: 'Thông tin cá nhân',
        },
        params: {
            userId: profile.id,
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
                return `${pagePath}/address/create?userId=${profile.id}`;
            };
            funcs.getItemDetailLink = (dataRow) => {
                return `${pagePath}/address/${dataRow.id}?userId=${profile.id}`;
                // params:{},
            };
        },
    });

    const columns = [
        {
            title: translate.formatMessage(commonMessage.Name),
            dataIndex: 'name',
            width: '150',
            align: 'center',
        },
        {
            title: translate.formatMessage(commonMessage.phone),
            dataIndex: 'phone',
            width: '30',
            align: 'center',
        },
        {
            title: translate.formatMessage(commonMessage.address),
            dataIndex: 'address',
            align: 'center',
            // align: 'center',
            render: (address, dataRow) => {
                return (
                    <div>
                        {address}, {dataRow?.wardInfo.name}, {dataRow?.districtInfo.name}, {dataRow?.provinceInfo.name}
                    </div>
                );
            },
        },

        // mixinFuncs.renderStatusColumn({ width: '150px' }),
        mixinFuncs.renderActionColumn({ edit: true, delete: true }, { width: '130px' }),
    ];
    const handleEdit = () => {
        navigate(routes.PersonInfo.path + `/${profile.id}`);
    };

    const handleReview = () => {
        navigate(routes.EvaluatePage.path + `?userId=${profile.id}`);
    };

    const breadRoutes = [{ breadcrumbName: translate.formatMessage(message.objectName) }];

    return (
        <div style={{ width: 1500, display: 'flex', justifyContent: 'center', marginTop:20 }}>
            <PageWrapper routes={breadRoutes}>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '30px 0px' }}>
                    {/* <Card  style={{ minHeight: 800, width: 400, backgroundColor: '#ffd400', marginRight:0 }}></Card>
            <Card  style={{ minHeight: 800, width: 400, backgroundColor: '#ffd400', marginLeft:0 }}></Card> */}
                    <Space className="rounded-square-left" direction="vertical">
                        <Avatar size={200} icon={<UserOutlined />} />
                        <Typography.Title style={{ fontSize: 35 }}>Người dùng</Typography.Title>
                        <Typography.Title level={3}>{profile?.username}</Typography.Title>
                        <Space>
                            <Tooltip placement="bottom" title="Sửa thông tin cá nhân">
                                <IconEdit
                                    size={40}
                                    color="#282a36"
                                    onClick={handleEdit}
                                    style={{ fontSize: 40, color: '#282a36', cursor: 'pointer' }}
                                />
                            </Tooltip>
                            <Tooltip placement="bottom" title="Đánh giá sản phẩm">
                                <IconStar
                                    size={40}
                                    color="#282a36"
                                    onClick={handleReview}
                                    style={{ marginLeft: 20, fontSize: 40, color: '#282a36', cursor: 'pointer' }}
                                />
                            </Tooltip>
                        </Space>
                    </Space>
                    <Space className="rounded-square-right" direction="vertical">
                        <div className="box-with-border">
                            <Divider orientation="left" style={{ fontSize: 25 }}>
                                Thông tin cá nhân
                            </Divider>
                        </div>
                        <Space direction="horizontal">
                            <DashboardCard title={'Họ và tên'} value={profile?.fullName} />
                            <DashboardCard title={'Email'} value={profile?.email} />
                        </Space>
                        <Space direction="horizontal">
                            <DashboardCard title={'Số điện thoại'} value={profile?.phone} />
                            <DashboardCardStatus title={'Trạng thái hoạt động'} value={profile?.status} />
                        </Space>
                        <Divider orientation="left" style={{ fontSize: 25 }}>
                            Thông tin địa chỉ
                        </Divider>
                        <ListPage
                            actionBar={mixinFuncs.renderActionBar()}
                            style={{ backgroundColor: '#fcd8bc', borderRadius: '0px' }}
                            baseTable={
                                <BaseTable
                                    onChange={mixinFuncs.changePagination}
                                    columns={columns}
                                    dataSource={data}
                                    loading={loading}
                                    pagination={pagination}
                                />
                            }
                        />
                    </Space>
                </div>
            </PageWrapper>
        </div>
    );
};

function DashboardCard({ title, value, icon, icon1, number }) {
    return (
        <Card style={{ minWidth: 350, backgroundColor: '#e7e7e7' }}>
            <Space direction="vertical">
                <Typography.Title style={{ fontSize: 16 }}>{title}</Typography.Title>
                <Typography.Text>{value}</Typography.Text>
            </Space>
        </Card>
    );
}

function DashboardCardStatus({ title, value, icon, icon1, number }) {
    const translate = useTranslate();
    const stateValues = translate.formatKeys(accountStatusOptions, ['label']);
    const state = stateValues.find((item) => item.value == value);
    return (
        <Card style={{ minWidth: 350, backgroundColor: '#e7e7e7' }}>
            <Space direction="vertical">
                <Typography.Title level={5}>{title}</Typography.Title>
                <Tag
                    color={state.color}
                    style={{ width: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <div style={{ padding: '0 0px', fontSize: 14 }}>{state.label}</div>
                </Tag>
            </Space>
        </Card>
    );
}

export default PersonInfo;
