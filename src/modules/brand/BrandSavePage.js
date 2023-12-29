import PageWrapper from '@components/common/layout/PageWrapper';
import apiConfig from '@constants/apiConfig';
import useSaveBase from '@hooks/useSaveBase';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@locales/intl';
import route from '@routes';
import React from 'react';
import { generatePath, useParams } from 'react-router-dom';
import BrandForm from './BrandForm';

function BrandSavePage() {
    const brandId = useParams();
    const translate = useTranslate();
    const { detail, mixinFuncs, loading, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getById: apiConfig.brand.getById,
            create: apiConfig.brand.create,
            update: apiConfig.brand.update,
        },
        options: {
            getListUrl: generatePath(route.brandListPage.path, { brandId }),
            objectName: 'Brand',
        },
        override: (funcs) => {
            funcs.prepareUpdateData = (data) => {
                return {
                    ...data,
                    id: detail.id,
                };
            };
            funcs.prepareCreateData = (data) => {
                return {
                    ...data,
                };
            };
        },
    });

    return (
        <PageWrapper
            loading={loading}
            routes={[
                {
                    breadcrumbName: translate.formatMessage(commonMessage.brand),
                    path: generatePath(route.brandListPage.path),
                },
                { breadcrumbName: title },
            ]}
            title={title}
        >
            <BrandForm
                setIsChangedFormValues={setIsChangedFormValues}
                dataDetail={detail ? detail : {}}
                formId={mixinFuncs.getFormId()}
                isEditing={isEditing}
                actions={mixinFuncs.renderActions()}
                onSubmit={mixinFuncs.onSave}
            />
        </PageWrapper>
    );
}

export default BrandSavePage;
