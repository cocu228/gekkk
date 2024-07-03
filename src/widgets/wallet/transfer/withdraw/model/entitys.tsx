export const getWithdrawDesc = (miWithdraw: null | number, $const: string, title:string) => {
    return !miWithdraw ? "" : `${title} ${miWithdraw.toString()} ${$const}`
}
