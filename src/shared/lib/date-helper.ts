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

export function getFirstDayOfPreviousMonth(): Date {
  const currentDate = new Date();
  const firstDayCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  firstDayCurrentMonth.setMonth(firstDayCurrentMonth.getMonth() - 1);

  return new Date(firstDayCurrentMonth.getFullYear(), firstDayCurrentMonth.getMonth(), 1);
}

export function getHigherDate(first: Date, second: Date): Date {
  const date1 = new Date(first).getTime();
  const date2 = new Date(second).getTime();

  if (date1 < date2) return second;

  return first;
}

export function getLowerDate(first: Date, second: Date): Date {
  const date1 = new Date(first).getTime();
  const date2 = new Date(second).getTime();

  if (date1 < date2) return first;

  return second;
}

const timeZoneCustomer = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const formatForTimeZone = value => utcToZonedTime(value, timeZoneCustomer);
export const formatForFile = value => format(formatForTimeZone(new Date(value)), "dd.MM.yyyy_HH.mm");
export const formatForHistoryMobile = value => format(formatForTimeZone(new Date(value)), "dd.MM.yy");
export const formatForCustomer = value => format(formatForTimeZone(new Date(value)), "dd/MM/yy HH:mm");
export const formatForHistoryTimeMobile = value => format(formatForTimeZone(new Date(value)), "HH:mm");
