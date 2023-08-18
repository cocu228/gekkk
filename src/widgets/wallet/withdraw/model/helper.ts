export const isDisabledBtnWithdraw = (inputs) => {
    return !inputs.amount || !inputs.address || !inputs.receiver;
}