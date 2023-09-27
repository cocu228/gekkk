// import {apiRequestCode, apiSignIn} from "@/widgets/auth/api";
import React, {SetStateAction} from "react";
import {actionSuccessConstructor} from "@/shared/lib/helpers";

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


export class Timer {

    timerProcess: any;
    timerRunProcess: ReturnType<typeof setInterval> | null;
    timeCount: number;
    setState: React.Dispatch<React.SetStateAction<any>>;
    setSessionGlobal: React.Dispatch<React.SetStateAction<any>>;

    constructor(
        seconds: number,
        setState: React.Dispatch<React.SetStateAction<any>>,
        setSessionGlobal: React.Dispatch<SetStateAction<any>>
    ) {

        this.timerProcess = () => (() => setInterval(this.processCount.bind(this), 1000))()

        this.timerRunProcess = null
        this.timeCount = seconds
        this.setState = setState
        this.setSessionGlobal = setSessionGlobal

    }

    private processCount() {

        if (this.timeCount === 0) {

            clearTimeout(this.timerRunProcess)

            this.setState(null)

            // this.setSessionGlobal((prev: object) => ({...prev, dateTimeStart: null}))

        } else {

            this.setState(this.timeCount)

            this.timeCount--
        }

    }

    run(seconds?: number) {

        !seconds && this.setSessionGlobal((prev: object) => ({...prev, dateTimeStart: new Date()}))

        this.timeCount = seconds ?? this.timeCount

        this.timerRunProcess = this.timerProcess()

    }

    clear() {
        clearTimeout(this.timerRunProcess)
    }
}
