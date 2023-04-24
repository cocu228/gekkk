import Decimal from "decimal.js";

export interface IExchangeToken {
    balance: Decimal,
    currency: string,
    name: string,
    roundTo?: number
}

export enum AssetTableKeys {
    NAME = 'Name',
    PRICE = 'Price',
    BALANCE = 'Balance',
    CURRENCY = 'Currency',
    ACTIONS = 'Actions'
}

