import axios from 'axios';

const {MODE} = import.meta.env

const $axios = axios.create({
    withCredentials: true,

    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'applicationId': 'BLACK_CAT_CARD'
    },
    baseURL: MODE === "DEV" ? "http://10.7.5.173:2223" :
        MODE === "PROD" ? "https://api-dev.gekkoin.com" :
            "http://localhost:5173"
});

export default $axios;
