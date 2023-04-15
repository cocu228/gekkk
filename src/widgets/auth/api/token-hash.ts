import $axios from "@/shared/lib/(cs)axios";

export const apiTokenHash = (hash?: string, sessionData?: string) => $axios.post('/pub/v1/auth',
    null, {
        params: {
            key: hash
        }
    })