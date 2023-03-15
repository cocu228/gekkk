import $axios from "@/shared/lib/(cs)axios";

export const apiRequestCode = (phone: string, code?: string, sessionId?: string) => $axios.post('/api/v1/requestCode', {
    phone,
    code,
    sessid: sessionId
}, {
    headers: {
        Authorization: phone,
        productId: "BLACK_CAT_CARD",
        applicationId: "BLACK_CAT_CARD"
    }
})