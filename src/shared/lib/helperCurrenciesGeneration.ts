import {ICtxCurrencyData} from "@/processes/RootContext";

export default (assets, wallets) => {
    const currencies = new Map()

    assets.forEach(asset => {
        const walletInfo = wallets.find(wallet => asset.code === wallet.currency)
        currencies.set(asset.code, new ICtxCurrencyData(asset, walletInfo))
    })

    return currencies
}