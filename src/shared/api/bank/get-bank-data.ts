import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";

export interface IBankData {
    // Temporary not needed
    id: any;
    accounts: any;
    client: any;
    config: any;
    name: any;
    tin: any;
    title: any;
    trustedClients: any;

    // Useful information
    clientName: string;
    cards: [{
        accountId: string;
        availableBalance: number;
        backgroundImage: null | any;
        balance: number;
        balanceHold: number;
        balances: any;
        clientId: string;
        createdAt: null | string;
        currency: {
            code: string;
        };
        expireAt: string;
        id: string;
        limits: any;
        number: string;
        options: any;
        owner: {
            embossedName: string;
        }
        paySystem: string;
        plasticStatus: string;
        productType: string;
        status: string;
        title: null | string;
    }];
}

export const apiGetBankData = () =>
    $axios.get<IBankData>('/api/v2/organizations');
