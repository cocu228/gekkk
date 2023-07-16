import $axios, {$AxiosResponse} from "@/shared/lib/(cs)axios";


export const apiGetAgentCode = () => $axios.get<$AxiosResponse<string>>('/gek/v1/referral/get_agent_code')
