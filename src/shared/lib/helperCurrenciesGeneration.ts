import constants from "../config/coins/constants";
import {IResBalance, IResMarketAsset} from "../api";
import {ICtxCurrencyData} from "@/processes/RootContext";

export default (assets: IResMarketAsset[], wallets: IResBalance[]) => {
    const currencies = new Map();

    assets.forEach(asset => {
        const walletInfo = wallets.find(wallet => asset.code === wallet.currency);

        if (asset.code === 'EUR') {
            // TODO: null-balance (on load)
            const eurWallet: IResBalance = {
                lock_orders: 0,
                lock_in_balance: 0,
                currency: constants.EUR,
                lock_out_balance: 0,
                free_balance: 0
            };

            currencies.set(asset.code, new ICtxCurrencyData(asset, eurWallet));
            return;
        }

        currencies.set(asset.code, new ICtxCurrencyData(asset, walletInfo))
    })

    return currencies;
}
