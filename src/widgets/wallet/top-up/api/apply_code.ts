import $axios from "@/shared/lib/(cs)axios";


export const apiApplyTxCode = (code: string) =>
    $axios.post('/gek/v1/apply_code', {
        code
    })
