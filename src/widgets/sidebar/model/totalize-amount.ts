import Decimal from "decimal.js";
import $const from "@/shared/config/coins/constants";
import { ICtxCurrencyData } from "@/app/CurrenciesContext";

export default (list: Map<string, ICtxCurrencyData>, rates: Record<$const, number>) => {

    return Array.from(list.values()).filter(item => item.availableBalance !== null).reduce<Decimal>((previousValue: Decimal.Value, currentValue, i, list) => {

        const course = rates[currentValue.currency]
        const value = new Decimal(course).times(currentValue.availableBalance)

        return value.plus(previousValue)

    }, new Decimal(0))

}