import {format, startOfMonth, subDays, subYears} from "date-fns";
import {TabKey, HistoryTab} from "../model/types";
import {formatForDisplay} from "@/shared/lib/date-helper";

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

export function getTabsAsRecord(tabs: Array<HistoryTab>) {
    let list: Record<string, string> = {};

    tabs.forEach(tab => Object.assign(list, {
        [tab.Key]: tab.Title
    }));

    return list;
}