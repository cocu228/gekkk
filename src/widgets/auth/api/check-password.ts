import $axios from "@/shared/lib/(cs)axios";

export const apiCheckPassword = (phone: string, password: string) => $axios.post('/api/v1/password/check', {
    phone, password
})