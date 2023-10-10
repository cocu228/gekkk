import $axios from "@/shared/lib/(cs)axios";


export interface ICreateWithdrawParams {
    currency: string,
    token_network: number,
    amount: number,
    fee: number,
    address: string,
    partner_info: string,
    tag: string,
    client_nonce: number,
    auto_inner_transfer: boolean
}

export const apiCreateWithdraw = function (params: ICreateWithdrawParams,
                                           confirmationCode: string = undefined,
                                           confirmationTimetick: string = undefined) {
    return $axios.post('/gek/v1/wallet/create_withdraw', params, {
        params: {
            confirmationCode,
            confirmationTimetick
        }
    })
}
