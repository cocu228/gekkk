import {CtxWalletNetworks, ICtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import React, {useContext, useEffect, useRef, useState} from "react";
import {apiTokensNetworks} from "@/shared/(orval)api/shared";
import {
    getChosenNetwork,
    helperApiListAddresses,
    helperApiTokenNetworks,
    sortingNetworksForSelector,
} from "@/widgets/wallet/transfer/model/helpers";
import {apiListAddresses} from "@/shared/(orval)api/shared";
import {AxiosResponse} from "axios";
import {randomId} from "@/shared/lib/helpers";
import {TokensNetwork} from "@/shared/(orval)api/shared/model";

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
            const response = await apiListAddresses({
                token_network: networkId
            });
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
        const response: AxiosResponse = await apiTokensNetworks({
            top_up: isTopUp,
            currency: $const,
            wdr_amount: amount
        });
        
        helperApiTokenNetworks(response)
            .success((networksDefault: Array<TokensNetwork>) => setState(prev => ({
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
            
            const response: AxiosResponse = await apiTokensNetworks({
                top_up: isTopUp,
                currency: $const
            });
            
            helperApiTokenNetworks(response).success((tokenNetworks: Array<TokensNetwork>) => {
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
