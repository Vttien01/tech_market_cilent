import React, { useMemo } from 'react';
// import './index.css';
import { ClockCircleOutlined, LaptopOutlined, PhoneOutlined, TabletOutlined } from '@ant-design/icons';
import useValidatePermission from '@hooks/useValidatePermission';
import { IconHeadphones } from '@tabler/icons-react';
import { Layout, Menu, theme } from 'antd';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import styles from './NavSiderCommon.module.scss';

const { Sider } = Layout;

const navMenuConfig = [
    {
        label: (
            <div style={{ marginLeft: 10, fontSize: 16 }}>
                <PhoneOutlined size={20} /> Điện thoại
            </div>
        ),
        key: 'Điện thoại',
        // children: [
        //     // {
        //     //     label: <span>Apple</span>,
        //     //     key: 'APPLE',
        //     //     // path: routes.adminsListPage.path,
        //     // },
        //     // {
        //     //     label: `Oppo`,
        //     //     key: 'OPPO',
        //     // },
        //     // {
        //     //     label: `SamSung`,
        //     //     key: 'SAMSUNG',
        //     // },
        //     // {
        //     //     label: `Vivo`,
        //     //     key: 'VIVO',
        //     // },
        // ],
    },
    {
        label: (
            <div style={{ marginLeft: 10, fontSize: 16 }}>
                <LaptopOutlined size={20} /> Laptop
            </div>
        ),
        key: 'laptop',
        // children: [
        //     // {
        //     //     label: `Macbook`,
        //     //     key: 'MACBOOK',
        //     // },
        //     // {
        //     //     label: `Laptop Lenovo`,
        //     //     key: 'LENOVO',
        //     // },

        //     // {
        //     //     label: `Laptop Dell`,
        //     //     key: 'DELL',
        //     // },
        //     // {
        //     //     label: `Laptop HP`,
        //     //     key: 'HP',
        //     // },
        // ],
    },
    {
        label: (
            <div style={{ marginLeft: 2, fontSize: 16 }}>
                <TabletOutlined size={20} /> Tablet
            </div>
        ),
        key: 'TABLET',
    },
    {
        label: (
            <div style={{ marginLeft: 2, fontSize: 16 }}>
                <ClockCircleOutlined size={20} /> SmatchWatch
            </div>
        ),
        key: 'SMATCHWATCH',
    },
    {
        label: (
            <div style={{ marginLeft: 2, fontSize: 16 }}>
                <IconHeadphones size={20} /> Tai nghe
            </div>
        ),
        key: 'TAI NGHE',
    },
];

const NavSiderCommon = ({ collapsed, onCollapse, width }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();
    const location = useLocation();
    const validatePermission = useValidatePermission();

    const onMenuClick = (item) => {
        console.log(item.key);
        navigate(`/all-product?category=${item.key}`);
    };

    const activeNav = useMemo(() => {
        const activeNav = findActiveNav(navMenuConfig);
        if (activeNav) {
            return activeNav;
        }

        return {
            selectedKeys: [],
            openKeys: [],
        };
    }, [location.pathname]);

    function makeNavs(navs) {
        return navs.map((nav) => {
            const newNav = { ...nav };
            if (newNav.permission || newNav.kind) {
                if (!validatePermission(newNav.permission, newNav.kind)) {
                    return null;
                }
            }

            if (newNav.children) {
                newNav.children = makeNavs(nav.children);
                if (newNav.children.every((item) => item === null)) {
                    return null;
                }
            }

            return newNav;
        });
    }

    function handleMenuItemClick(item) {
        let selectedNav;
        navMenuConfig.map((navItem) => {
            if (navItem.key === item.key) selectedNav = navItem;
            else if (navItem.children) {
                navItem.children.map((navChild) => {
                    if (navChild.key === item.key) selectedNav = navChild;
                });
            }
        });

        navigate(selectedNav?.path);
    }

    function findActiveNav(navs) {
        for (const nav of navs) {
            if (nav.children) {
                const activeItem = findActiveNav(nav.children);
                if (activeItem) {
                    return {
                        selectedKeys: activeItem.selectedKeys,
                        openKeys: [nav.key, ...activeItem.openKeys],
                    };
                }
            } else if (matchPath(nav.path + '/*', location.pathname)) {
                return {
                    selectedKeys: [nav.key],
                    openKeys: [],
                };
            }
        }

        // return defaultOpenNav;
    }

    return (
        <Sider
            style={{ background: colorBgContainer }}
            className={ styles.sidebar}
            collapsible
            collapsed={collapsed}
            width={width}
            onCollapse={onCollapse}
            trigger={null}
        >
            <Menu
                style={{ borderRight: 10 }}
                className="appMenu"
                onClick={onMenuClick}
                mode="vertical"
                items={makeNavs(navMenuConfig)}
            />
        </Sider>
    );
};

export default NavSiderCommon;
