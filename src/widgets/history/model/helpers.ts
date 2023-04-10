import {format, startOfMonth, subDays, subYears} from "date-fns";
import {TabKey, HistoryTab} from "../model/types";
import {utcToZonedTime} from "date-fns-tz";

// const timeZoneCustomer = 'Europe/Moscow'
const timeZoneCustomer = Intl.DateTimeFormat().resolvedOptions().timeZone
export const formatForApiReq = (value: Date) =>
    format(value, 'yyyy-MM-dd');


export const formatForTimeZone = (value) => utcToZonedTime(value, timeZoneCustomer)
export const formatForCustomer = (value) => format(formatForTimeZone(new Date(value)), "dd MMMM yyyy HH:mm")


export const historyTabs: Array<HistoryTab> = [
    {
        Key: TabKey.MONTH,
        Title: 'This month',
        StartDate: formatForApiReq(startOfMonth(new Date())),
        EndDate: formatForApiReq(new Date())
    },
    {
        Key: TabKey.DAYS_30,
        Title: 'Last 30 days',
        StartDate: formatForApiReq(subDays(new Date(), 30)),
        EndDate: formatForApiReq(new Date())
    },
    {
        Key: TabKey.DAYS_90,
        Title: 'Last 90 days',
        StartDate: formatForApiReq(subDays(new Date(), 90)),
        EndDate: formatForApiReq(new Date())
    },
    {
        Key: TabKey.YEAR,
        Title: 'This year',
        StartDate: formatForApiReq(subYears(new Date(), 1)),
        EndDate: formatForApiReq(new Date())
    },
    {
        Key: TabKey.CUSTOM,
        Title: 'Custom period',
    }
];

export function getTabsAsRecord(tabs: Array<HistoryTab>) {
    let list: Record<string, string> = {};

    tabs.forEach(tab => Object.assign(list, {
        [tab.Key]: tab.Title
    }));

    return list;
}