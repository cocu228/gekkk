import {AXIOS_INSTANCE as $axios} from "@/shared/lib/(orval)axios";

export interface IResPKey {
    publicKey: string;
}

export const apiPublicKey = () =>
    $axios.get<IResPKey>('/api/v1/public_key');
