import $axios from "@/shared/lib/(cs)axios";


export const apiCheckPassword = (phone: string, password: string) => $axios.post('/password/check', {
    phone: phone,
    password: password
})


export const apiRequestCode = (phone: string) => $axios.post('/requestCode', {
    phone: phone
})

