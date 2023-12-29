import apiConfig from '@constants/apiConfig';
import { commonMessage } from '@locales/intl';
import UserAdminListPage from '.';
import UserAdminSavePage from './UserAdminSavePage';
import AddressListPage from './address';
import AddressSavePage from './address/AddressSavePage';
import UserListPage from './users';
import UserSavePage from './users/UserSavePage';
const paths = {
    adminsListPage: '/admins',
    adminsSavePage: '/admins/:id',
    adminsLeaderListPage: '/admins-leader',
    adminsLeaderSavePage: '/admins-leader/:id',
    userListPage: '/user',
    userSavePage: '/user/:id',
    addressListPage:'/user/address',
    personInfo:'/profile-user',
    addressSavePage: '/profile-user/address/:id',
};
export default {
    adminsListPage: {
        path: paths.adminsListPage,
        auth: true,
        component: UserAdminListPage,
        permission: [apiConfig.account.getList.baseURL],
        pageOptions: {
            objectName: commonMessage.admins,
            renderBreadcrumbs: (messages, t = {}) => {
                return [{ breadcrumbName: t.formatMessage(messages.userAdmin) }];
            },
        },
    },
    adminsSavePage: {
        path: paths.adminsSavePage,
        component: UserAdminSavePage,
        separateCheck: true,
        auth: true,
        permission: [apiConfig.account.createAdmin.baseURL, apiConfig.account.updateAdmin.baseURL],
        pageOptions: {
            objectName: commonMessage.admins,
            listPageUrl: paths.adminsListPage,
            renderBreadcrumbs: (messages, t, title = {}) => {
                return [
                    { breadcrumbName: t.formatMessage(messages.userAdmin), path: paths.adminsListPage },
                    { breadcrumbName: title },
                ];
            },
        },
    },

    ///LEADER

    adminsLeaderListPage: {
        path: paths.adminsLeaderListPage,
        auth: true,
        component: UserAdminListPage,
        permission: [apiConfig.user.getList.baseURL],
        pageOptions: {
            objectName: commonMessage.adminsLeader,
            renderBreadcrumbs: (messages, t = {}) => {
                return [{ breadcrumbName: t.formatMessage(messages.userAdminLeader) }];
            },
        },
    },
    adminsLeaderSavePage: {
        path: paths.adminsLeaderSavePage,
        component: UserAdminSavePage,
        separateCheck: true,
        auth: true,
        permission: [apiConfig.user.create.baseURL, apiConfig.user.update.baseURL],
        pageOptions: {
            objectName: commonMessage.adminsLeader,
            listPageUrl: paths.adminsLeaderListPage,
            renderBreadcrumbs: (messages, t, title = {}) => {
                return [
                    { breadcrumbName: t.formatMessage(messages.userAdminLeader), path: paths.adminsLeaderListPage },
                    { breadcrumbName: title },
                ];
            },
        },
    },

    /// USERS

    userListPage: {
        path: paths.userListPage,
        auth: true,
        component: UserListPage,
        permission: [apiConfig.user.getList.baseURL],
        pageOptions: {
            objectName: commonMessage.user,
            renderBreadcrumbs: (messages, t = {}) => {
                return [{ breadcrumbName: t.formatMessage(messages.user) }];
            },
        },
    },
    userSavePage: {
        path: paths.userSavePage,
        component: UserSavePage,
        separateCheck: true,
        auth: true,
        permission: [apiConfig.user.create.baseURL, apiConfig.user.update.baseURL],
        pageOptions: {
            objectName: commonMessage.user,
            listPageUrl: paths.userListPage,
            renderBreadcrumbs: (messages, t, title = {}) => {
                return [
                    { breadcrumbName: t.formatMessage(messages.user), path: paths.userListPage },
                    { breadcrumbName: title },
                ];
            },
        },
    },
    addressListPage: {
        path: paths.addressListPage,
        auth: true,
        component: AddressListPage,
        permission: [apiConfig.address.getList.baseURL],
        pageOptions: {
            objectName: commonMessage.address,
            renderBreadcrumbs: (messages, t = {}) => {
                return [
                    { breadcrumbName: t.formatMessage(messages.user), path: paths.userListPage },
                    { breadcrumbName: t.formatMessage(messages.address) },
                ];
            },
        },
    },
    addressSavePage: {
        path: paths.addressSavePage,
        component: AddressSavePage,
        separateCheck: true,
        auth: null,
        permission: [apiConfig.address.create.baseURL, apiConfig.address.update.baseURL],
        pageOptions: {
            objectName: commonMessage.address,
            listPageUrl: paths.personInfo,
            renderBreadcrumbs: ( t, title = {}) => {
                return [
                    { breadcrumbName: title },
                ];
            },
        },
    },
};
