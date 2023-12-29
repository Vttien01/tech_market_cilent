import { Layout } from 'antd';
import React, { useState } from 'react';

import AppFooter from './AppFooter';
import AppHeader from './AppHeader';

import styles from './MainLayout.module.scss';

const { Content, Footer } = Layout;

const { Header, Sider } = Layout;

const SIDEBAR_WIDTH_EXPAND = 320;

const PublicLayoutOther = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => setCollapsed((prev) => !prev);

    return (
        <Layout>
            <AppHeader collapsed={collapsed} onCollapse={toggleCollapsed} />
            <Layout >
                <Content>
                    <div className={styles.wrapper}>{children}</div>
                </Content>
            </Layout>
            <AppFooter />
        </Layout>
    );
};

export default PublicLayoutOther;
