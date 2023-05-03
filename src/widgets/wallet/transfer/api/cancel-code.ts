import $axios from "@/shared/lib/(cs)axios";


export const apiCancelTxCode = (code: string) =>
    $axios.post('/gek/v1/cancel_code', {
        code
    })
