// import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";


// interface IResOrganization {
//     "accounts": [
//         {
//             "id": string
//         }
//     ],
//     "cards": [
//         {
//             "account": {
//                 "accountName": string,
//                 "accountType": "PHYSICAL",
//                 "activeBonusProgram": "CASH_BACK_PROGRAM_1",
//                 "activeBonusPrograms": [
//                     "CASH_BACK_PROGRAM_1"
//                 ],
//                 "bonusProgramActivate": boolean,
//                 "clientId": string,
//                 "color": "RED",
//                 "currency": {
//                     "label": string,
//                     "code": string
//                 },
//                 "id": string,
//                 "number": string,
//                 "organization": {
//                     "id": number,
//                     "name": string,
//                     "tin": string,
//                     "title": string
//                 },
//                 "status": "ACTIVE",
//                 "title": "string"
//             },
//             "accountId": string,
//             "availableBalance": number,
//             "backgroundImage": string,
//             "balance": number,
//             "balanceHold": number,
//             "balances": [
//                 {
//                     "availableBalance": number,
//                     "balance": number,
//                     "balanceHold": number,
//                     "currency": string
//                 }
//             ],
//             "clientId": string,
//             "corporateRole": "OWNER",
//             "createdAt": string,
//             "currency": {
//                 "label": string,
//                 "code": string
//             },
//             "expireAt": string,
//             "id": string,
//             "limits": [
//                 {
//                     "currentValue": number,
//                     "maxLimitValue": number,
//                     "maxValue": number,
//                     "preferredMaxValues": [
//                         number
//                     ],
//                     "title": string,
//                     "type": "DAY",
//                     "usedValue": number
//                 }
//             ],
//             "number": string,
//             "options": {
//                 "limits": {
//                     "disable": boolean,
//                     "disable5min": boolean,
//                     "disableOneTime": boolean
//                 }
//             },
//             "organization": {
//                 "id": number,
//                 "name": string,
//                 "tin": string,
//                 "title": string
//             },
//             "owner": {
//                 "embossedName": string
//             },
//             "paySystem": "MASTERCARD",
//             "plasticStatus": "NOT_ISSUED",
//             "productType": "ADDITIONAL",
//             "status": "LOCKED",
//             "supports": [
//                 string
//             ],
//             "title": string
//         }
//     ],
//     "client": {
//         "address": {
//             "apartmentNumber": string,
//             "city": string,
//             "country": string,
//             "countryCode": string,
//             "postalCode": string,
//             "province": string,
//             "street": string,
//             "streetNumber": string
//         },
//         "citizenship": string,
//         "email": string,
//         "id": string,
//         "name": string,
//         "phoneNumber": string,
//         "status": "ACTIVE"
//     },
//     "clientName": string,
//     "id": number,
//     "name": string,
//     "tin": string,
//     "title": string,
//     "trustedClients": [
//         {
//             "clientId": string,
//             "color": "RED",
//             "name": string,
//             "title": string
//         }
//     ]
// }

// export const apiOrganizations = () => {
//     return $axios.get<$AxiosResponse<Array<IResOrganization>>>('/api/v2/organizations')
// }
//
