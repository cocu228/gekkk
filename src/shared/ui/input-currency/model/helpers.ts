import Decimal from "decimal.js";


export const toNumberInputCurrency = (input: string) => !input ? 0 : new Decimal(input).toNumber()
