import $axios from "@/shared/lib/(cs)axios";


export const apiCreateWithdraw = function (currency: string, token_network: number, amount: number, fee: number, address: string = "", partner_info: string = "", tag: string = "", confirmationCode: string = undefined) {
    return $axios.post('/gek/v1/wallet/create_withdraw', {
        currency,
        token_network,
        amount,
        fee,
        address,
        partner_info,
        confirmationCode,
        memo: "",
        tag,
        client_nonce: 0,
        auto_inner_transfer: true
    })
}
