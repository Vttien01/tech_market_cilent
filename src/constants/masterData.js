import {
    ACTIVE_ACCOUNT,
    ACTIVE_USER,
    COD_METHOD,
    DISTRICT_KIND,
    LOCKED_ACCOUNT,
    LOCKED_USER,
    NO_ACTIVE_USER,
    PAYPAL_METHOD,
    PROVINCE_KIND,
    STATE_CANCELED,
    STATE_CANCELED_ADMIN,
    STATE_COMPLETED,
    STATE_COMPLETED_ADMIN,
    STATE_CONFIRMED,
    STATE_CONFIRMED_ADMIN,
    STATE_NOPAID,
    STATE_PAIDED,
    STATE_PENDING,
    STATE_PENDING_ADMIN,
    STATUS_ACTIVE,
    STATUS_INACTIVE,
    STATUS_PENDING,
    VILLAGE_KIND,
} from '@constants';
import { defineMessages } from 'react-intl';
import { nationKindMessage } from './intl';

const commonMessage = defineMessages({
    statusActive: 'Active',
    statusPending: 'Pending',
    statusInactive: 'Inactive',
});

const paymentMessage = defineMessages({
    PAYPAL_METHOD: 'PayPal',
    COD_METHOD: 'Tiền mặt',
});

const userStateMessage = defineMessages({
    LOCKED_USER: 'Khóa',
    ACTIVE_USER: 'Kích hoạt',
    NO_ACTIVE_USER: 'Chưa kích hoạt',
});

const accountStatusMessage = defineMessages({
    LOCKED_ACCOUNT: 'Khóa',
    ACTIVE_ACCOUNT: 'Đang hoạt động',
});

const orderStateMessage = defineMessages({
    STATE_PENDING: 'Đang xử lý',
    STATE_CONFIRMED: 'Đã được duyệt',
    STATE_COMPLETED: 'Đã hoàn thành',
    STATE_CANCELED: 'Đã hủy',

});
const orderStateAdMessage = defineMessages({
    STATE_PENDING_ADMIN: 'Đang xử lý',
    STATE_CONFIRMED_ADMIN: 'Duyệt',
    STATE_COMPLETED_ADMIN: 'Hoàn thành',
    STATE_CANCELED_ADMIN: 'Hủy',

});

const isPaidMessage = defineMessages({
    STATE_NOPAID: 'Chưa thanh toán',
    STATE_PAIDEDD: 'Đã thanh toán',
});

export const languageOptions = [
    { value: 1, label: 'EN' },
    { value: 2, label: 'VN' },
    { value: 3, label: 'Other' },
];

export const orderOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
];

export const commonStatus = [
    { value: STATUS_ACTIVE, label: 'Active', color: 'green' },
    { value: STATUS_PENDING, label: 'Pending', color: 'warning' },
    { value: STATUS_INACTIVE, label: 'Inactive', color: 'red' },
];

export const orderStateOption = [
    { value: STATE_PENDING, label: orderStateMessage.STATE_PENDING, color: '#07c1be' },
    { value: STATE_CONFIRMED, label: orderStateMessage.STATE_CONFIRMED, color: '#d9d208' },
    { value: STATE_COMPLETED, label: orderStateMessage.STATE_COMPLETED, color: '#25f221' },
    { value: STATE_CANCELED, label: orderStateMessage.STATE_CANCELED, color: '#f52828' },
];

export const orderStateValue = [
    { value: STATE_PENDING_ADMIN, label: orderStateAdMessage.STATE_PENDING_ADMIN, color: '#d4d61d' },
    { value: STATE_CONFIRMED_ADMIN, label: orderStateAdMessage.STATE_CONFIRMED_ADMIN, color: '#46c956' },
    { value: STATE_COMPLETED_ADMIN, label: orderStateAdMessage.STATE_COMPLETED_ADMIN, color: '#9af099' },
    { value: STATE_CANCELED_ADMIN, label: orderStateAdMessage.STATE_CANCELED_ADMIN, color: '#f52828' },
];

export const paidOptions = [
    { value: STATE_NOPAID, label: isPaidMessage.STATE_NOPAID },
    { value: STATE_PAIDED, label: isPaidMessage.STATE_PAIDEDD },
];

export const paidValues = [
    { value: STATE_NOPAID, label: isPaidMessage.STATE_NOPAID, color:'yellow' },
    { value: STATE_PAIDED, label: isPaidMessage.STATE_PAIDEDD, color:'green' },
];

export const statusOptions = [
    { value: STATUS_ACTIVE, label: commonMessage.statusActive, color: '#00A648' },
    { value: STATUS_PENDING, label: commonMessage.statusPending, color: '#FFBF00' },
    { value: STATUS_INACTIVE, label: commonMessage.statusInactive, color: '#CC0000' },
];

export const paymentOptions = [
    { value: COD_METHOD, label: paymentMessage.COD_METHOD, color: '#00A648' },
    { value: PAYPAL_METHOD, label: paymentMessage.PAYPAL_METHOD, color: '#00adf9' },
];

export const userSateteOptions = [
    { value: LOCKED_USER, label: userStateMessage.LOCKED_USER, color: 'red' },
    { value: NO_ACTIVE_USER, label: userStateMessage.NO_ACTIVE_USER, color: 'yellow' },
    { value: ACTIVE_USER, label: userStateMessage.ACTIVE_USER, color: 'green' },
];

export const accountStatusOptions = [
    { value: LOCKED_ACCOUNT, label: userStateMessage.LOCKED_USER, color: 'red' },
    { value: ACTIVE_ACCOUNT, label: userStateMessage.ACTIVE_USER, color: 'green' },
];

export const userStatusOptions = [
    { value: LOCKED_USER, label: accountStatusMessage.LOCKED_ACCOUNT },
    { value: ACTIVE_USER, label: accountStatusMessage.ACTIVE_ACCOUNT },
];

export const formSize = {
    small: '700px',
    normal: '800px',
    big: '900px',
};

export const nationKindOptions = [
    {
        value: PROVINCE_KIND,
        label: nationKindMessage.province,
    },
    {
        value: DISTRICT_KIND,
        label: nationKindMessage.district,
    },
    {
        value: VILLAGE_KIND,
        label: nationKindMessage.village,
    },
];
