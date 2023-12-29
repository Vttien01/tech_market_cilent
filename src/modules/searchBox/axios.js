import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.github.com',
});
instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

export default instance;
