import { commonMessage } from '@locales/intl';

export const apiUrl = process.env.REACT_APP_API;
export const enableExposure = process.env.REACT_APP_ENABLE_EXPOSURE === 'true';

export const fixedPath = {
    privacy: `${apiUrl}${process.env.REACT_APP_PRIVACY_PATH}`,
    help: `${apiUrl}${process.env.REACT_APP_HELP_PATH}`,
    aboutUs: `${apiUrl}${process.env.REACT_APP_ABOUT_US_PATH}`,
};

export const brandName = 'Tech-Market';

export const appName = 'tect-market-app';

export const storageKeys = {
    USER_ACCESS_TOKEN: `${appName}-user-access-token`,
    USER_REFRESH_TOKEN: `${appName}-user-refresh-token`,
};

export const AppConstants = {
    apiRootUrl: process.env.REACT_APP_API,
    contentRootUrl: `${process.env.REACT_APP_API_MEDIA}v1/file/download`,
    mediaRootUrl: `${process.env.REACT_APP_API_MEDIA}`,
    langKey: 'vi',
};

export const THEMES = {
    DARK: 'dark',
    LIGHT: 'light',
};

export const defaultLocale = 'en';
export const locales = ['en', 'vi'];

export const activityType = {
    GAME: 'game',
    VIDEO: 'video',
    ARTICLE: 'article',
    FOCUS_AREA: 'focus-area',
};

export const DATE_DISPLAY_FORMAT = 'DD-MM-YYYY HH:mm';
export const DATE_SHORT_MONTH_FORMAT = 'DD MMM YYYY';
export const TIME_FORMAT_DISPLAY = 'HH:mm';
export const DATE_FORMAT_VALUE = 'DD/MM/YYYY';
export const DATE_FORMAT_DISPLAY = 'DD/MM/YYYY';
export const DEFAULT_FORMAT = 'DD/MM/YYYY HH:mm:ss';

export const navigateTypeEnum = {
    PUSH: 'PUSH',
    POP: 'POP',
    REPLACE: 'REPLACE',
};

export const articleTypeEnum = {
    URL: 'url',
    PLAIN: 'plain',
};

export const accessRouteTypeEnum = {
    NOT_LOGIN: false,
    REQUIRE_LOGIN: true,
    BOTH: null,
};

export const UploadFileTypes = {
    AVATAR: 'AVATAR',
    LOGO: 'LOGO',
    DOCUMENT: 'DOCUMENT',
};

export const UserTypes = {
    ADMIN: 1,
    EMPLOYEE: 2,
    CUSTOMER: 3,
    LEADER: 4,
    COMPANY: 5,
};

export const MANAGER_LOGIN_TYPE = 'password';
export const ADMIN_LOGIN_TYPE = 'password';
export const CUSTOMER_LOGIN_TYPE = 'user';

export const loginOptions = [
    // { label: 'ADMIN', value: ADMIN_LOGIN_TYPE  },
    { label: 'KHÁCH HÀNG', value: CUSTOMER_LOGIN_TYPE },
    { label: 'QUẢN LÝ', value: MANAGER_LOGIN_TYPE },
];

export const LIMIT_IMAGE_SIZE = 512000;

export const STATUS_PENDING = 0;
export const STATUS_ACTIVE = 1;
export const STATUS_INACTIVE = -1;
export const STATUS_DELETE = -2;

export const STATE_PENDING = 1;
export const STATE_CONFIRMED = 2;
export const STATE_CANCELED = 3;
export const STATE_COMPLETED = 4;

export const STATE_PENDING_ADMIN = 1;
export const STATE_CONFIRMED_ADMIN = 2;
export const STATE_CANCELED_ADMIN = 3;
export const STATE_COMPLETED_ADMIN = 4;

export const STATE_NOPAID = false;
export const STATE_PAIDED = true;

export const DEFAULT_TABLE_ITEM_SIZE = 10;
export const DEFAULT_TABLE_PAGE_START = 0;

export const PAYPAL_METHOD = 1;
export const COD_METHOD = 0;

export const LOCKED_USER = -1;
export const NO_ACTIVE_USER = 0;
export const ACTIVE_USER = 1;

export const LOCKED_ACCOUNT = -1;
export const ACTIVE_ACCOUNT = 1;
// export const VNPAY_METHOD = 3;

export const commonStatus = {
    PENDING: 0,
    ACTIVE: 1,
    INACTIVE: -1,
    DELETE: -2,
};

export const commonStatusColor = {
    [commonStatus.PENDING]: 'warning',
    [commonStatus.ACTIVE]: 'green',
    [commonStatus.INACTIVE]: 'red',
};

export const categoryKind = {
    news: 1,
};

export const appAccount = {
    APP_USERNAME: process.env.REACT_APP_USERNAME,
    APP_PASSWORD: process.env.REACT_APP_PASSWORD,
};

export const GROUP_KIND_ADMIN = 1;
export const GROUP_KIND_EMPLOYEE = 2;
export const GROUP_KIND_USER = 3;

export const GROUP_ROLE_MANAGER = 15;
export const GROUP_ROLE_EMPLOYEE = 14;

export const GENDER_MAN = 0;
export const GENDER_WOWAN = 1;
export const GENDER_OTHER = 2;


export const groupPermissionKindsOptions = [
    { label: 'Admin', value: GROUP_KIND_ADMIN },
    { label: 'User', value: GROUP_KIND_USER },
];

export const genderValues = [
    { label: 'Nam', value: GENDER_MAN },
    { label: 'Nữ', value: GENDER_WOWAN },
    { label: 'kHÁC', value: GENDER_OTHER },
];

export const isSystemSettingOptions = [
    { label: commonMessage.showSystemSettings, value: 1 },
    { label: commonMessage.hideSystemSettings, value: 0 },
];

export const PROVINCE_KIND = 1;
export const DISTRICT_KIND = 2;
export const VILLAGE_KIND = 3;

export const SettingTypes = {
    Money: 'Money',
    Timezone: 'Timezone',
    System: 'System',
};

export const CurrentcyPositions = {
    FRONT: 0,
    BACK: 1,
};

export const paymentSelect = [
    { label: 'Thanh toán tiền mặt', value: 0 },
    { label: 'Thanh toán PAYPAL', value: 1 },
];
