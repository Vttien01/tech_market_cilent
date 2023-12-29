import PersonInfo from './PersonInfo';
import ProfileUserSavePage from './ProfileUserSavePage';

export default {
    PersonInfo: {
        path: '/profile-user',
        component: PersonInfo,
        auth: null,
        title: 'Thông tin cá nhân',
    },
    PersonInfoSavePage: {
        path: '/profile-user/:id',
        component: ProfileUserSavePage,
        auth: null,
        title: 'Sửa thông tin cá nhân',
    },
    AddressInfoSavePage: {
        path: '/profile-user/address/:id',
        component: PersonInfo,
        auth: null,
        title: 'Sửa thông tin địa chỉ người dùng',
    },
    // DetailOrderAdmin: {
    //     path: '/order-admin/detai-order',
    //     component: DetailOrder,
    //     auth: null,
    //     title: 'Quản lý chi tiết đơn hàng',
    // },
    // OrderPageAdminSavePage: {
    //     path: '/order-admin/:id',
    //     component: OrderAdminSavePage,
    //     auth: true,
    //     title: 'Oder Admin Save Page',
    //     permissions: [apiConfig.order.create.baseURL, apiConfig.order.update.baseURL],
    // },
};
