import $axios from "@/shared/lib/(cs)axios";

export const apiPasswordCheck = (phone: string, password: string) => $axios.post('/api/v1/password/check', {
    phone, password
})
