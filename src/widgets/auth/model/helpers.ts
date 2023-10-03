// import {apiRequestCode, apiSignIn} from "@/widgets/auth/api";
import React, {SetStateAction} from "react";
import {actionSuccessConstructor} from "@/shared/lib/helpers";
import {differenceInSeconds} from "date-fns";

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
export const helperApiVerifyPassword = function (response) {
    return actionSuccessConstructor(response.data?.status === "ok")
}


export const authForTokenHashUrl = function () {

    const url = document.location.toString(),
        params = new URL(url).searchParams,
        sessionId = params.get("sessionId");



    return actionSuccessConstructor.call(sessionId, typeof sessionId === "string")

}



export class Timer {

    timerProcess: ReturnType<typeof setInterval> | (() => ReturnType<typeof setInterval>);
    timeCount: number;
    seconds: number;
    setState: React.Dispatch<React.SetStateAction<any>>;

    constructor(
        setState: React.Dispatch<React.SetStateAction<any>>,
        seconds: number = 60,
    ) {

        this.timerProcess = () => setInterval(this.processCount.bind(this), 1000)
        this.timeCount = seconds
        this.seconds = seconds
        this.setState = setState


        const sessionTimer = sessionStorage.getItem("timer")
        const waiting = "waiting" === sessionTimer

        if (!waiting) {
            if (sessionTimer) {

                const date1 = new Date(sessionTimer);
                const date2 = new Date();

                const difference = differenceInSeconds(date2, date1);

                if (difference <= seconds) {
                    this.timeCount = seconds - difference
                    this.run()
                }

            } else {
                sessionTimer !== "waiting" && this.run()
            }
        }

    }

    private processCount() {

        if (this.timeCount === 0) {
            this.clear()
            sessionStorage.setItem("timer", "waiting");
        } else {
            this.setState(this.timeCount)
            this.timeCount--
        }

    }

    run() {
        console.log("run")
        sessionStorage.setItem("timer", String(new Date()));

        if (typeof this.timerProcess === "function") {
            this.timerProcess = this.timerProcess()
        }
    }

    clear() {
        if (typeof this.timerProcess === "number") {
            clearTimeout(this.timerProcess)
        }

        sessionStorage.removeItem("timer")

        this.timerProcess = () => setInterval(this.processCount.bind(this), 1000)
        this.timeCount = this.seconds

        this.setState(null)
    }
}
