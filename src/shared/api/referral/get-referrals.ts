import $axios, {$AxiosResponse} from "@/shared/lib/(cs)axios";

export interface IResReferrals {
    referID: string | null,
    referrals: [
        {
            client_id: string,
            reg_date: string
        }
    ] | null,
    deposits: {
        depositid: string
    } | null
}

export const apiGetReferrals = () => $axios.get<$AxiosResponse<IResReferrals>>('/gek/v1/referral/get_referrals')
