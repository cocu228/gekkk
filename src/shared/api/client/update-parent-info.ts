import $axios from "@/shared/lib/(cs)axios";


export const apiUpdateParentInfo = function (partner_info: string) {
    return $axios.post('/gek/v1/client/update_tx_partner_info', {
        timetick: new Date().getTime(),
        partner_info
    })
}
