import { memo, useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router'
import Header from "@/widgets/header/ui/";
import Sidebar from "@/widgets/sidebar/ui/";
import Main from "@/app/layouts/main/Main";
import Content from "@/app/layouts/content/Content";
import Loader from "@/shared/ui/loader";
import { storeListAllCryptoName } from "@/shared/store/crypto-assets/list-all-name";
import { storeListAvailableBalance } from "@/shared/store/crypto-assets/list-available-balance";
import Decimal from 'decimal.js';
import { apiGetBalance, apiGetMarketAssets } from '@/shared/api';
import { CtxCurrencyList, ICtxCurrencyData } from '../CurrenciesContext';

export default memo(function () {
    const [currencyList] = useState<Map<string, ICtxCurrencyData>>(new Map());

    // const [, setSessionGlobal] = useSessionStorage("session-global", {})

    const getListAllCryptoName = storeListAllCryptoName(state => state.getListAllCryptoName)
    const getDefaultListBalance = storeListAvailableBalance(state => state.getDefaultListBalance)
    const setSortedListBalance = storeListAvailableBalance(state => state.setSortedListBalance)

    const [state, setState] = useState({
        loading: true
    })

    useEffect(() => {

        (async function () {

            const listAllCryptoName = await getListAllCryptoName()

            // setSessionGlobal(prevState => ({...prevState, listAllCryptoName: listAllCryptoName}))

            const listCryptoAssets = (await apiGetMarketAssets()).data.result;
            const listWallets = (await apiGetBalance()).data.result;

            if (listCryptoAssets && listWallets) {
                listCryptoAssets.forEach(asset => {
                    const wallet = listWallets.find(w => w.currency === asset.code);

                    currencyList.set(asset.code, {
                        id: asset.unified_cryptoasset_id,
                        name: asset.name,
                        flags: asset.flags,
                        currency: asset.code,
                        minOrder: asset.min_order,
                        roundPrec: asset.round_prec,
                        ordersPrec: asset.orders_prec,
                        decimalPrec: asset.decimal_prec,
                        defaultTokenNetworkIn: asset.default_token_network_in,
                        defaultTokenNetworkOut: asset.default_token_network_out,

                        lockOrders: wallet ? wallet.lock_orders : null,
                        lockInBalance: wallet ? wallet.lock_in_balance : null,
                        lockOutBalance: wallet ? wallet.lock_out_balance : null,
                        availableBalance: wallet ? new Decimal(wallet.free_balance) : null,
                    })
                });

                if (await getDefaultListBalance()) {
                    setSortedListBalance(listAllCryptoName) ? setState(prevState => ({
                        ...prevState,
                        loading: false
                    })) : null

                }
            }
        })()
    }, [])

    return <CtxCurrencyList.Provider value={currencyList}>
        <Header />
        {!state.loading ? <Main>
            <Sidebar />
            <Content>
                <Outlet />
            </Content>
        </Main> : <Loader />}
    </CtxCurrencyList.Provider>
});
