import axios from 'axios';

const {DEV} = import.meta.env

const $axios = axios.create({
    withCredentials: true,

    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'applicationId': 'BLACK_CAT_CARD'
    },
    baseURL: DEV ? window.location.origin : "https://api-dev.gekkoin.com"
});

export default $axios;
