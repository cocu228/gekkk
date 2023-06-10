import {format} from "date-fns";
import StructedDepositStrategies from "@/shared/config/deposits/structed-strategies";

export const formatDateTime = (date: Date) =>
    format(date, "MM.dd.yyyy 'at' HH:mm");

export const formatDate = (date: Date) =>
    format(date, "MM.dd.yyyy");

export const formatMonthYear = (date: Date) =>
    format(date, "MM.yy");

export function getDepositTitle(depType: number) {
    if (depType === 1)
        return 'Fixed rate (0,8% per month)';

    const { name, percentageTypes } = StructedDepositStrategies.find(s =>
        Math.trunc(s.id / 10) === Math.trunc(depType / 10)
    );

    const { risePercentage, dropPercentage } = percentageTypes[depType % 10];

    return `${name} strategy (${risePercentage}/${dropPercentage})`;
}
