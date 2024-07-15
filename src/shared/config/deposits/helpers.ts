import { PercentageType } from "./types";

export const getGkePercent = (percentageType: PercentageType, isGke: boolean) => ({
  risePercent: !isGke ? percentageType?.risePercentage : percentageType?.risePercentage * 2,
  dropPercent: !isGke
    ? percentageType?.dropPercentage
    : percentageType?.dropPercentage >= 0
    ? percentageType?.dropPercentage * 2
    : percentageType?.dropPercentage / 2
});
