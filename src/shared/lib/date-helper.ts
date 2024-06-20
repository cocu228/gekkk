import { utcToZonedTime } from "date-fns-tz";
import { format, isAfter, isBefore, isSameSecond } from "date-fns";

export const MINUTE_MILIS = 60 * 1000;

export const HOUR_MILIS = 60 * MINUTE_MILIS;

export const DAY_MILIS = 24 * HOUR_MILIS;

export const WEEK_MILIS = DAY_MILIS * 7;

export const sameOrBefore = (d1 = new Date(), d2 = new Date()) => isSameSecond(d1, d2) || isBefore(d1, d2);
export const sameOrAfter = (d1 = new Date(), d2 = new Date()) => isSameSecond(d1, d2) || isAfter(d1, d2);

export const formatForApi = (value: Date | string) =>
  typeof value === "string" ? format(new Date(value), "yyyy-MM-dd") : format(value, "yyyy-MM-dd");

// const timeZoneCustomer = 'Europe/Moscow'

const timeZoneCustomer = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const formatForTimeZone = value => utcToZonedTime(value, timeZoneCustomer);
export const formatForCustomer = value => format(formatForTimeZone(new Date(value)), "dd/MM/yy HH:mm");
export const formatForHistoryMobile = value => format(formatForTimeZone(new Date(value)), "dd.MM.yy");
export const formatForHistoryTimeMobile = value => format(formatForTimeZone(new Date(value)), "HH:mm");
