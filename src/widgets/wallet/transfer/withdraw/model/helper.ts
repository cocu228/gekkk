import Decimal from "decimal.js";
import {AxiosResponse} from "axios";
import {actionSuccessConstructor, getCookieData, uncoverArray} from "@/shared/lib/helpers";
import {SignHeaders} from "@/shared/api";
import {generateJWT, getTransactionSignParams} from "@/shared/lib/crypto-service";

export const isDisabledBtnWithdraw = (inputs) => {
    return !inputs.address || !inputs.recipient;
}

type TGetFinalFee = {
    type: {
        number: boolean | null,
        percent: boolean | null
    },
    value: {
        number: number,
        percent: number
    }
}
export const getFinalFee = (curFee: number, perFee: number): TGetFinalFee => {

    let result = {
        type: {
            number: false,
            percent: false
        },
        value: {
            number: 0,
            percent: 0
        }
    }


    if (curFee === 0 && perFee === 0) return result

    const decCurFee = new Decimal(curFee)
    const decPerFee = new Decimal(perFee)

    result.type.percent = !decPerFee.isZero()
    result.type.number = !decCurFee.isZero()
    result.value.percent = decPerFee.toNumber()
    result.value.number = decCurFee.toNumber()

    return result

}

export const getWithdrawEUR = (curFee: number, course: number) => {

    if (!new Decimal(course).isZero()) {
        const decimalVal = new Decimal(course)
        const toFixed = decimalVal.times(curFee).toFixed(2)

        return new Decimal(toFixed).isZero() ? null : toFixed

    } else return null
}


export const signHeadersGeneration = async (token: string | null = null): Promise<Partial<SignHeaders>> => {

    const header: Pick<SignHeaders, "X-Confirmation-Type"> = {
        "X-Confirmation-Type": "SIGN",
    }

    if (token === null) return header

    const {
        appUuid,
        appPass
    } = token ? await getTransactionSignParams() : {appUuid: null, appPass: null};


    const jwtPayload = {
        initiator: getCookieData<{ phone: string }>().phone,
        confirmationToken: token,
        exp: Date.now() + 0.5 * 60 * 1000 // + 30sec
    };


    const keys: Omit<SignHeaders, "X-Confirmation-Type"> = {
        "X-Confirmation-Code": generateJWT(jwtPayload, appPass),
        "X-Confirmation-Token": token,
        "X-App-Uuid": appUuid
    }

    return {
        ...header,
        ...keys
    }

}
