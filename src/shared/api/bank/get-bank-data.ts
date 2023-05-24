import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";

export interface IBankData {
    // Temporary not needed
    id: any;
    client: any;
    config: any;
    name: any;
    tin: any;
    title: any;
    trustedClients: any;
    
    // Useful information
    clientName: string;
    accounts: [{
        id: string;
        number: string;
        title: null | string;
        status: string;
        currency: {
            code: string;
        };
        clientId: string;
        color: string;
        accountName: string;
        bonusProgramActivate: boolean;
        activeBonusProgram: string;
        activeBonusPrograms: Array<string>;
        balance: number;
        balanceHold: number;
        accruedInterest: any;
        balances: Array<number>;
        createdAt: string;
        availableBalance: Array<string>;
        accountType: string;
        productType: string;
    }];
    cards: [{
        accountId: string;
        availableBalance: number;
        backgroundImage: any;
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
