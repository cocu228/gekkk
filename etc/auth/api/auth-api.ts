import $axios from "@/shared/lib/(cs)axios";


$axios.post('/password/check', {
    phone: null,
    password: null
})


$axios.post('/requestCode', {
    phone: null,
    password: null
})


// export const authApiSchema = createHttpSchema({
//
//     'POST /password/check': {
//         requestBody: t.object({
//             phone: t.string,
//             password: t.string
//         }),
//         responseBody: t.object({
//             status: t.brandedString('ok')
//         }),
//     },
//
//     'POST /requestCode': {
//         responseBody: t.object({
//             "success":t.boolean,
//             "sessid":t.string,
//             code: t.any
//         }),
//     },
//
//     'POST /signin': {
//         requestBody: t.object({
//             "sessid": t.string,
//             "code": t.string
//         }),
//         /**
//          * {
//          *   "service_code": "OTFIN",
//          *   "success": "true",
//          *   "phone": "79111111111",
//          *   "token": "d1bd76af5659834910ce717806785439",
//          *   "expires_in": 2592000
//          * }
//          */
//         responseBody: t.object({
//             service_code: t.string,
//             success: t.any,
//             phone: t.any,
//             token: t.string,
//             expires_in: t.number
//         })
//     },
//
//     'POST /logout': {
//         responseBody: t.any
//     }
//
// })
// export default authApi