import axios from 'axios';

const $axios = axios.create({
    withCredentials: true,
    baseURL: "http://api-dev.gekkoin.com/api/v1"
});

export default $axios;
