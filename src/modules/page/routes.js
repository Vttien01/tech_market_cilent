import apiConfig from '@constants/apiConfig';
import ProductHomePage from './ProductHome';
import IntroductionHomePage from './IntroductionHome';
import ContactHome from './ContactHome';
import ExperienceHome from './ExperienceHome';
import HomePage from './HomePage/HomePage';
import ProductSinglePage from './ProductSinglePage/ProductSinglePage';
import OrderPage from './OrderPage/OrderPage';
import ResultFail from './OrderPage/ResultFail';
import ResultSucces from './OrderPage/ResultSucces';
import HistoryOrderPage from './HistoryOrder/HistoryOrderPage';
import HistoryOrderGuest from './HistoryOrder/HistoryOrderGuest';
import OrderAdminPage from '@modules/orderAdmin';
import OrderAdminSavePage from '@modules/orderAdmin/OrderAdminSavePage';
import DashboardPage from './Components/Dashbaord/DashBoardPage';
import EvaluatePage from './ReviewPage/EvaluatePage';

export default {
    ProductHomePage1: {
        path: '/all-product',
        component: ProductHomePage,
        auth: null,
        title: 'Tất cả sản phẩm',
    },
    IntroductionHome: {
        path: '/introduction',
        component: IntroductionHomePage,
        auth: null,
        title: 'Giới thiệu trang web',
    },
    ContactHome: {
        path: '/contact',
        component: ContactHome,
        auth: null,
        title: 'Liên hệ với chúng tôi',
    },
    ExperienceHome: {
        path: '/experience',
        component: ExperienceHome,
        auth: null,
        title: 'Kinh nghiệm hay',
    },
    ProductOfCategory: {
        path: '/all-product/:categoryId',
        component: ProductHomePage,
        auth: null,
        title: 'Điện thoại thông minh',
    },
    HomePage: {
        path: '/home',
        component: HomePage,
        auth: null,
        title: 'Trang chủ',
    },
    ProductDetails: {
        path: '/productdetail/:id',
        component: ProductSinglePage,
        auth: null,
        title: 'Trang chủ',
    },
    OderPage: {
        path: '/my-order',
        component: OrderPage,
        auth: null,
        title: 'Đặt hàng',
    },
    ResultFail: {
        path: '/my-order-fail',
        component: ResultFail,
        auth: null,
        title: 'Đặt hàng thất bại',
    },
    ResultSuccess: {
        path: '/my-order-success',
        component: ResultSucces,
        auth: null,
        title: 'Đặt hàng thành công',
    },
    HistoryOrder: {
        path: '/history-order',
        component: HistoryOrderPage,
        auth: null,
        title: 'Đặt hàng thành công',
    },
    HistoryOrderGuest: {
        path: '/history-order-guest',
        component: HistoryOrderGuest,
        auth: null,
        title: 'Đặt hàng thành công',
    },
    DashboardPage: {
        path: '/statistical',
        component: DashboardPage,
        auth: true,
        title: 'Statistical Page',
        permissions: [apiConfig.revenue.getRevenue.baseURL, apiConfig.revenue.getRevenueOfEachProduct.baseURL, apiConfig.revenue.getRevenueMonth.baseURL],
    },
    EvaluatePage: {
        path: '/review',
        component: EvaluatePage,
        auth: null,
        title: 'Evaluate Page',
        // permissions: [apiConfig.order.create.baseURL, apiConfig.order.update.baseURL],
    },
};
