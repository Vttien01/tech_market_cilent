import PageWrapper from '@components/common/layout/PageWrapper';
import React from 'react';
import Dashboard from '.';

const DashboardPage = () => {
    const breadRoutes = [{ breadcrumbName: 'Thống kê' }];
    return (
        <PageWrapper routes={breadRoutes}>
            <Dashboard/>
        </PageWrapper>
    );
};

export default DashboardPage;
