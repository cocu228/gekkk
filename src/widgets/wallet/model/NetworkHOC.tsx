import {CtxWalletCurrency, CtxWalletNetworks, ICtxWalletNetworks} from "@/widgets/wallet/model/context";
import React, {useContext, useEffect, useState} from "react";
import {apiTokenNetworks, IResTokenNetwork} from "@/shared/api";
import {
    helperApiTokenNetworks,
    sortingNetworksForSelector,
    getAddressForChose
} from "@/widgets/wallet/model/helper";
import {storeListAddresses} from "@/shared/store/crypto-assets";
import {AxiosResponse} from "axios";


interface IProps {
    children: React.ReactNode
}

const NetworkHOC = ({children}: IProps) => {

    const getListAddresses = storeListAddresses(state => state.getListAddresses)
    const listAddresses = storeListAddresses(state => state.listAddresses)

    const currency = useContext(CtxWalletCurrency)

    const initState = {
        networksForSelector: null,
        networksDefault: null,
        networkIdSelect: null,
        addressesForQR: null,
        loading: true,
        refreshKey: null
    }
    const [state, setState] =
        useState<Omit<ICtxWalletNetworks, "setRefresh" | "setLoading" | "setNetworkId">>(initState)

    const setNetworkId = (networkIdSelect) => {
        setState(prev => ({
            ...prev,
            networkIdSelect,
            addressesForQR: getAddressForChose(listAddresses,
                prev.networksDefault.find(it => it.id === networkIdSelect))
        }))
    }

    const setLoading = (loading) => setState(prev => ({
        ...prev,
        loading
    }))
    const setRefresh = (refreshKey) => setState(prev => ({
        ...prev,
        refreshKey
    }))


    const clearState = () => setState(initState)


    useEffect(() => {

        (async () => {

            clearState()

            await getListAddresses()

            const response: AxiosResponse = await apiTokenNetworks(currency.const);

            helperApiTokenNetworks(response).success((networksDefault: Array<IResTokenNetwork>) => {

                const networksForSelector = sortingNetworksForSelector(networksDefault)

                setState(prev => ({
                    ...prev,
                    networksDefault,
                    networksForSelector,
                    loading: false
                }))
            })

        })()

    }, [currency, state.refreshKey])

    return <CtxWalletNetworks.Provider
        value={({...state, setNetworkId, setLoading, setRefresh})}>{children}</CtxWalletNetworks.Provider>

}

export default NetworkHOC