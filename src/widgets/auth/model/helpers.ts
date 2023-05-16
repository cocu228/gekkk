import {apiRequestCode, apiSignIn} from "@/widgets/auth/api";
import {actionSuccessConstructor} from "@/shared/lib/helpers";

export const APP_STORE_GEKKARD = 'https://apps.apple.com/MT/app/id1493274973';
export const GOOGLE_PLAY_GEKKARD = 'https://play.google.com/store/apps/details?id=com.papaya.gekkard';

export const helperApiRequestCode = function (response) {
    return actionSuccessConstructor(!!response.data?.success)
}
export const helperApiSignIn = function (response) {
    return actionSuccessConstructor(!!response.data.token)
}

export const helperApiTokenHash = function (response) {
    return actionSuccessConstructor(!!response.data.result?.token)
}
export const helperApiQRCode = function (response) {
    return actionSuccessConstructor(typeof response.data.result === "string")
}
export const helperApiCheckPassword = function (response) {
    return actionSuccessConstructor(response.data?.status === "ok")
}


export const authForTokenHashUrl = function () {

    const url = document.location.toString(),
        params = new URL(url).searchParams,
        sessionId = params.get("sessionId");

    return actionSuccessConstructor.call(sessionId, typeof sessionId === "string")

}