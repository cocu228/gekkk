import $axios from "@/shared/lib/(cs)axios";


export const apiGetBalance = (clientId: string, phone: string, token: string, currency?: string) => $axios.get('/gek/v1/client/get_balance', {
    headers: {
        "client_id": clientId,
        currency,
        "Authorization": phone,
        "productId": "BLACK_CAT_CARD",
        token
    },
    transformResponse: [(data) => {
        return JSON.parse(data)
    }],
})

