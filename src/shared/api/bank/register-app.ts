import {$axios} from "@/shared/lib/(orval)axios";

export interface IAppRegistration {
    appUuid: string;
    secretePassword: string;
    salt: string;
}

interface IParams {
    uasToken: string;
    phoneNumber: string;
    appPublicKey: string;
}

export const apiRegisterApp = ({appPublicKey, phoneNumber, uasToken}: IParams) =>
    $axios.post<IAppRegistration>('/api/v1/register_app', {
        publicKey: appPublicKey
    }, {
        baseURL: import.meta.env.VITE_BANK_API_URL,
        headers: {
            Token: uasToken,
            Productid: 'GEKKARD',
            Applicationid: 'GEKKARD',
            Authorization: phoneNumber
        }
    });
