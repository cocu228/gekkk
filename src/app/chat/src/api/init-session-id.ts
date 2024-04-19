import {makeApiRequest} from "../utils/(cs)axios";

export interface IResSessionId {
    id: number;
    userId: number;
    email: string;
    appId: string;
    productId: string;
    locale: string;
    appVersion: string;
}

export const apiInitSessionId = () => {
    const payload = {
        appId: 'GEKKARD',
        productId: 'GEKKARD',
        appVersion: '1',
        locale: 'en'
    };
    return makeApiRequest<IResSessionId>('POST', '/api/v1/users/session', payload);
}
