import $axios from "@/shared/lib/(cs)axios";

// export interface IResCreateWithdraw {
//
// }

export const apiCreateNetwork = function (currency: string, token_network: number, amount: number, fee: number, address: string, partner_info: string, tag: string = "") {
    return $axios.post('/gek/v1/client/create_withdraw', {
        client_id: "gek235263273468",
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
