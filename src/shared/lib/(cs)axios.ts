import axios from 'axios';

const $axios = axios.create({
    withCredentials: true,

    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'applicationId': 'BLACK_CAT_CARD'
    },
    baseURL: "http://localhost:5173"
});

export default $axios;
