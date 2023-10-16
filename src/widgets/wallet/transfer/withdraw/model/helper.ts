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
