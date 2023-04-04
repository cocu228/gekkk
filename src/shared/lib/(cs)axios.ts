import axios from 'axios';

const {MODE} = import.meta.env
const API_URL_MODE = import.meta.env[`VITE_API_URL_${MODE}`]


console.log(MODE)
console.log(API_URL_MODE)
console.log(!!API_URL_MODE)
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
    baseURL: !!API_URL_MODE ? API_URL_MODE : window.location.origin
});

export default $axios;
