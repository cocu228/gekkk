import Decimal from "decimal.js";

export const getCurrentRate = (rates: unknown | Array<{
    key: string,
    value: number
}>, $const: string, commission: number) => {
    if (rates === null) return 0
    if (rates[$const] === undefined) return 0

    const rateDecimal = new Decimal(rates[$const]);

    const increaseAmount = rateDecimal.mul(new Decimal(commission).div(100));

    return rateDecimal.add(increaseAmount).toNumber()

}
