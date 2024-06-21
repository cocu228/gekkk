import constants from "@/shared/config/coins/constants";

export enum RateState {
  UP = 0,
  DOWN = 1
}

export interface IExchangeField {
  amount: string | null;
  currency: constants | string | null;
}

export interface IExchangePrice {
  isSwapped: boolean;
  amount: string | null;
}

export enum OrderState {
  OPENED = "Created",
  FAILED = "Failed",
  CLOSED = "Canceled"
}

export enum TabKey {
  OPENED = "Opened",
  CLOSED = "Closed"
}

export type OrdersTab = {
  Key: TabKey;
  Title: string;
};
