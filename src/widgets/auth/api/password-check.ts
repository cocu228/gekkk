import {$axios} from "@/shared/lib/(orval)axios";

export const apiPasswordCheck = (phone: string, password: string) => $axios.post('/api/v1/password/check', {
    phone, password
})
