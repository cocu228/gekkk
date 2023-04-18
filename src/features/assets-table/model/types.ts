import Decimal from "decimal.js";

export interface IExchangeToken {
    balance: Decimal,
    currency: string,
    name: string,
    roundTo?: number
}
