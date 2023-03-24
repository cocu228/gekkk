import axios from 'axios';

const {DEV, VITE_DEV_DOCKER} = import.meta.env


const sessionHeader = () => {
    const sessionGlobal = sessionStorage.getItem("session-global")

    const {token = undefined, phone = undefined} = sessionGlobal !== null ? JSON.parse(sessionGlobal) : {}

    const keys = phone ? {
        'Authorization': phone,
        'token': token,
    } : {}

    return {
        'Content-Type': 'application/json;charset=UTF-8',
        'applicationId': 'BLACK_CAT_CARD',
        'productId': "BLACK_CAT_CARD",
        ...keys
    }
}

const $axios = axios.create({
    withCredentials: true,
    headers: sessionHeader(),
    responseType: 'json',
    baseURL: (DEV || VITE_DEV_DOCKER) ? window.location.origin : "https://api-dev.gekkoin.com"
});

export default $axios;
