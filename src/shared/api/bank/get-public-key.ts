import {$axios} from "@/shared/lib/(orval)axios";

export interface IResPKey {
    publicKey: string;
}

interface IParams {
    phoneNumber: string;
}

export const apiPublicKey = ({phoneNumber}: IParams) =>
    $axios.get<IResPKey>('/api/v1/public_key', {
        baseURL: import.meta.env.VITE_BANK_API_URL,
        headers: {
            Productid: 'GEKKARD',
            Applicationid: 'GEKKARD',
            Authorization: phoneNumber,
        }
    });
