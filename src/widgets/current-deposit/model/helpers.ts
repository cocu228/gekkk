import {PercentageType, StructedDepositStrategy} from "@/shared/config/deposits/types";
import StructedDepositStrategies from "@/shared/config/deposits/structed-strategies";
import Decimal from "decimal.js";
import {GetDepositOut} from "@/shared/(orval)api/shared/model";

export interface InvestData {
    isClosed?: boolean;
    isFixed?: boolean;
}

export function getInvestmentData(investment: GetDepositOut): InvestData {
    return {
        isClosed: new Date() > new Date(investment.date_end),
        isFixed: investment.dep_type === 1
    }
}

export interface IDepositStrategyData {
    strategy?: StructedDepositStrategy;
    percentageType?: PercentageType;
}

export function getDepositStrategyData(depType: number): IDepositStrategyData{
    const strategy = StructedDepositStrategies.find(s => Math.trunc(s.id / 10) === Math.trunc(depType / 10));

    return {
        strategy: strategy,
        percentageType: strategy?.percentageTypes[depType % 10],
    }
}

export function getDifRatesAmount(rate: Decimal, startingRate: Decimal, percentage: PercentageType) {
    const diff = rate.minus(startingRate);

    if (diff.lessThan(0))
        return -diff.mul(percentage.dropPercentage / 100).toNumber();
    else
        return diff.mul(percentage.risePercentage / 100).toNumber();
}

export function getDepositCurrentProfit(
    annualProfit: number,
    amount: Decimal,
    diffPercent: Decimal,
    strategyInfo: IDepositStrategyData
): number {
    const {
        strategy,
        percentageType
    } = strategyInfo

    const {
        risePercentage,
        dropPercentage
    } = percentageType

    const rateGrowthProfit = amount.mul(diffPercent).mul(risePercentage).div(10000);

    if (strategy.id / 10 === 1) {
        return diffPercent.greaterThanOrEqualTo(0)
            ? Math.max(rateGrowthProfit.toNumber(), annualProfit)
            : annualProfit
    }

    if (diffPercent.equals(0)) return 0

    const rateDropLoss = amount.mul(diffPercent).div(100)
    const projectedLoss = amount.mul(dropPercentage).div(100)

    return diffPercent.greaterThanOrEqualTo(0)
        ? rateGrowthProfit.toNumber()
        : Math.max(rateDropLoss.toNumber(), projectedLoss.toNumber())
}
