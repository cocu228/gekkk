import {ISortedListBalance} from "@/shared/model/sorting-list-balance";
import $const from "@/shared/config/coins/constants";
import Decimal from "decimal.js";

export default (sortedListBalance: Array<ISortedListBalance>, rates: Record<$const, number>) => {
    console.log(sortedListBalance)
    return sortedListBalance.reduce<Decimal>((previousValue: Decimal.Value, currentValue, i, list) => {

        const course = rates[currentValue.const]
        const value = new Decimal(course).times(currentValue.availableBalance)

        return i + 1 === list.length ? value.plus(previousValue).toDecimalPlaces(currentValue.token.decimal_prec) : value.plus(previousValue)

    }, new Decimal(0))

}