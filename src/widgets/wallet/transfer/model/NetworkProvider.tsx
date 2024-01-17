import {CtxWalletNetworks, ICtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import React, {useContext, useEffect, useRef, useState} from "react";
import {apiTokenNetworks, IResTokenNetwork} from "@/shared/api";
import {
    getChosenNetwork,
    helperApiListAddresses,
    helperApiTokenNetworks,
    sortingNetworksForSelector,
} from "@/widgets/wallet/transfer/model/helpers";
import {apiListAddresses} from "@/shared/api";
import {AxiosResponse} from "axios";
import {randomId} from "@/shared/lib/helpers";

interface IProps {
    children: React.ReactNode
}

const NetworkProvider = ({children, ...props}: IProps) => {
    const {$const} = useContext(CtxWalletData);
    const isTopUp = props["data-tag"] === "top_up";
    
    const initState = {
        networksForSelector: null,
        tokenNetworks: null,
        networkTypeSelect: null,
        addressesForQR: null,
        loading: true,
        refreshKey: null
    }
    
    const [state, setState] =
        useState<Omit<ICtxWalletNetworks, "setRefresh" | "setLoading" | "setNetworkType">>(initState);
    
    const setNetworkId = async (networkTypeSelect: ICtxWalletNetworks["networkTypeSelect"]) => {
        let firstAddress = null;
        const networkId = getChosenNetwork(state.tokenNetworks, networkTypeSelect).id;
        
        if (isTopUp && networkId !== 0) {
            setLoading(true)
            const response = await apiListAddresses(networkId)
            helperApiListAddresses(response).success(
                (address) => firstAddress = address
            )
        }
        
        setState(prev => ({
            ...prev,
            networkTypeSelect,
            addressesForQR: firstAddress,
            loading: false
        }));
    }
    
    const setLoading = (loading) => setState(prev => ({
        ...prev,
        loading
    }));
    
    const setRefresh = (quite: boolean = false, amount: number) => {
        if (!quite) {
            setState(prev => ({
                ...prev,
                refreshKey: randomId()
            }))
        } else {
            updateQuiteNetworksDefault(amount)
        }
    }
    
    const updateQuiteNetworksDefault = async (amount: number) => {
        const response: AxiosResponse = await apiTokenNetworks($const, isTopUp, amount);
        
        helperApiTokenNetworks(response)
            .success((networksDefault: Array<IResTokenNetwork>) => setState(prev => ({
                ...prev,
                tokenNetworks: networksDefault
            })));
    }
    
    const clearState = (changedCurrency) => setState(prevState => ({
        ...initState,
        networkTypeSelect: changedCurrency ? null : prevState.networkTypeSelect,
        refreshKey: prevState.refreshKey
    }))
    
    const prevDeps = useRef($const);
    
    useEffect(() => {
        if (state.networksForSelector && state.networksForSelector.length > 0) {
            setNetworkId(state.networksForSelector[0].value);
        }
    }, [state.networksForSelector]);
    
    useEffect(() => {
        (async () => {
            const changedCurrency = $const !== prevDeps.current;
            
            if (changedCurrency) {
                prevDeps.current = $const;
                clearState(changedCurrency);
            }
            
            const response: AxiosResponse = await apiTokenNetworks($const, isTopUp);
            
            helperApiTokenNetworks(response).success((tokenNetworks: Array<IResTokenNetwork>) => {
                const networksForSelector = sortingNetworksForSelector(tokenNetworks);
                
                setState(prev => ({
                    ...prev,
                    tokenNetworks,
                    networksForSelector,
                    loading: false
                }));
            });
        })();
    }, [$const, state.refreshKey]);

    return <CtxWalletNetworks.Provider
        value={({...state, setNetworkType: setNetworkId, setLoading, setRefresh})}>{children}</CtxWalletNetworks.Provider>

}

export default NetworkProvider;
