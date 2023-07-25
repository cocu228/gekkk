export const isDisabledBtnWithdraw = (inputs, wallet, max_withdraw, min_withdraw) => {

    return !inputs.amount || !inputs.address || !inputs.receiver ||
        (wallet.availableBalance < inputs.amount) ||
        (max_withdraw !== 0 && (max_withdraw < inputs.amount)) ||
        (min_withdraw !== 0 && (min_withdraw > inputs.amount))
}