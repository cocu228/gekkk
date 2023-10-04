import Decimal from "decimal.js";
import {AxiosResponse} from "axios";
import {actionSuccessConstructor, uncoverArray} from "@/shared/lib/helpers";

export const isDisabledBtnWithdraw = (inputs) => {
    return !inputs.amount || !inputs.address || !inputs.recipient;
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
export const getFinalFee = (curFee: number | null, perFee: number | null): TGetFinalFee => {

    let result = {
        type: {
            number: null,
            percent: null
        },
        value: {
            number: 0,
            percent: 0
        }
    }


    if (curFee === null || perFee === null) return result

    const decCurFee = new Decimal(curFee)
    const decPerFee = new Decimal(perFee)

    result.type.percent = !decPerFee.isZero()
    result.type.number = !decCurFee.isZero()
    result.value.percent = decPerFee.toNumber()
    result.value.number = decCurFee.toNumber()

    return result

}

export const helperApiPaymentSepa = (response: AxiosResponse) => {

    const isError = Array.isArray(response.data?.errors) && response.data.errors.length > 0
    const isToken = isError && response.data?.errors[0]?.code === 449

    let data = {
        isToken,
        token: null,
        codeLength: null,
        errors: null
    }

    if (isToken) {

        data.token = uncoverArray<{
            properties: { confirmationToken: string }
        }>(response.data.errors).properties.confirmationToken

        data.codeLength = uncoverArray<{
            properties: {
                confirmationCodeLength: number
            }
        }>(response.data.errors).properties.confirmationCodeLength

        data.errors = response.data.errors
    }


    return actionSuccessConstructor.call(data, (!isError || isToken))
}
