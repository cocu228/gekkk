import $axios from "@/shared/lib/(cs)axios";

export interface IResPKey {
    publicKey: string;
}

export const apiPublicKey = () =>
    $axios.get<IResPKey>('/api/v1/public_key');
