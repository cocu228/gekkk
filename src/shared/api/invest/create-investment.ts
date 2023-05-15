import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";

interface IParams {
    amount: number;
    term_days: number;
    link_currency: string;
    templateType: number;
}

export const apiCreateInvestment = ({
    amount,
    term_days,
    link_currency,
    templateType
}: IParams) =>
    $axios.post<$AxiosResponse<{depositID: number}>>('/gek/v1/invest/create_investment', null, {
        params: {
            amount,
            term_days,
            link_currency,
            depo_template_type: templateType,
        }
    })
