import constants from "../config/coins/constants";
import {ICtxCurrency} from "@/processes/CurrenciesContext";
import {IResBalance, IResMarketAsset} from "../api";

export default (assets: IResMarketAsset[], wallets: IResBalance[]/*, accountNumber: string, organizations: IResponseOrganizations*/) => {
    const currencies = new Map();

    assets.forEach(asset => {
        const walletInfo = wallets.find(wallet => asset.code === wallet.currency);

        if (asset.code === 'EUR') {
            const eurWallet: IResBalance = {
                lock_orders: 0,
                lock_in_balance: 0,
                currency: constants.EUR,
                lock_out_balance: 0, //eurBalance.balanceHold,
                free_balance: 0 //eurBalance.availableBalance
            };

            currencies.set(asset.code, new ICtxCurrency(asset, eurWallet));
            return;
        }

        currencies.set(asset.code, new ICtxCurrency(asset, walletInfo))
    })

    return currencies;
}
