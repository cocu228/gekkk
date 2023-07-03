import $axios from "@/shared/lib/(cs)axios";

export interface IBankClient {
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    citizenship: string;
    status: string;
    address: any;
}

export interface IBankAccount {
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
    accountType: 'PHYSICAL' | 'JURIDICAL';
    productType: string;

    // Custom fields
    name?: string;
}

export interface IBankCard {
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

export interface IBankData {
    // Temporary not needed
    id: any;
    config: any;
    name: any;
    tin: any;
    title: any;
    
    // Useful information
    cards: IBankCard[];
    clientName: string;
    client: IBankClient;
    accounts: IBankAccount[];
    trustedClients: IBankTrustedClient[];
}

export const apiGetBankData = () =>
    $axios.get<Array<IBankData>>('/api/v2/organizations');
