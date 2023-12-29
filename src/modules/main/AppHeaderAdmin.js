/* eslint-disable react/no-unknown-property */
import {
    DownOutlined,
    HomeOutlined,
    LoginOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TranslationOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Layout, Menu, Space } from 'antd';
import React from 'react';
const { Header } = Layout;

import { AppConstants } from '@constants';
import apiConfig from '@constants/apiConfig';
import useAuth from '@hooks/useAuth';
import useFetch from '@hooks/useFetch';
import useLocale from '@hooks/useLocale';
import useTranslate from '@hooks/useTranslate';
import routes from '@routes';
import { removeCacheToken } from '@services/userService';
import { accountActions, appActions } from '@store/actions';
import { defineMessages } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './AppHeader.module.scss';

const messages = defineMessages({
    profile: 'Profile',
    logout: 'Logout',
    locale: '{locale, select, en {Vietnamese} other {English}}',
    home: 'Home',
});

const AppHeader = ({ collapsed, onCollapse }) => {
    const { locale } = useLocale();
    const { profile } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { execute: executeLogout } = useFetch(apiConfig.account.logout);
    const translate = useTranslate();

    const handleChangeLocale = () => {
        dispatch(appActions.changeLanguage(locale === 'vi' ? 'en' : 'vi'));
    };

    const onLogout = () => {
        removeCacheToken();
        dispatch(accountActions.logout());
        navigate(routes.loginPage.path);
    };

    return (
        <Header className={styles.appHeader} style={{ padding: 0, background: 'white' }}>
            <span className={styles.iconCollapse} onClick={onCollapse}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
            <Menu
                mode="horizontal"
                className={styles.rightMenu}
                selectedKeys={[]}
                items={[
                    {
                        key: 'menu',
                        label: (
                            <Space>
                                <Avatar
                                    icon={<UserOutlined />}
                                    src={`${AppConstants.contentRootUrl}${
                                        profile.logoPath || profile.avatar || profile.logo
                                    }`}
                                />
                                {profile?.careerName ||
                                    profile?.leaderName ||
                                    profile?.fullName ||
                                    profile?.companyName}
                                <DownOutlined />
                            </Space>
                        ),
                        children: [
                            {
                                label: (
                                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                        <HomeOutlined />
                                        <span>{translate.formatMessage(messages.home)}</span>
                                    </div>
                                ),
                                key: 'allProduct',
                                onClick: () => navigate('/all-product'),
                            },
                            {
                                label: (
                                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                        <UserOutlined />
                                        <span>{translate.formatMessage(messages.profile)}</span>
                                    </div>
                                ),
                                key: 'profile',
                                onClick: () => navigate('/profile'),
                            },
                            {
                                // label: translate.formatMessage(messages.locale, { locale }),
                                label: (
                                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                        <TranslationOutlined />
                                        <span>{translate.formatMessage(messages.locale, { locale })}</span>
                                    </div>
                                ),
                                key: 'locale',
                                // icon: <TranslationOutlined />,
                                onClick: handleChangeLocale,
                            },
                            {
                                label: (
                                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                        <LoginOutlined />
                                        <span>{translate.formatMessage(messages.logout)}</span>
                                    </div>
                                ),
                                key: 'logout',
                                onClick: onLogout,
                            },
                        ],
                    },
                ]}
            />
        </Header>
    );
};

export default AppHeader;
