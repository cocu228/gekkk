import {
    CtxWalletNetworks,
    ICtxWalletNetworks,
    CtxWalletData,
    WalletNetworksStateType
} from "@/widgets/wallet/transfer/model/context";
import React, {useContext, useEffect, useRef, useState} from "react";
import { apiGetPaymentCommission, apiTokensNetworks } from "@/shared/(orval)api/gek";
import {
    getChosenNetwork,
    helperApiListAddresses,
    helperApiTokenNetworks,
    sortingNetworksForSelector,
} from "@/widgets/wallet/transfer/model/helpers";
import {apiListAddresses} from "@/shared/(orval)api/gek";
import {AxiosResponse} from "axios";
import {randomId} from "@/shared/lib/helpers";
import { PaymentDetails, PaymentFeeApiResponse, TokensNetwork } from "@/shared/(orval)api/gek/model";
import useError from "@/shared/model/hooks/useError";

interface IProps {
    children: React.ReactNode
}

const NetworkProvider = ({children, ...props}: IProps) => {
    const {$const} = useContext(CtxWalletData);
    const isTopUp = props["data-tag"] === "top_up";

    const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();
    
    const initState: WalletNetworksStateType = {
        networksForSelector: null,
        tokenNetworks: null,
        networkTypeSelect: null,
        addressesForQR: null,
        loading: true,
        refreshKey: null
    }
    
    const [state, setState] = useState<WalletNetworksStateType>(initState);
    
    const setNetworkId = async (networkTypeSelect: ICtxWalletNetworks["networkTypeSelect"]) => {
        localErrorClear();
        let firstAddress = null;
        const networkId = getChosenNetwork(state.tokenNetworks, networkTypeSelect)?.id || 0;
        
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

    const setBankRefresh = async (paymentDetails: PaymentDetails) => {
        const response: AxiosResponse<PaymentFeeApiResponse> = await apiGetPaymentCommission(paymentDetails);
        if (response.data.error) {
            localErrorHunter(response.data.error)
        } else {
            helperApiTokenNetworks(response)
              .success((networksDefault: Array<TokensNetwork>) => setState(prev => ({
                  ...prev,
                  tokenNetworks: networksDefault
              })));
        }
    }
    
    const updateQuiteNetworksDefault = async (amount: number) => {
        const response: AxiosResponse = await apiTokensNetworks({
            top_up: isTopUp,
            currency: $const,
            wdr_amount: amount
        });
        if (response.data.error) {
            localErrorHunter(response.data.error)
        } else {
            helperApiTokenNetworks(response)
              .success((networksDefault: Array<TokensNetwork>) => setState(prev => ({
                  ...prev,
                  tokenNetworks: networksDefault
              })));
        }
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
    }, []);

    return (
      <CtxWalletNetworks.Provider
          value={({
              ...state,
              setNetworkType: setNetworkId,
              setLoading,
              setRefresh,
              setBankRefresh,
              localErrorInfoBox,
              localErrorClear
          })}
        >
          {children}
      </CtxWalletNetworks.Provider>
    )

}

export default NetworkProvider;
