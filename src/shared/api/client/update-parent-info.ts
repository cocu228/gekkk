import $axios from "@/shared/lib/(cs)axios";


export const apiUpdatePartnerInfo = function (partner_info: string, idTransaction: number) {
    return $axios.post('/gek/v1/client/update_tx_partner_info', {
        timetick: idTransaction,
        partner_info
    })
}
