import {$axios} from "@/shared/lib/(orval)axios";

export interface IAppRegistration {
    appUuid: string;
    secretePassword: string;
    salt: string;
}

export const apiRegisterApp = (appPublicKey: string) =>
    $axios.post<IAppRegistration>('/api/v1/register_app', {
        publicKey: appPublicKey
    });
