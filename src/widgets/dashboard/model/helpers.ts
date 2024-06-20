import { format } from "date-fns";

import StructedDepositStrategies from "@/shared/config/deposits/structed-strategies";

export const formatDateTime = (date: Date) => format(date, "dd.MM.yyyy 'at' HH:mm");

export const formatDate = (date: Date) => format(date, "dd.MM.yyyy");

export const formatMonthYear = (date: Date) => format(date, "MM/yy");

export const formatCardNumber = (number: string) => {
  const str = number.replaceAll(" ", "").replace("_", "******");

  return `${str.slice(0, 4)} ${str.slice(4, 8)} ${str.slice(8, 12)} ${str.slice(12, 16)}`;
};

export function getDepositTitle(depType: number) {
  if (depType === 1) return "Fixed rate (0,8% per month)";

  const { name, percentageTypes } = StructedDepositStrategies.find(
    s => Math.trunc(s.id / 10) === Math.trunc(depType / 10)
  );

  const { risePercentage, dropPercentage } = percentageTypes[depType % 10];

  return `${name} strategy (${risePercentage}/${dropPercentage})`;
}
