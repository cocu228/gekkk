import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";

export const apiReturnInvestment = (depositId: string) =>
    $axios.post<$AxiosResponse<{status: string}>>('/gek/v1/invest/return_investment', null, {
        params: {
            depositId
        }
    })
