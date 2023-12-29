/* eslint-disable react/no-unknown-property */
import { UsergroupAddOutlined } from '@ant-design/icons';
import routes from '@routes';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import apiConfig from './apiConfig';

export const navMenuConfig = [
    {
        label: <FormattedMessage defaultMessage="User management" />,
        key: 'user-management',
        icon: <UsergroupAddOutlined />,
        children: [
            {
                label: <FormattedMessage defaultMessage="Nhân viên" />,
                key: 'admin',
                path: routes.adminsListPage.path,
                permission: [apiConfig.account.getList.baseURL],
            },
            {
                label: <FormattedMessage defaultMessage="Người dùng" />,
                key: 'user',
                path: routes.userListPage.path,
                permission: [apiConfig.user.getList.baseURL],
            },
            {
                label: <FormattedMessage  defaultMessage='Thống kê'/>,
                key: 'statistical',
                path: routes.DashboardPage.path,
                // permission: [apiConfig.user.getList.baseURL],
            },
        ],
    },
    {
        label: <FormattedMessage defaultMessage="Quản lý Sản phẩm" />,
        key: 'product-management',
        // eslint-disable-next-line react/no-unknown-property
        icon: <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-building-factory" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0b0101" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 21c1.147 -4.02 1.983 -8.027 2 -12h6c.017 3.973 .853 7.98 2 12" /><path d="M12.5 13h4.5c.025 2.612 .894 5.296 2 8" /><path d="M9 5a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1" /><path d="M3 21l19 0" /></svg>,
        children: [
            {
                label: <FormattedMessage defaultMessage="Thương hiệu" />,
                key: 'brand',
                path: routes.brandListPage.path,
                permission: [apiConfig.brand.getList.baseURL],
            },
            {
                label: <FormattedMessage defaultMessage="Sản phẩm" />,
                key: 'product',
                path: routes.productListPage.path,
                permission: [apiConfig.product.getList.baseURL],
            },
            {
                label: <FormattedMessage defaultMessage="Loại" />,
                key: 'news-category',
                path: routes.newsCategoryListPage.path,
                permission: [apiConfig.category.getList.baseURL],
            },
        ],
    },
    {
        label: <FormattedMessage defaultMessage="News management" />,
        key: 'news-management',
        icon: <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-news" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0b0101" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" /><path d="M8 8l4 0" /><path d="M8 12l4 0" /><path d="M8 16l4 0" /></svg>,
        children: [
            // {
            //     label: <FormattedMessage defaultMessage="News" />,
            //     key: 'news-list',
            //     path: routes.newsListPage.path,
            //     permission: [apiConfig.news.getList.baseURL],
            // },
            // {
            //     label: <FormattedMessage defaultMessage="News category" />,
            //     key: 'news-category',
            //     path: routes.newsCategoryListPage.path,
            //     permission: [apiConfig.category.getList.baseURL],
            // },
        ],
    },
    {
        label: <FormattedMessage defaultMessage="Quản lý đơn hàng" />,
        key: 'order-management',
        // eslint-disable-next-line react/no-unknown-property
        icon: <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-order" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0b0101" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 10h16" /><path d="M4 14h16" /><path d="M9 18l3 3l3 -3" /><path d="M9 6l3 -3l3 3" /></svg>,
        children: [
            {
                label: <FormattedMessage defaultMessage="Đơn hàng" />,
                key: 'order',
                path: routes.OrderPageAdmin.path,
                permission: [apiConfig.order.getList.baseURL],
            },
        ],
    },
    {
        label: <FormattedMessage defaultMessage="Hệ thống" />,
        key: 'system-management',
        icon: <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-settings" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0b0101" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M12 10.5v1.5" /><path d="M12 16v1.5" /><path d="M15.031 12.25l-1.299 .75" /><path d="M10.268 15l-1.3 .75" /><path d="M15 15.803l-1.285 -.773" /><path d="M10.285 12.97l-1.285 -.773" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /></svg>,
        children: [
            {
                label: <FormattedMessage defaultMessage="Role" />,
                key: 'role',
                path: routes.groupPermissionPage.path,
                permission: [apiConfig.groupPermission.getGroupList.baseURL],
            },
            {
                label: <FormattedMessage defaultMessage="List Setting" />,
                key: 'list-setting',
                path: routes.listSettingsPage.path,
                permission: [apiConfig.settings.getSettingsList.baseURL],
            },
            {
                label: <FormattedMessage defaultMessage="Nation" />,
                key: 'nation',
                path: routes.nationListPage.path,
                permission: [apiConfig.nation.getList.baseURL],
            },
        ],
    },
];

export default navMenuConfig;

