import React from 'react';

import CategoryListPageCommon from '@components/common/page/category';
import { categoryKind } from '@constants';
import { defineMessages, useIntl } from 'react-intl';

const message = defineMessages({
    home: 'Home',
    newsCategory: 'Loại',
});

const CategoryListPage = () => {
    const intl = useIntl();

    return (
        <CategoryListPageCommon
            routes={[{ breadcrumbName: intl.formatMessage(message.newsCategory) }]}
            kind={categoryKind.news}
        />
    );
};

export default CategoryListPage;
