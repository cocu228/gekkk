import {createHttpSchema, t, TypeFromTypeInfo} from 'http-schemas'
import md5 from "md5"
export const ErrorBody = t.object({error: t.string})

export const authApiSchema = createHttpSchema({

    'POST /password/check': {
        requestBody: t.object({
            phone: t.string,
            password: t.string
        }),
        responseBody: t.object({
            status: t.brandedString('ok')
        }),
    },

    'POST /requestCode': {
        responseBody: t.object({
            "success":t.boolean,
            "sessid":t.string,
            code: t.any
        }),
    },

    'POST /signin': {
        requestBody: t.object({
            "sessid": t.string,
            "code": t.string
        }),
        /**
         * {
         *   "service_code": "OTFIN",
         *   "success": "true",
         *   "phone": "79111111111",
         *   "token": "d1bd76af5659834910ce717806785439",
         *   "expires_in": 2592000
         * }
         */
        responseBody: t.object({
            service_code: t.string,
            success: t.any,
            phone: t.any,
            token: t.string,
            expires_in: t.number
        })
    }
})

export type Credentials = {phone: string, password: string}

import {createHttpClient} from "http-schemas/client"
import {authRouter} from '../pages/authorization'

const host = window.location.host
const baseURL = 'https://api-dev.gekkoin.com/api/v1' //import.meta.env.GEKKOIN_REACT_AUTH_URL

export const authApi = createHttpClient(authApiSchema, { baseURL });

export const hashCredentials = ({phone, password}:Credential) => ({
    phone,
    password: md5(`${password}_${phone}`)})

export default authApi