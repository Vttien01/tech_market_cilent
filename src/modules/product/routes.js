import apiConfig from "@constants/apiConfig";
import ProductListPage from ".";
import ProductSavePage from "./ProductSavePage";

export default {
    productListPage: {
        path: '/product',
        title: 'Product',
        auth: true,
        component: ProductListPage,
        permissions: [apiConfig.product.getList.baseURL],
    },
    productSavePage: {
        path: '/product/:id',
        title: 'Product Save Page',
        auth: true,
        component: ProductSavePage,
        permissions: [apiConfig.product.create.baseURL, apiConfig.product.update.baseURL],
    },
};
