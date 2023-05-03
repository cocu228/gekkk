import {CtxWalletCurrency, CtxWalletNetworks, ICtxWalletNetworks} from "@/widgets/wallet/model/context";
import React, {useContext, useEffect, useState} from "react";
import {apiTokenNetworks, IResTokenNetwork} from "@/shared/api";
import {
    helperApiListAddresses,
    helperApiTokenNetworks,
    sortingNetworksForSelector,
} from "@/widgets/wallet/model/helper";
import {apiListAddresses} from "@/widgets/wallet/top-up/api/list-addresses";
import {AxiosResponse} from "axios";


interface IProps {
    children: React.ReactNode
}

const NetworkProvider = ({children, ...props}: IProps) => {

    const isTopUp = props["data-tab"] === "Top Up"

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

    const setNetworkId = async (networkIdSelect) => {

        let firstAddress = null

        if (isTopUp) {
            setLoading(true)
            const response = await apiListAddresses(networkIdSelect)
            helperApiListAddresses(response).success(
                (address) => firstAddress = address
            )
        }


        setState(prev => ({
            ...prev,
            networkIdSelect,
            addressesForQR: firstAddress,
            loading: false
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

            const response: AxiosResponse = await apiTokenNetworks(currency.const, isTopUp);

            helperApiTokenNetworks(response).success(async (networksDefault: Array<IResTokenNetwork>) => {

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

export default NetworkProvider