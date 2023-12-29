import React, { useEffect, useMemo, useState } from 'react';
import useQueryParams from './useQueryParams';
import { commonStatus, commonStatusColor, DEFAULT_TABLE_ITEM_SIZE, DEFAULT_TABLE_PAGE_START } from '@constants';

import { Modal, Button, Divider, Tag } from 'antd';
import { DeleteOutlined, LockOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';

import { defineMessages, useIntl } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';
import ActionBar from '@components/common/elements/ActionBar';
import useFetch from './useFetch';
import useNotification from './useNotification';
import SearchForm from '@components/common/form/SearchForm';
import useAuth from './useAuth';
import { validatePermission } from '@utils';
import qs from 'query-string';
import { BaseTooltip } from '@components/common/form/BaseTooltip';

const tableColumnMessage = defineMessages({
    action: 'Action',
    status: 'Status',
});

const notificationMessage = defineMessages({
    deleteSuccess: 'Delete {objectName} successfully',
    deleteTitle: 'Are you sure delete this {objectName}?',
    ok: 'Yes',
    cancel: 'No',
});

const defineStatusMessage = defineMessages({
    active: 'Active',
    pending: 'Pending',
    inactive: 'Lock',
});

const statusMessage = {
    [commonStatus.ACTIVE]: defineStatusMessage.active,
    [commonStatus.PENDING]: defineStatusMessage.pending,
    [commonStatus.INACTIVE]: defineStatusMessage.inactive,
};
const useListBase = ({
    apiConfig = {
        getList: null,
        delete: null,
        create: null,
        update: null,
        getById: null,
    },
    options = {
        objectName: '',
        pageSize: DEFAULT_TABLE_ITEM_SIZE,
        excludePermissions: {
            create: false,
            edit: false,
            delete: false,
        },
        ignoreQueryParams: [],
    },
    override,
} = {}) => {
    const { params: queryParams, setQueryParams, serializeParams, deserializeParams } = useQueryParams();
    const [data, setData] = useState(0);
    const [loading, setLoading] = useState(false);
    const { execute: executeGetList } = useFetch(apiConfig.getList);
    const { execute: executeDelete } = useFetch(apiConfig.delete);
    const location = useLocation();
    const { listData } = location.state ?? {};
    const [pagination, setPagination] = useState(
        listData
            ? listData.pagination
            : {
                pageSize: options.pageSize,
                total: 0,
                current: 1,
            },
    );
    const notification = useNotification();
    const { pathname: pagePath } = useLocation();
    const { permissions } = useAuth();
    const navigate = useNavigate();
    const intl = useIntl();

    const queryFilter = useMemo(() => deserializeParams(queryParams), [queryParams]);

    const hasPermission = (requiredPermissions) => {
        return validatePermission(requiredPermissions, permissions);
    };

    const mappingData = (response) => {
        return {
            data: response.data.content,
            total: response.data.totalElements,
        };
    };

    const handleGetListError = (error) => {
        notification({ type: 'error', message: 'Get list error' });
    };

    const onCompletedGetList = (response) => {
        const { data, total } = mixinFuncs.mappingData(response);

        setData(data);
        setPagination((p) => ({ ...p, total }));
    };

    const prepareGetListPathParams = () => {
        return {};
    };

    const handleFetchList = (params, isReload) => {
        if (!apiConfig.getList) throw new Error('apiConfig.getList is not defined');
        if (listData && !isReload) {
            setData(listData.data);
            setPagination(listData.pagination);
        } else {
            setLoading(true);
            executeGetList({
                pathParams: mixinFuncs.prepareGetListPathParams(),
                params,
                onCompleted: (response) => {
                    mixinFuncs.onCompletedGetList(response);
                    setLoading(false);
                },
                onError: (error) => {
                    mixinFuncs.handleGetListError(error);
                    setLoading(false);
                },
            });
        }
    };

    const prepareGetListParams = (filter) => {
        const copyFilter = { ...filter };

        const page = parseInt(queryParams.get('page'));
        copyFilter.page = page > 0 ? page - 1 : DEFAULT_TABLE_PAGE_START;

        copyFilter.size = options.pageSize;

        return copyFilter;
    };

    const getList = (isReload = false) => {
        let querys = queryFilter;
        if (options.ignoreQueryParams?.length > 0) {
            Object.entries(queryFilter).forEach(([key, value]) => {
                if (options.ignoreQueryParams.includes(key)) delete querys[key];
                else querys[key] = value;
            });
        }

        const params = mixinFuncs.prepareGetListParams(querys);

        mixinFuncs.handleFetchList({ ...params }, isReload);
    };

    const changeFilter = (filter) => {
        setQueryParams(serializeParams(filter));
    };

    function changePagination(page) {
        queryParams.set('page', page.current);
        setQueryParams(queryParams);
    }

    const handleDeleteItemError = (error) => {
        console.log(error);
        notification({ type: 'error', message: error.message || `Delete ${options.objectName} failed` });
    };

    const onDeleteItemCompleted = (id) => {
        const currentPage = queryParams.get('page');
        if (data.length === 1 && currentPage > 1) {
            queryParams.set('page', currentPage - 1);
            setQueryParams(queryParams);
        } else {
            mixinFuncs.getList(true);
            // setData((data) => data.filter((item) => item.id !== id));
        }
    };

    const handleDeleteItem = (id) => {
        setLoading(true);
        executeDelete({
            pathParams: { id },
            onCompleted: (response) => {
                mixinFuncs.onDeleteItemCompleted(id);

                notification({
                    message: intl.formatMessage(notificationMessage.deleteSuccess, {
                        objectName: options.objectName,
                    }),
                });
            },
            onError: (error) => {
                mixinFuncs.handleDeleteItemError(error);
                setLoading(false);
            },
        });
    };

    const showDeleteItemConfirm = (id) => {
        if (!apiConfig.delete) throw new Error('apiConfig.delete is not defined');

        Modal.confirm({
            title: intl.formatMessage(notificationMessage.deleteTitle, { objectName: options.objectName }),
            content: '',
            okText: intl.formatMessage(notificationMessage.ok),
            cancelText: intl.formatMessage(notificationMessage.cancel),
            centered: true,
            onOk: () => {
                mixinFuncs.handleDeleteItem(id);
            },
        });
    };

    const handleChangeStatusError = (error) => {
        notification({ type: 'error', message: error.message });
    };

    // This function is currently not needed
    const handleChangeStatus = (id, status) => {
        // execute({
        //     apiConfig: apiConfig.changeStatus,
        //     pathParams: { id },
        //     data: { status },
        //     onCompleted: (response) => {
        //         // show toast messages
        //     },
        //     onError: mixinFuncs.handleChangeStatusError,
        // });
    };

    const showChangeStatusConfirm = (id, status) => {
        if (!apiConfig.changeStatus) throw new Error('apiConfig.changeStatus is not defined');

        Modal.confirm({
            title: '',
            content: '',
            onOk: () => {
                mixinFuncs.handleChangeStatus(id, status);
            },
        });
    };

    const additionalActionColumnButtons = () => {
        return {};
    };

    const actionColumnButtons = (additionalButtons = {}) => ({
        delete: ({ id, buttonProps }) => {
            if (!options?.excludePermissions?.delete && !mixinFuncs.hasPermission(apiConfig.delete?.baseURL))
                return null;

            return (
                <BaseTooltip type="delete" objectName={options.objectName}>
                    <Button
                        {...buttonProps}
                        type="link"
                        onClick={(e) => {
                            e.stopPropagation();
                            mixinFuncs.showDeleteItemConfirm(id);
                        }}
                        style={{ padding: 0 }}
                    >
                        <DeleteOutlined style={{ color: 'red' }} />
                    </Button>
                </BaseTooltip>
            );
        },
        changeStatus: ({ id, status, buttonProps }) => {
            return (
                <Button
                    {...buttonProps}
                    type="link"
                    onClick={(e) => {
                        e.stopPropagation();
                        mixinFuncs.showChangeStatusConfirm(id, !status);
                    }}
                    style={{ padding: 0 }}
                >
                    {status === commonStatus.ACTIVE ? <LockOutlined /> : <CheckOutlined />}
                </Button>
            );
        },
        edit: ({ buttonProps, ...dataRow }) => {
            if (
                !options?.excludePermissions?.edit &&
                !mixinFuncs.hasPermission([apiConfig.update?.baseURL, apiConfig.getById?.baseURL])
            )
                return null;

            return (
                <BaseTooltip type="edit" objectName={options.objectName}>
                    <Button
                        {...buttonProps}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`${mixinFuncs.getItemDetailLink(dataRow)}`, {
                                state: { action: 'edit', prevPath: location.pathname, listData: getListData },
                            });
                        }}
                        type="link"
                        style={{ padding: 0 }}
                    >
                        <EditOutlined color="red" />
                    </Button>
                </BaseTooltip>
            );
        },
        ...additionalButtons,
    });

    const getListData = useMemo(() => {
        return {
            data,
            pagination,
        };
    }, [data, pagination]);

    const createActionColumnButtons = (actions, data) => {
        const actionButtons = [];
        const buttons = actionColumnButtons(mixinFuncs.additionalActionColumnButtons());

        Object.entries(actions).forEach(([key, value]) => {
            let _value = value;
            if (typeof value === 'function') {
                _value = value(data);
            }
            if (_value && buttons[key]) {
                actionButtons.push(buttons[key]);
            }
        });

        return actionButtons;
    };

    const checkPermission = (actions) => {
        let isShow = false;
        Object.entries(actions).forEach(([type, value]) => {
            if (value || value?.show) {
                switch (type) {
                                case 'delete':
                                    if (mixinFuncs.hasPermission(apiConfig.delete?.baseURL)) isShow = true;
                                    break;
                                case 'edit':
                                    if (mixinFuncs.hasPermission([apiConfig.update?.baseURL, apiConfig.getById?.baseURL]))
                                        isShow = true;
                                    break;
                                default:
                                    if (mixinFuncs.hasPermission(value?.permissions) || value.ignorePermission) isShow = true;
                                    break;
                }
                return;
            }
        });
        return isShow;
    };

    const renderActionColumn = (
        action = { edit: false, delete: false, changeStatus: false },
        columnsProps,
        buttonProps,
    ) => {
        const isRender = checkPermission(action);
        if (!isRender) return;
        return {
            align: 'center',
            ...columnsProps,
            title: intl.formatMessage(tableColumnMessage.action),
            render: (data) => {
                const buttons = [];
                const actionButtons = mixinFuncs.createActionColumnButtons(action, data);
                actionButtons.forEach((ActionItem, index) => {
                    if (ActionItem({ ...data, ...buttonProps })) {
                        buttons.push(ActionItem);
                    }
                });

                return (
                    <span>
                        {buttons.map((ActionItem, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && <Divider type="vertical" />}
                                <span>
                                    {ActionItem({ ...data, ...buttonProps }) ? (
                                        <ActionItem {...data} {...buttonProps} />
                                    ) : null}
                                </span>
                            </React.Fragment>
                        ))}
                    </span>
                );
            },
        };
    };

    const renderIdColumn = (columnsProps) => ({
        title: 'ID',
        dataIndex: 'id',
        width: '50px',
        align: 'left',
        ...columnsProps,
    });

    const renderStatusColumn = (columnsProps) => {
        return {
            title: intl.formatMessage(tableColumnMessage.status),
            dataIndex: 'status',
            align: 'center',
            ...columnsProps,
            render: (status) => (
                <Tag color={commonStatusColor[status]}>
                    <div style={{ padding: '0 4px', fontSize: 14 }}>{intl.formatMessage(statusMessage[status])}</div>
                </Tag>
            ),
        };
    };

    const getItemDetailLink = (dataRow) => {
        return `${pagePath}/${dataRow.id}`;
    };

    const getCreateLink = () => {
        return `${pagePath}/create`;
    };

    const generateParams = (params = {}, pageable = true, currentParams = false) => {
        let parseParams = params;
        if (pagination.current > 0) parseParams.page = pagination.current;

        return `?${qs.stringify(parseParams)}`;
    };

    const renderActionBar = ({ type, style, onBulkDelete, selectedRows = [], buttons } = {}) => {
        return (
            <ActionBar
                buttons={buttons}
                createPermission={apiConfig.create?.baseURL}
                selectedRows={selectedRows}
                onBulkDelete={onBulkDelete}
                objectName={options.objectName}
                createLink={mixinFuncs.getCreateLink()}
                location={location}
                type={type}
                style={style}
            />
        );
    };

    const handleFilterSearchChange = (values) => {
        mixinFuncs.changeFilter(values);
    };

    const renderSearchForm = ({
        fields = [],
        getFormInstance,
        hiddenAction,
        className,
        initialValues,
        onSearch,
        onReset,
        alignSearchField = 'left',
    }) => {
        return (
            <SearchForm
                getFormInstance={getFormInstance}
                alignSearchField={alignSearchField}
                fields={fields}
                initialValues={initialValues}
                onSearch={(values) => {
                    mixinFuncs.handleFilterSearchChange(values);
                    onSearch?.(values);
                }}
                hiddenAction={hiddenAction}
                className={className}
                onReset={() => {
                    mixinFuncs.changeFilter({});
                    onReset?.();
                }}
            />
        );
    };

    const filterLanguage = (dataRow = []) => {
        let renderItem;
        dataRow.filter((item) => {
            if (item.languageId === '1') renderItem = item;
        });
        return renderItem || {};
    };

    const overrideHandler = () => {
        const centralizedHandler = {
            hasPermission,
            mappingData,
            handleGetListError,
            handleFetchList,
            prepareGetListParams,
            getList,
            changeFilter,
            showDeleteItemConfirm,
            handleDeleteItem,
            handleDeleteItemError,
            createActionColumnButtons,
            showChangeStatusConfirm,
            handleChangeStatus,
            handleChangeStatusError,
            renderActionColumn,
            renderIdColumn,
            getItemDetailLink,
            getCreateLink,
            renderStatusColumn,
            changePagination,
            additionalActionColumnButtons,
            renderActionBar,
            onCompletedGetList,
            onDeleteItemCompleted,
            filterLanguage,
            renderSearchForm,
            handleFilterSearchChange,
            prepareGetListPathParams,
            generateParams,
            setQueryParams,
        };

        override?.(centralizedHandler);

        return centralizedHandler;
    };

    const mixinFuncs = overrideHandler();

    useEffect(() => {
        mixinFuncs.getList();

        const page = parseInt(queryFilter.page);
        if (page > 0 && page !== pagination.current) {
            setPagination((p) => ({ ...p, current: page }));
        } else if (page < 1 || isNaN(page)) {
            setPagination((p) => ({ ...p, current: 1 }));
        }
    }, [queryParams, pagePath]);

    return {
        loading,
        data,
        setData,
        queryFilter,
        actionColumnButtons,
        changeFilter,
        changePagination,
        pagination,
        mixinFuncs,
        getList,
        setLoading,
        pagePath,
        serializeParams,
        queryParams,
    };
};

export default useListBase;
