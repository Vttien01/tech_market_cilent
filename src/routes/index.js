import PageNotAllowed from '@components/common/page/PageNotAllowed';
import PageNotFound from '@components/common/page/PageNotFound';
import BrandRoutes from '@modules/brand/routes';
import Dashboard from '@modules/entry';
import GroupPermissionListPage from '@modules/groupPermission';
import PermissionSavePage from '@modules/groupPermission/PermissionSavePage';
import SettingListPage from '@modules/listSetting';
import SettingSavePage from '@modules/listSetting/SettingSavePage';
import LoginPage from '@modules/login/index';
import nationRoutes from '@modules/nation/routes';
import newsRoutes from '@modules/news/routes';
import OrderAdmin from '@modules/orderAdmin/routes';
import ProductHomePageRoutes from '@modules/page/routes';
import ProductRoutes from '@modules/product/routes';
import ProfilePage from '@modules/profile/index';
import ProfileUser from '@modules/profileUser/routes';
import SignupPage from '@modules/signup';
import adminsRoutes from '@modules/user/routes';

/*
	auth
		+ null: access login and not login
		+ true: access login only
		+ false: access not login only
*/
const routes = {
    pageNotAllowed: {
        path: '/not-allowed',
        component: PageNotAllowed,
        auth: null,
        title: 'Page not allowed',
    },
    homePage: {
        path: '/',
        component: Dashboard,
        auth: true,
        title: 'Home',
    },
    settingPage: {
        path: '/setting',
        component: Dashboard,
        auth: true,
        title: 'Setting',
    },
    loginPage: {
        path: '/login',
        component: LoginPage,
        auth: false,
        title: 'Login page',
    },
    signupPage: {
        path: '/signup',
        component: SignupPage,
        auth: false,
        title: 'Signup page',
    },
    profilePage: {
        path: '/profile',
        component: ProfilePage,
        auth: true,
        title: 'Profile page',
    },
    groupPermissionPage: {
        path: '/group-permission',
        component: GroupPermissionListPage,
        auth: true,
        title: 'Profile page',
    },
    groupPermissionSavePage: {
        path: '/group-permission/:id',
        component: PermissionSavePage,
        auth: true,
        title: 'Profile page',
    },
    listSettingsPage:{
        path:'/settings',
        component:SettingListPage,
        auth: true,
        title: 'Settings page',
    },
    listSettingsPageSavePage: {
        path: '/settings/:id',
        component: SettingSavePage,
        auth: true,
        title: 'Settings page',
    },
    ...adminsRoutes,
    ...newsRoutes,
    ...nationRoutes,
    ...ProductHomePageRoutes,
    ...BrandRoutes,
    ...ProductRoutes,
    ...OrderAdmin,
    ...ProfileUser,


    // keep this at last
    notFound: {
        component: PageNotFound,
        auth: null,
        title: 'Page not found',
        path: '*',
    },
};

export default routes;
