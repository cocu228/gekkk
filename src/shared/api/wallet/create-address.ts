import $axios from "@/shared/lib/(cs)axios";


export const apiCreateAddress = function (token_network: number) {
    return $axios.get('/gek/v1/wallet/create_address', {
        headers: {
            token_network
        }
    })
}
