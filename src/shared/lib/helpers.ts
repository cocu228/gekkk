import Decimal from "decimal.js";

export function randomId(value = 12): string {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < value; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export const isActiveClass = (value: boolean): string => value ? "active" : ""
export const isNull = (value: any): boolean => value === null
export function evenOrOdd(number) {
    return number % 2 === 0
}

export const getCryptoIconName = ($const, extension = "svg") => {
    return `${$const.toLowerCase().capitalize()}Icon.${extension}`
}

export const getRoundingValue = (balance: Decimal | number | string, roundingValue: number) => {
    const result = typeof balance === "number" || typeof balance === "string" ? new Decimal(balance) : balance
    return result.toDecimalPlaces(roundingValue).toNumber()
}

export const actionSuccessConstructor = function (value) {

    if (value) {
        return {
            success: (val) => {
                val(this)
            }
        }
    } else {
        return {
            success: (val) => {
                console.warn("Response error")
            }
        }
    }
}

export function asteriskText(text) {
    if (text.length > 6) {
        return text.slice(0, 10) + '***' + text.slice(-3);
    } else {
        return text;
    }
}

export function getFlagsFromMask(mask, options: Record<string, number>) {
    const flags = {};
    for (const [flag, value] of Object.entries(options)) {
        flags[flag] = (mask & (1 << value)) !== 0;
    }
    return flags;
}