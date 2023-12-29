import { message } from 'antd';
import { useReducer, useState } from 'react';

import axios from './axios';

const ITEM_PER_PAGE = 30;

const STATUS = {
    LOADING: 'loading',
    LOAD_SUCCESS: 'success',
    LOAD_ERROR: 'error',
};

const TYPE = {
    LOAD: 'LOAD',
    LOAD_SUCCESS: 'LOAD_SUCCESS',
    LOAD_ERROR: 'LOAD_ERROR',
    LOAD_MORE_SUCCESS: 'LOAD_MORE_SUCCESS',
};

const reducer = (state, action) => {
    switch (action.type) {
                    case TYPE.LOAD:
                        return {
                            ...state,
                            status: STATUS.LOADING,
                        };
                    case TYPE.LOAD_SUCCESS:
                        return {
                            ...state,
                            status: STATUS.LOAD_SUCCESS,
                            data: action.payload.data,
                            total: action.payload.total,
                        };
                    case TYPE.LOAD_ERROR:
                        return {
                            ...state,
                            status: STATUS.LOAD_ERROR,
                        };
                    case TYPE.LOAD_MORE_SUCCESS:
                        return {
                            ...state,
                            status: STATUS.LOAD_SUCCESS,
                            data: [...state.data, ...action.payload.data],
                            total: action.payload.total,
                        };
                    default:
                        return state;
    }
};

const useFetchDataHook = (keyword) => {
    const [state, dispatch] = useReducer(reducer, {
        status: STATUS.LOAD_SUCCESS,
        data: [],
        total: 0,
    });
    const [sourceToken, setSourceToken] = useState(null);

    function getData() {
        return state.data;
    }

    function getTotal() {
        return state.total;
    }

    function isLoading() {
        return state.status === STATUS.LOADING;
    }

    function isLoadSuccess() {
        return state.status === STATUS.LOAD_SUCCESS;
    }

    function isLoadError() {
        return state.status === STATUS.LOAD_ERROR;
    }

    function clearSearch() {
        dispatch({
            type: TYPE.LOAD_SUCCESS,
            payload: {
                data: [],
                total: 0,
            },
        });
    }

    async function handleSearch(value) {
        try {
            if (value.trim() === '') {
                return message.warning('Please enter some keyword to search');
            }
            if (sourceToken !== null) {
                sourceToken.cancel();
            }
            dispatch({ type: TYPE.LOAD });
            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();
            setSourceToken(source);
            const { data } = await axios.get(`/search/users?q=${value}`, {
                cancelToken: source.token,
            });
            dispatch({
                type: TYPE.LOAD_SUCCESS,
                payload: {
                    data: data.items,
                    total: data.total_count,
                },
            });
        } catch (error) {
            console.log(error);
            dispatch({ type: TYPE.LOAD_ERROR });
        }
    }

    async function handleLoadMore() {
        try {
            if (keyword.trim() === '') {
                return message.warning('Keyword not found');
            }
            const nextPage = Math.floor(state.data.length / ITEM_PER_PAGE) + 1;
            dispatch({ type: TYPE.LOAD });
            const { data } = await axios.get(`/search/users?q=${keyword}&page=${nextPage}`);
            dispatch({
                type: TYPE.LOAD_MORE_SUCCESS,
                payload: {
                    data: data.items,
                    total: data.total_count,
                },
            });
        } catch (error) {
            console.log(error);
            dispatch({ type: TYPE.LOAD_ERROR });
        }
    }

    return [getData, getTotal, isLoading, isLoadSuccess, isLoadError, clearSearch, handleSearch, handleLoadMore];
};

export default useFetchDataHook;
