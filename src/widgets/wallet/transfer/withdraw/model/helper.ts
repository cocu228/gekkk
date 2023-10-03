import Decimal from "decimal.js";

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
