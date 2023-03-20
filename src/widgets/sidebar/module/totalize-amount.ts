import {ISortedListBalance} from "@/widgets/sidebar/module/sorting-list-balance";
import $const from "@/shared/config/coins/constants";
import Decimal from "decimal.js";

export default (sortedListBalance: Array<ISortedListBalance>, rates: Record<$const, number>) => {

    return sortedListBalance.reduce<Decimal>((previousValue: Decimal.Value, currentValue, i) => {
        const course = rates[currentValue.const]
        const value = new Decimal(course).times(currentValue.availableBalance)
        return value.plus(previousValue)
    }, new Decimal(0)).toDecimalPlaces(4).toNumber()

}