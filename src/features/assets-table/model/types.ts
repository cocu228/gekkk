export interface IExchangeToken {
    currency: string,
    name: string,
    roundTo?: number
}

export enum AssetTableKeys {
    NAME = 'Name',
    PRICE = 'Price',
    CURRENCY = 'Currency',
    ACTIONS = 'Actions'
}
