export interface IExchangeToken {
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

export type AssetTableColumn = {
    key: AssetTableKeys,
    template: JSX.Element
}
