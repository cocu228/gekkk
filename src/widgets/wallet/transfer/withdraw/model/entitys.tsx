import Decimal from "decimal.js";

export const getWithdrawDesc = (miWithdraw: null | number, $const: string, title:string) => {
    return !miWithdraw ? "" : `${title} ${new Decimal(miWithdraw).toString()} ${$const}`
}
