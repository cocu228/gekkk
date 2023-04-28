import $axios from "@/shared/lib/(cs)axios";


export const apiCreateTxCode = (amount: number, currency: string) =>
    $axios.post('/gek/v1/create_tx_code', {
        "amount": amount,
        "currency": currency,
        "typeTx": 0,
        "timeLimit": true,
        "clientNonce": 24529041564
    })
