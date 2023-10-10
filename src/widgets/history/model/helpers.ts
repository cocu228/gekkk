import {format, startOfMonth, subDays, subYears} from "date-fns";
import {TabKey, HistoryTab} from "../model/types";
import {formatForDisplay} from "@/shared/lib/date-helper";
import {formatAsNumberAndDot} from "@/shared/lib/formatting-helper";
import Decimal from "decimal.js";

// const timeZoneCustomer = 'Europe/Moscow'


export const historyTabs: Array<HistoryTab> = [
    // {
    //     Key: TabKey.MONTH,
    //     Title: 'This month',
    //     StartDate: formatForDisplay(startOfMonth(new Date())),
    //     EndDate: formatForDisplay(new Date())
    // },
    // {
    //     Key: TabKey.DAYS_30,
    //     Title: 'Last 30 days',
    //     StartDate: formatForDisplay(subDays(new Date(), 30)),
    //     EndDate: formatForDisplay(new Date())
    // },
    // {
    //     Key: TabKey.DAYS_90,
    //     Title: 'Last 90 days',
    //     StartDate: formatForDisplay(subDays(new Date(), 90)),
    //     EndDate: formatForDisplay(new Date())
    // },
    {
        Key: TabKey.YEAR,
        Title: 'last transactions',
        StartDate:"",
        EndDate: ""
    },
    {
        Key: TabKey.CUSTOM,
        Title: 'custom period',
    }
];

export const containsNonLatinCharacters = (str) =>{
    return /^[^\u0000-\u007F]+$/.test(str);

}

// export const formatAsFee = (value: number, max = 18) => {
//
//     const decimal = new Decimal(value)
//
//     if (decimal.isFinite()) {
//         const decimalString = decimal.toString()
//         const regex = /e-(\d+)/;
//         const match = decimalString.match(regex);
//
//         if (match && new Decimal(match[1]).toNumber() < max) {
//             return decimal.toFixed(new Decimal(match[1]).toNumber());
//         } else {
//             return value;
//         }
//     } else {
//         return value;
//     }
//
// }
