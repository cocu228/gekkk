import {GetDepositOut} from "@/shared/(orval)api/gek/model";
import {PercentageType, StructedDepositStrategy} from "@/shared/config/deposits/types";
import StructedDepositStrategies from "@/shared/config/deposits/structed-strategies";

export interface InvestData {
    isClosed?: boolean;
    isFixed?: boolean;
}

export function getInvestmentData(investment: GetDepositOut): InvestData {
    return {
        isClosed: new Date() > new Date(investment.date_end),
        isFixed: [1, 101].includes(investment.dep_type)
    }
}

export interface IDepositStrategyData {
    strategy?: StructedDepositStrategy;
    percentageType?: PercentageType;
}

export function getDepositStrategyData(depType: number): IDepositStrategyData {
    depType = depType > 100 ? depType - 100 : depType;

    const strategy = StructedDepositStrategies.find(s => Math.trunc(s.id / 10) === Math.trunc(depType / 10));

    return {
        strategy: strategy,
        percentageType: strategy?.percentageTypes[depType % 10],
    }
}

export function getDifRatesAmount(rate:number, startingRate:number, percentage:PercentageType) {
    const diff = rate - startingRate;

    if (diff < 0) {
        return -(diff * (percentage.dropPercentage / 100));
    } else {
        return diff * (percentage.risePercentage / 100);
    }
}

export function getDepositCurrentProfit(
    annualProfit: number,
    amount: number,
    diffPercent: number,
    strategyInfo: IDepositStrategyData,
    isGke: boolean
): number {
    const {
        strategy,
        percentageType
    } = strategyInfo

    let {
        risePercentage,
        dropPercentage
    } = percentageType

    if (isGke) {
        risePercentage = risePercentage * 2;
        dropPercentage = dropPercentage > 0
            ? dropPercentage * 2
            : dropPercentage / 2;
    }
    const rateGrowthProfit = (amount * diffPercent * risePercentage) / 10000;

    if (strategy.id / 10 === 1) {
        return diffPercent >= 0
            ? Math.max(rateGrowthProfit, annualProfit)
            : annualProfit;
    }

    if (diffPercent === 0) return 0;

    const rateDropLoss = (amount * diffPercent) / 100;
    const projectedLoss = (amount * dropPercentage) / 100;
    
    return diffPercent >= 0
        ? rateGrowthProfit
        : Math.max(rateDropLoss, projectedLoss);
}
