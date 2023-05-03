import $axios from "@/shared/lib/(cs)axios";


export const apiCreateTxCode = (amount: number, currency: string, typeTx: number) =>
    $axios.post('/gek/v1/create_tx_code', {
        amount: amount,
        currency: currency,
        typeTx: typeTx,
        timeLimit: true,
        clientNonce: new Date().getTime()
    })
