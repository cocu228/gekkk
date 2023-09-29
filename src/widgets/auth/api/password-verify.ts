import $axios from "@/shared/lib/(cs)axios";

export const apiPasswordVerify = (phone: string, password: string) => $axios.post('/api/v1/password/verify', {
    phone,
    password
})
