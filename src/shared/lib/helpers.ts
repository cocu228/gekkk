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

export const actionSuccessConstructor = function (value: boolean) {

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

export const actionResSuccess = function (response) {
    if (response?.data?.result !== undefined && response.data.result !== null) {
        return {
            success: (val) => {
                val(this?.success)

                return {
                    reject: (val) => {
                        return val({message: null, code: null, id: null})
                    }
                }
            }
        }
    } else {
        return {
            success: (val) => {
                console.warn("Response error")
                return {
                    reject: (val) => {
                        return val(response.data.error)
                    }
                }
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

export function getFlagsFromMask(mask: number, options: Record<string, number>) {
    const flags: Record<string, boolean> = {};
    for (const [flag, value] of Object.entries(options)) {
        if (mask === 0 && value === 0) {
             flags[flag] = ((mask & value) === 0);
           continue
        }
        flags[flag] = ((mask & value) !== 0);
    }
    return flags;
 }

export function scrollToTop() {
    window.scrollBy(0, -100); // можно использовать также метод scrollTo(0, 0)
    if (window.pageYOffset > 0) {
        requestAnimationFrame(scrollToTop);
    }
}

export function calculateAmount(_amount: string | number | Decimal, percentage: number | string | Decimal, flag: 'withPercentage' | 'onlyPercentage' | 'afterPercentage') {

    const amount = new Decimal(_amount);
    const amountPercentageValue = amount.dividedBy(100);
    const percentageValue = amountPercentageValue.times(new Decimal(percentage));

    switch (flag) {
        case "afterPercentage":
            return amount.minus(percentageValue).toNumber();
        case "withPercentage" :
            return amount.plus(percentageValue).toNumber()
        case "onlyPercentage" :
            return percentageValue.toNumber()
    }

}

export const uncoverResponse = (response) => response.data.result
export const uncoverArray = <T>(arr: T[]): T | null => (Array.isArray(arr) && arr.length) ? arr[0] : null

export const getCurrencyRounding = (value: number) =>
    value >= 1000 ? Math.round(value) :
        value >= 1 ? value.toFixed(2) :
            value.toFixed(Math.floor(-Math.log10(value)) + 1);

export const getFormattedIBAN = (iban: string) => {
    return iban.slice(0, 10) + '***' + iban.slice(-4);
}
