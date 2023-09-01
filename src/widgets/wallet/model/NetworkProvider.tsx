import {CtxWalletNetworks, ICtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/model/context";
import React, {useContext, useEffect, useRef, useState} from "react";
import {apiTokenNetworks, IResTokenNetwork} from "@/shared/api";
import {
    helperApiListAddresses,
    helperApiTokenNetworks,
    sortingNetworksForSelector,
} from "@/widgets/wallet/model/helpers";
import {apiListAddresses} from "@/shared/api";
import {AxiosResponse} from "axios";


interface IProps {
    children: React.ReactNode
}

const NetworkProvider = ({children, ...props}: IProps) => {

    const isTopUp = props["data-tab"] === "Top Up"

    const {$const} = useContext(CtxWalletData);

    if (!$const)
        return null;

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


    const clearState = (changedCurrency) => setState(prevState => ({
        ...initState,
        networkIdSelect: changedCurrency ? null : prevState.networkIdSelect,
        refreshKey: prevState.refreshKey
    }))

    const prevDeps = useRef($const);

    useEffect(() => {
        if (state.networksForSelector && state.networksForSelector.length > 0) {
            setNetworkId(state.networksForSelector[0].value)
        }
    }, [state.networksForSelector])

    useEffect(() => {

        (async () => {
            const changedCurrency = $const !== prevDeps.current

            if (changedCurrency) {
                console.log('Changed dependencies:', changedCurrency);
            }
            prevDeps.current = $const;

            clearState(changedCurrency)

            const response: AxiosResponse = await apiTokenNetworks($const, isTopUp);

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

    }, [$const, state.refreshKey])

    return <CtxWalletNetworks.Provider
        value={({...state, setNetworkId, setLoading, setRefresh})}>{children}</CtxWalletNetworks.Provider>

}

export default NetworkProvider;
