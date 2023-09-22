import $axios from "@/shared/lib/(cs)axios";


export const apiCreateWithdraw = function (currency: string,
                                           token_network: number,
                                           amount: number,
                                           fee: number,
                                           address: string = "",
                                           partner_info: string = "",
                                           tag: string = "",
                                           client_nonce: number,
                                           confirmationCode: string = undefined,
                                           auto_inner_transfer: boolean = false) {
    return $axios.post('/gek/v1/wallet/create_withdraw', {
        currency,
        token_network,
        amount,
        fee,
        address,
        partner_info,
        memo: "",
        tag,
        client_nonce,
        auto_inner_transfer
    }, {
        params: {
            confirmationCode
        }
    })
}
