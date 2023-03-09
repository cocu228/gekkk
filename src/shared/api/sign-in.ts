import $axios from "@/shared/lib/(cs)axios";


export const apiSignIn = (code: string, sessId: string, phone: string) => $axios.post('/api/v1/signin', {
    code,
    sessid: sessId
}, {
    headers: {
        Authorization: phone,
        productId: "BLACK_CAT_CARD",
        applicationId: "BLACK_CAT_CARD"
    }
})

