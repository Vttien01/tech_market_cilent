import {
    DownOutlined,
    LoginOutlined,
    ToolOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    Avatar,
    ConfigProvider,
    Input,
    Layout,
    Menu,
    Space,
    Typography,
} from 'antd';
import React from 'react';
const { Header } = Layout;

import logo from '@assets/images/logoTech.png';
import apiConfig from '@constants/apiConfig';
import useAuth from '@hooks/useAuth';
import useFetch from '@hooks/useFetch';
import useTranslate from '@hooks/useTranslate';
import AppCart from '@modules/page/AppCart/AppCart';
import SearchBox from '@modules/searchBox/SearchBox';
import routes from '@routes';
import { removeCacheToken } from '@services/userService';
import { accountActions } from '@store/actions';
import { IconAlignBoxBottomCenter } from '@tabler/icons-react';
import { defineMessages } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './AppHeader.module.scss';
const { Search } = Input;
const { Text } = Typography;

const messages = defineMessages({
    profile: 'Profile',
    logout: 'Logout',
    Admin: 'Admin',
});

const AppHeader = ({ collapsed, onCollapse }) => {
    const { profile } = useAuth();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const translate = useTranslate();
    const { execute: executeLogout } = useFetch(apiConfig.account.logout);

    const onLogout = () => {
        removeCacheToken();
        dispatch(accountActions.logout());
        navigate(routes.loginPage.path);
    };

    const itemHeader = () => {
        const items = [
            {
                icon: <AppCart />,
                key: 'cart',
            },
        ];
        if (profile) {
            items.push({
                key: 'menu',
                label: (
                    <Space>
                        <Avatar
                            icon={<UserOutlined />}
                            src={`${profile.logoPath || profile.avatar || profile.logo}`}
                        />
                        {profile?.careerName || profile?.leaderName || profile?.fullName || profile?.companyName}
                        <DownOutlined />
                    </Space>
                ),
                children: [
                    {
                        label: (
                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                <UserOutlined />
                                <span>{translate.formatMessage(messages.profile)}</span>
                            </div>
                        ),
                        key: 'profile',
                        onClick: () => navigate('/profile-user'),
                    },
                    profile?.accountDto?.kind === 2 && {
                        label: (
                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                <ToolOutlined />
                                <span>{translate.formatMessage(messages.Admin)}</span>
                            </div>
                        ),
                        key: 'admin',
                        onClick: () => navigate('/student'),
                    },
                    {
                        key: 'histoy_order',
                        label: (
                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                <IconAlignBoxBottomCenter size={16} />
                                <span>Đơn hàng</span>
                            </div>
                        ),
                        onClick: () => navigate(routes.HistoryOrder.path),
                    },
                    {
                        label: (
                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                <LoginOutlined />
                                <span>Đăng xuất</span>
                            </div>
                        ),
                        key: 'logout',
                        onClick: onLogout,
                    },
                ],
            });
        } else {
            items.push(
                {
                    key: 'Log_in',
                    label: <span>Đăng nhập</span>,
                    onClick: () => navigate(routes.loginPage.path),
                },
                {
                    key: 'histoy_order_guest',
                    label: <span>Đơn hàng</span>,
                    onClick: () => navigate(routes.HistoryOrderGuest.path),
                },
            );
        }
        return items;
    };

    return (
        <Layout>
            <Header className={styles.appHeader} style={{ padding: 0, background: 'white', height: 90 }}>
                <a href="" title="Tech-Market" rel="home" style={{ marginLeft: 100, marginTop: 35 }}>
                    <img width="200" height="60" src={logo} alt="Tech-market" />
                </a>
                <Space style={{ minWidth:1000, justifyContent:'space-between' }}>
                    <SearchBox />
                    <Menu mode="horizontal" className={styles.rightMenu} selectedKeys={[]} items={itemHeader()} />
                </Space>
            </Header>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#f57e20',
                    },
                }}
            >
                <Header className={styles.appHeader2} style={{ paddingLeft: 150, borderBottom: '1px solid #f57e20' }}>
                    <div className={styles.div_Category}>
                        <UnorderedListOutlined />
                        DANH MỤC SẢN PHẨM
                    </div>
                    <Menu
                        mode="horizontal"
                        className={styles.menu2}
                        selectedKeys={[]}
                        style={{ width: '10px' }}
                        items={[
                            {
                                label: <span className={styles.label}>TRANG CHỦ</span>,
                                key: `Home`,
                                onClick: () => navigate(routes.HomePage.path),
                            },
                            {
                                label: <span className={styles.label}>GIỚI THIỆU</span>,
                                key: `introduce`,
                                onClick: () => navigate(routes.IntroductionHome.path),
                            },
                            {
                                label: <span className={styles.label}>SẢN PHẨM</span>,
                                key: `product`,
                                onClick: () => navigate(routes.ProductHomePage1.path),
                            },
                            {
                                label: <span className={styles.label}>KINH NGHIỆM HAY</span>,
                                key: `experience`,
                                onClick: () => navigate(routes.ExperienceHome.path),
                            },
                            {
                                label: <span className={styles.label}>LIÊN HỆ</span>,
                                key: `contact`,
                                onClick: () => navigate(routes.ContactHome.path),
                            },
                        ]}
                    />
                </Header>
            </ConfigProvider>
        </Layout>
    );
};

export default AppHeader;
