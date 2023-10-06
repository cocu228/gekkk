import Decimal from "decimal.js";

export const getWithdrawDesc = (miWithdraw: null | number, $const: string) => {
    return !miWithdraw ? "" : `Minimum amount is ${new Decimal(miWithdraw).toString()} ${$const}`
}
