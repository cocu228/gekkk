import { format } from "date-fns";

export const formatDateTime = (date: Date) =>
    format(date, "MM.dd.yyyy 'at' HH:mm");

export const formatDate = (date: Date) =>
    format(date, "MM.dd.yyyy");

export const formatMonthYear = (date: Date) =>
    format(date, "MM.yy");
