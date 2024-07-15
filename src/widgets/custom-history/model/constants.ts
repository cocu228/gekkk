import { ISelectTxTypes } from "./types";

export const dateFormat = "YYYY-MM-DD";

export const options: ISelectTxTypes[] = [
  {
    label: "top up",
    t: "top_up_wallet",
    value: [3, 5]
  },
  {
    label: "withdraw",
    t: "withdraw",
    value: [1, 4, 6]
  },
  {
    label: "exchange",
    t: "exchange.title",
    value: [2, 15, 16, 20]
  },
  {
    label: "investments",
    t: "investments",
    value: [7, 8, 9, 10]
  },
  {
    label: "rewards",
    t: "rewards",
    value: [17, 18]
  }
];
