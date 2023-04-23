import $axios from "@/shared/lib/(cs)axios";

export interface IResCreateWithdraw {

}

export const apiCreateNetwork = (type_network: number) =>
    $axios.get<IResCreateWithdraw>('/gek/v1/client/create_withdraw', {
        params: {
            type_network
        }
    })
