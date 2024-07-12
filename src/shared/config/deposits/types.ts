export type PercentageType = {
  risePercentage: number;
  dropPercentage: number;
};

export enum DepositType {
  FIXED = "Fixed",
  STRUCTED = "Structured"
}

export type StructedDepositStrategy = {
  id: number;
  name: string;
  descriptionShort: string | JSX.Element;
  descriptionLong: string | JSX.Element;
  riskPoints: 0 | 1 | 2;
  returnPoints: 1 | 2 | 3;
  percentageTypes: PercentageType[];
};
