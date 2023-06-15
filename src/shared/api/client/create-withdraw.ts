import $axios from "@/shared/lib/(cs)axios";


export const apiCreateWithdraw = function (currency: string, token_network: number, amount: number, fee: number, address: string = "", partner_info: string = "", tag: string = "") {
    return $axios.post('/gek/v1/client/create_withdraw', {
        currency,
        token_network,
        amount,
        fee,
        address,
        partner_info,
        memo: "",
        tag,
        client_nonce: 0,
        auto_inner_transfer: true
    })
}
