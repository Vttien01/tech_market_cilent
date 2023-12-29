import apiConfig from '@constants/apiConfig';
import OrderAdminPage from '.';
import DetailOrder from './DetailOrder';
import OrderAdminSavePage from './OrderAdminSavePage';
export default {
    OrderPageAdmin: {
        path: '/order-admin',
        component: OrderAdminPage,
        auth: true,
        title: 'Quản lý đơn hàng',
    },
    DetailOrderAdmin: {
        path: '/order-admin/detai-order',
        component: DetailOrder,
        auth: true,
        title: 'Quản lý chi tiết đơn hàng',
    },
    OrderPageAdminSavePage: {
        path: '/order-admin/:id',
        component: OrderAdminSavePage,
        auth: true,
        title: 'Oder Admin Save Page',
        permissions: [apiConfig.order.create.baseURL, apiConfig.order.update.baseURL],
    },
};
