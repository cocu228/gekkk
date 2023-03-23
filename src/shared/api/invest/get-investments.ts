import $axios from "@/shared/lib/(cs)axios";


interface IResInvestments {
    id: number,
    currency_id: string,
    dep_type: number,
    amount: number,
    cur_amount: number,
    date_end: string,
    date_start: string,
    link_currency: string,
    link_cur_start_rate: number,
    link_cur_end_rate: number
}

export const apiInvestments = (start?: string, end?: string) =>
    $axios.get<IResInvestments[]>('/gek/v1/invest/get_investments', {
        params: {
            start,
            end
        }
    })

