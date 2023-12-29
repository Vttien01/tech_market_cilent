import PageWrapper from '@components/common/layout/PageWrapper';
import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';
import useFetchAction from '@hooks/useFetchAction';
import useSaveBase from '@hooks/useSaveBase';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@locales/intl';
import { accountActions } from '@store/actions';
import React, { useEffect, useState } from 'react';
import { defineMessages } from 'react-intl';
import ProfileForm from './ProfileForm';

const message = defineMessages({
    objectName: 'profile',
});

const ProfileUserSavePage = () => {
    const translate = useTranslate();
    const [detail, setDetail] = useState({});
    const { execute, loading } = useFetch({ ...apiConfig.user.getProfile }, { immediate: false });
    const { execute: executeGetProfile } = useFetchAction(accountActions.getProfile);
    const { mixinFuncs, onSave, setIsChangedFormValues, isEditing } = useSaveBase({
        options: {
            getListUrl: `/profile-user`,
            objectName: translate.formatMessage(message.objectName),
        },
        apiConfig: {
            getById: apiConfig.user.getProfile,
            update: apiConfig.user.updateProfile,
        },
        override: (funcs) => {
            const onSaveCompleted = funcs.onSaveCompleted;

            funcs.onSaveCompleted = (response) => {
                onSaveCompleted(response);
                executeGetProfile();
            };
        },
    });

    useEffect(() => {
        execute({
            onCompleted: (response) => {
                if (response.result === true) setDetail(response.data);
            },
            onError: mixinFuncs.handleGetDetailError,
        });
    }, []);

    return (
        <div style={{ width: 1500, display:'flex', justifyContent: 'center' }}>
            <PageWrapper
                loading={loading}
                routes={[{ breadcrumbName: translate.formatMessage(commonMessage.profile) }]}
            >
                <ProfileForm
                    setIsChangedFormValues={setIsChangedFormValues}
                    dataDetail={detail ? detail : {}}
                    formId={mixinFuncs.getFormId()}
                    isEditing={isEditing}
                    actions={mixinFuncs.renderActions()}
                    onSubmit={onSave}
                />
            </PageWrapper>
        </div>
    );
};

export default ProfileUserSavePage;
