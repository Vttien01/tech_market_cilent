import { AppConstants, apiUrl } from '.';

const baseHeader = {
    'Content-Type': 'application/json',
};

const multipartFormHeader = {
    'Content-Type': 'multipart/form-data',
};

const apiConfig = {
    account: {
        loginBasic: {
            baseURL: `${apiUrl}api/token`,
            method: 'POST',
            headers: baseHeader,
        },
        getProfile: {
            baseURL: `${apiUrl}v1/account/profile`,
            method: 'GET',
            headers: baseHeader,
        },
        updateProfile: {
            baseURL: `${apiUrl}v1/account/update_profile`,
            method: 'PUT',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/account/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        refreshToken: {
            baseURL: `${apiUrl}v1/account/refresh_token`,
            method: 'POST',
            headers: baseHeader,
        },
        forgetpasswordAccount: {
            baseURL: `${apiUrl}v1/account/forget_password`,
            method: 'POST',
            headers: baseHeader,
        },
        requestForgetPassword: {
            baseURL: `${apiUrl}v1/account/request_forget_password`,
            method: 'POST',
            headers: baseHeader,
        },
        logout: {
            baseURL: `${apiUrl}v1/account/logout`,
            method: 'GET',
            headers: baseHeader,
        },
        getList: {
            baseURL: `${apiUrl}v1/account/list`,
            method: `GET`,
            headers: baseHeader,
        },
        createAdmin: {
            baseURL: `${apiUrl}v1/account/create_employee`,
            method: `POST`,
            headers: baseHeader,
        },
        updateAdmin: {
            baseURL: `${apiUrl}v1/account/update_admin`,
            method: `PUT`,
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/account/delete/:id`,
            method: `DELETE`,
            headers: baseHeader,
        },
    },
    user: {
        getList: {
            baseURL: `${apiUrl}v1/user/list`,
            method: `GET`,
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/user/get/:id`,
            method: `GET`,
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/user/signup`,
            method: `POST`,
            headers: baseHeader,
        },

        forgetPassword: {
            baseURL: `${apiUrl}v1/user/confirm_otp`,
            method: `POST`,
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/user/update-profile`,
            method: `PUT`,
            headers: baseHeader,
        },
        updateProfile: {
            baseURL: `${apiUrl}v1/user/update-profile`,
            method: `PUT`,
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/user/delete/:id`,
            method: `DELETE`,
            headers: baseHeader,
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/user/auto-complete`,
            method: `GET`,
            headers: baseHeader,
        },
        getProfile: {
            baseURL: `${apiUrl}v1/user/get-myprofile`,
            method: `GET`,
            headers: baseHeader,
        },
    },
    file: {
        upload: {
            path: `${apiUrl}v1/file/upload`,
            method: 'POST',
            headers: multipartFormHeader,
        },
        image: {
            path: `${AppConstants.mediaRootUrl}admin/v1/image/upload`,
            method: 'POST',
            headers: multipartFormHeader,
        },
        video: {
            path: `${AppConstants.mediaRootUrl}admin/v1/video/upload`,
            method: 'POST',
            headers: multipartFormHeader,
        },
    },
    category: {
        getList: {
            baseURL: `${apiUrl}v1/category/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/category/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/category/create`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/category/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/category/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/category/auto-complete`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    languages: {
        getList: {
            baseURL: `${apiUrl}admin/v1/languages`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    groupPermission: {
        getGroupList: {
            baseURL: `${apiUrl}v1/group/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getList: {
            baseURL: `${apiUrl}v1/group/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getPemissionList: {
            baseURL: `${apiUrl}v1/permission/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/group/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/group/create`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/group/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/group/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        getGroupListCombobox: {
            baseURL: `${apiUrl}v1/group/list_combobox`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    branchs: {
        getListCombobox: {
            baseURL: `${apiUrl}v1/branch/list_combobox`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    news: {
        getList: {
            baseURL: `${apiUrl}v1/news/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/news/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/news/create`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/news/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/news/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
    },
    address: {
        autocomplete: {
            baseURL: `${apiUrl}v1/address/auto-complete`,
            method: 'GET',
            headers: baseHeader,
        },
        getList: {
            baseURL: `${apiUrl}v1/address/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/address/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/address/create`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/address/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/address/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        getMyAddress: {
            baseURL: `${apiUrl}v1/address/get-myAddress`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    nation: {
        getList: {
            baseURL: `${apiUrl}v1/nation/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/nation/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/nation/create`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/nation/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/nation/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/nation/auto-complete`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    settings: {
        getSettingsList: {
            baseURL: `${apiUrl}v1/settings/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getList: {
            baseURL: `${apiUrl}v1/settings/list`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/settings/get/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}v1/settings/create`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}v1/settings/update`,
            method: 'PUT',
            headers: baseHeader,
        },
        delete: {
            baseURL: `${apiUrl}v1/settings/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/settings/auto-complete`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    brand: {
        getList: {
            baseURL: `${apiUrl}v1/brand/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getById: {
            baseURL: `${apiUrl}v1/brand/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiUrl}v1/brand/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiUrl}v1/brand/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiUrl}v1/brand/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/brand/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    product: {
        getList: {
            baseURL: `${apiUrl}v1/product/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getById: {
            baseURL: `${apiUrl}v1/product/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiUrl}v1/product/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiUrl}v1/product/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiUrl}v1/product/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/product/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        top10BestSellingt: {
            baseURL: `${apiUrl}v1/product/get-product-top10`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getProductAutocomplete: {
            baseURL: `${apiUrl}v1/product/get-autoComplete/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    review: {
        getByProductPublic: {
            baseURL: `${apiUrl}v1/review/get-by-product-public/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },

        getByProduct: {
            baseURL: `${apiUrl}v1/review/get-by-product/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiUrl}v1/review/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiUrl}v1/review/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiUrl}v1/review/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },

        getMyReview: {
            baseURL: `${apiUrl}v1/review/get-my-review`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },

        getUnratedProduct: {
            baseURL: `${apiUrl}v1/review/get-unrated-product`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },

        avgStarReviews: {
            baseURL: `${apiUrl}v1/review/star/:productId`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },

        starListReview: {
            baseURL: `${apiUrl}v1/review/star/count-for-each/:productId`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    order: {
        getList: {
            baseURL: `${apiUrl}v1/order/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getById: {
            baseURL: `${apiUrl}v1/order/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiUrl}v1/order/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        createForUser: {
            baseURL: `${apiUrl}v1/order/create-for-user`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiUrl}v1/order/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        updateMyOrder: {
            baseURL: `${apiUrl}v1/order/update-my-order`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        cancelMyOrder: {
            baseURL: `${apiUrl}v1/order/cancel-my-order`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        myOrder: {
            baseURL: `${apiUrl}v1/order/my-order`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getOrderPhone: {
            baseURL: `${apiUrl}v1/order/get-order-phone`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    cart: {
        getList: {
            baseURL: `${apiUrl}v1/cart/get-my-cart`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        add: {
            baseURL: `${apiUrl}v1/cart/add-product-into-cart`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiUrl}v1/cart/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        updateItemCart: {
            baseURL: `${apiUrl}v1/cart/update-item-inCart`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiUrl}v1/cart/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    transaction: {
        cancelPay: {
            baseURL: `${apiUrl}v1/transaction/deposit/cancel`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },

        successPay: {
            baseURL: `${apiUrl}v1/transaction/deposit/success`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiUrl}v1/transaction/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    orderDetail: {
        getByOrder: {
            baseURL: `${apiUrl}v1/order-detail/get-by-order/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },

        getByPhoneAndOrder: {
            baseURL: `${apiUrl}v1/order-detail/get-by-orderCode`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    revenue: {
        getRevenue: {
            baseURL: `${apiUrl}v1/revenue/get-revenue`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },

        getRevenueMonth: {
            baseURL: `${apiUrl}v1/revenue/get-revenue-month`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },

        getRevenueOfEachProduct: {
            baseURL: `${apiUrl}v1/revenue/get-revenue-of-each-product`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
};

export default apiConfig;
