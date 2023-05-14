import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";

export const apiCreateInvestment = (
    amount: number,
    term_days: number,
    link_currency: string,
    templateType: number
) =>
    $axios.post<$AxiosResponse<{depositID: number}>>('/gek/v1/invest/create_investment', {}, {
        params: {
            amount,
            term_days,
            link_currency,
            depo_template_type: templateType,
        }
    })
