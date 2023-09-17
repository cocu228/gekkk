import constants from "../config/coins/constants";
import {ICtxCurrency} from "@/processes/CurrenciesContext";
import {IResBalance, IResMarketAsset} from "../api";

export default (assets: IResMarketAsset[], wallets: IResBalance[]) => {
    const currencies = new Map();

    assets.forEach(asset => {
        const walletInfo = wallets.find(wallet => asset.code === wallet.currency);

        // if (asset.code === 'EUR') {
        //     // TODO: null-balance (on load)
        //     // const eurWallet: IResBalance = {
        //     //     lock_orders: 0,
        //     //     lock_in_balance: 0,
        //     //     currency: constants.EUR,
        //     //     lock_out_balance: 0,
        //     //     free_balance: 0
        //     // };
        //
        //     currencies.set(asset.code, new ICtxCurrency(asset, eurWallet));
        //     return;
        // }

        currencies.set(asset.code, new ICtxCurrency(asset, walletInfo))
    })

    return currencies;
}
