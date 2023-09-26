import $axios from "@/shared/lib/(cs)axios";

export interface AvailableDeals {
  availableDeals: Array<AvailableDeal>;
}

export interface AvailableDeal {
  dealName: ActiveBonusProgram;
  startDeal: string;
  endDeal: string;
}

export enum ActiveBonusProgram {
  CASHBACK1 = 'CASH_BACK_PROGRAM_1',
  CASHBACK2 = 'CASH_BACK_PROGRAM_2',
  CASHBACK3 = 'WILDBERRIES_PROGRAM',
  CASHBACK_AMAZON = 'CASH_BACK_PROGRAM_4',
  CASHBACK_MOBILE_STORES = 'CASH_BACK_PROGRAM_5',
  CASHBACK_GKE ="CASH_BACK_PROGRAM_GKE",
}


export interface Deal {
  id: ActiveBonusProgram;
  name: string;
  accrualPeriod: string;
  conditions: Array<string>;
  className: CSSModuleClasses[string],
  mobileModalColor: CSSModuleClasses[string],
  iconPath: string,
  isActive: boolean,
}

export const apiGetDeals = () =>
  $axios.get<AvailableDeals>('/api/v1/deals');
