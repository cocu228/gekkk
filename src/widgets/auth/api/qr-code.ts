import $axios from "@/shared/lib/(cs)axios";

export const apiQRCode = (hash?: string, sessionData?: string) => $axios.post('/pub/v1/auth',
    null, {
        params: {
            key: hash
        }
    })