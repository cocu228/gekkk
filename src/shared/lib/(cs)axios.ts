import axios from 'axios';

const {DEV, VITE_DEV_DOCKER} = import.meta.env


const sessionHeader = () => {

    const sessionGlobal = sessionStorage.getItem("session-global")

    const {token = undefined, phone = undefined} = sessionGlobal !== null ? JSON.parse(sessionGlobal) : {}

    return {
        'Content-Type': 'application/json;charset=UTF-8',
        'applicationId': 'BLACK_CAT_CARD',
        'Authorization': phone,
        'token': token,
        'productId': "BLACK_CAT_CARD"
    }
}

const $axios = axios.create({
    withCredentials: true,
    headers: sessionHeader(),
    baseURL: (DEV || VITE_DEV_DOCKER) ? window.location.origin : "https://api-dev.gekkoin.com"
});

export default $axios;
