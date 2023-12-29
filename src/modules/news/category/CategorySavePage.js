import CategorySavePageCommon from '@components/common/page/category/CategorySavePageCommon';
import { categoryKind } from '@constants';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import routes from '../routes';

const message = defineMessages({
    home: 'Home',
    newsCategory: 'Loại',
});

const CategorySavePage = () => {
    const intl = useIntl();

    return (
        <CategorySavePageCommon
            routes={[
                {
                    breadcrumbName: intl.formatMessage(message.newsCategory),
                    path: routes.newsCategoryListPage.path,
                },
            ]}
            getListUrl={routes.newsCategoryListPage.path}
            kind={categoryKind.news}
        />
    );
};

export default CategorySavePage;
