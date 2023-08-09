import Decimal from "decimal.js";
import ETokensConst from "@/shared/config/coins/constants";
import { ICtxCurrencyData } from "@/processes/RootContext";

export default (list: Map<string, ICtxCurrencyData>, rates: Record<ETokensConst, number>) => {

    return Array.from(list.values()).filter(item => item.availableBalance !== null).reduce<Decimal>((previousValue: Decimal.Value, currentValue, i, list) => {

        const course = rates[currentValue.$const]
        const value = new Decimal(course).times(currentValue.availableBalance)

        return value.plus(previousValue)

    }, new Decimal(0))

}