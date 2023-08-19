import constants from "../config/coins/constants";
import {ICtxCurrencyData} from "@/processes/RootContext";
import {IResponseOrganizations, IResBalance, IResMarketAsset} from "../api";

export default (assets: IResMarketAsset[], wallets: IResBalance[], accountNumber: string, organizations: IResponseOrganizations) => {
    const currencies = new Map();

    assets.forEach(asset => {
        const walletInfo = wallets.find(wallet => asset.code === wallet.currency);

        if (asset.code === 'EUR') {
            const account = organizations.accounts.find(a => a.number === accountNumber);
            const eurBalance = account?.balances.find(b => b.currency === 'EUR');

            if (!eurBalance) return;

            const eurWallet: IResBalance = {
                lock_orders: 0,
                lock_in_balance: 0,
                currency: constants.EUR,
                lock_out_balance: eurBalance.balanceHold,
                free_balance: eurBalance.availableBalance
            };

            currencies.set(asset.code, new ICtxCurrencyData(asset, eurWallet));
            return;
        }

        currencies.set(asset.code, new ICtxCurrencyData(asset, walletInfo))
    })

    return currencies;
}
