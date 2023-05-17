import { addDays, format } from "date-fns";

export const getTermEnd = (startDate: Date, termDaysCount: number) => {
    if (!termDaysCount) return;

    return format(addDays(startDate, termDaysCount), "MM.dd.yyyy 'at' HH:mm");
}
