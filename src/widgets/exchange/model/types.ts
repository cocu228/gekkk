export enum RateState {
    UP = 0,
    DOWN = 1
}

export interface IExchangeField {
    amount: string | null;
    currency: string | null;
}

export interface IExchangePrice {
    isSwapped: boolean;
    amount: number | null;
}
