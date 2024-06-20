import { ICtxCurrency } from "@/processes/CurrenciesContext";

import { GetBalanceOut, CurrencysOut } from "../(orval)api/gek/model";

export const initEmptyCurrenciesCollection = (assets: CurrencysOut[]): Map<string, ICtxCurrency> => {
  const currencies = new Map();
  assets.forEach(asset => currencies.set(asset.code, new ICtxCurrency(asset)));
  return currencies;
};

export const walletsGeneration = (
  currencies: Map<string, ICtxCurrency>,
  wallets: GetBalanceOut[]
): Map<string, ICtxCurrency> => {
  wallets.forEach(wallet => {
    currencies.set(wallet.currency, {
      ...currencies.get(wallet.currency),
      balance: wallet
      // lockOrders: wallet.lock_orders,
      // userBalance: wallet.user_balance,
      // lockInBalance: wallet.lock_in_balance,
      // lockOutBalance: wallet.lock_out_balance,
      // userBalanceEUREqu: wallet.user_balance_EUR_equ,
      // availableBalance: isNumber(wallet.free_balance) ? new Decimal(wallet.free_balance) : null,
    });
  });

  return currencies;
};
