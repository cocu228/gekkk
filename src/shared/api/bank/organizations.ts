import $axios from "@/shared/lib/(cs)axios";

export interface IClient {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    citizenship: string;
    status: string;
    address: any;
}

export interface IBalance {
    currency: string;
    balance: number;
    balanceHold: number;
    availableBalance: number;
}

export interface IAccount {
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
    balances: Array<IBalance>;
    createdAt: string;
    availableBalance: Array<string>;
    accountType: 'PHYSICAL' | 'JURIDICAL';
    productType: string;

    // Custom fields
    name?: string;
}

export interface ICard {
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
}

export interface IBankTrustedClient {
    clientId: string; 
    name: string;
    color: string; 
    title: string;
}

export interface IResponseOrganizations {
    id: number;
    config: any;
    name: string;
    tin: string;
    title: string;
    cards: ICard[];
    clientName: string;
    client: IClient;
    accounts: IAccount[];
    trustedClients: IBankTrustedClient[];
}

export const apiOrganizations = () => $axios.get<Array<IResponseOrganizations>>('/api/v2/organizations');
