import { ActiveBonusProgram } from "@/shared/api/bank/deals/get-deals";

export interface Deal {
  id: ActiveBonusProgram;
  name: string;
  accrualPeriod: string;
  conditions: Array<string>;
  className: CSSModuleClasses[string];
  mobileModalColor: CSSModuleClasses[string];
  iconPath: string;
  isActive: boolean;
}
