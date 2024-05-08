import { ICtxCurrency } from "@/processes/CurrenciesContext";

const gekkardMode = global.VITE_APP_TYPE.toLowerCase().includes("gekkard");
const gekwalletMode = global.VITE_APP_TYPE.toLowerCase().includes("gekwallet");

export const helperFilterList = (list: Array<ICtxCurrency>) =>
    list.filter(({
        $const,
        balance
    }) => $const !== "EUR" && (gekkardMode ? ($const !== "EURG" && $const !== "GKE") : gekwalletMode ? ($const !== "BTC" && $const !== "USDT" && $const !== "ETH") : true) && balance && (
        balance.free_balance > 0
        || balance.lock_in_balance > 0
        || balance.lock_orders > 0
        || balance.lock_out_balance > 0
        || balance.user_balance > 0
    ));
