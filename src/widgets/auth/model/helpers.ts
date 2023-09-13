import {apiRequestCode, apiSignIn} from "@/widgets/auth/api";
import {actionSuccessConstructor} from "@/shared/lib/helpers";

export const helperApiRequestCode = function (response) {
    console.log("test")
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

export function timer(secondary: number = 60) {

    let timeCount = secondary;
    const processCount = () => {

        if (timeCount === 0) {

            clearTimeout(processTimer)
            this.setState(null)

            this.setSessionGlobal(prev => ({...prev, secondaryForTimer: 0}))

        } else {

            this.setSessionGlobal(prev => ({...prev, secondaryForTimer: timeCount}))

            this.setState(timeCount)

            console.log(timeCount)
            timeCount--
        }
    }


    const processTimer = setInterval(processCount, 1000);
}
