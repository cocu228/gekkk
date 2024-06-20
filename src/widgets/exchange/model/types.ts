export enum RateState {
  UP = 0,
  DOWN = 1
}

export interface IExchangeField {
  amount: string | null;
  currency: string | null;
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
