import axios from 'axios';

const $axios = axios.create({
    withCredentials: true,
    baseURL: "https://bgate-dev.star-bridge.lv/api/v1"
});

export default $axios;
