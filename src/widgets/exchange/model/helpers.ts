import {TradePriceArray} from "@/shared/api";

export const tradeArraySorter = (a: TradePriceArray, b: TradePriceArray) => {
    return a[2] > b[2] ? 1 : -1;
}
