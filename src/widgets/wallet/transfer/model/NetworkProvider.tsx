import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { AxiosResponse } from "axios";

import {
  CtxWalletNetworks,
  ICtxWalletNetworks,
  CtxWalletData,
  WalletNetworksStateType
} from "@/widgets/wallet/transfer/model/context";
import { apiGetPaymentCommission, apiTokensNetworks, apiListAddresses } from "@/shared/(orval)api/gek";
import {
  getChosenNetwork,
  helperApiListAddresses,
  helperApiTokenNetworks,
  sortingNetworksForSelector
} from "@/widgets/wallet/transfer/model/helpers";
import { randomId } from "@/shared/lib/helpers";
import { PaymentDetails, PaymentFeeApiResponse, TokensNetwork } from "@/shared/(orval)api/gek/model";
import useError from "@/shared/model/hooks/useError";
import { CtxRootData } from "@/processes/RootContext";

interface IProps {
  children: ReactNode;
}

const NetworkProvider = ({ children, ...props }: IProps) => {
  const { account } = useContext(CtxRootData);
  const { $const } = useContext(CtxWalletData);
  const isTopUp = props["data-tag"] === "top_up";
  const [localErrorHunter, , localErrorInfoBox, localErrorClear] = useError();

  const initState: WalletNetworksStateType = {
    networksForSelector: null,
    tokenNetworks: null,
    networkTypeSelect: null,
    addressesForQR: null,
    loading: true,
    refreshKey: null
  };

  const [state, setState] = useState<WalletNetworksStateType>(initState);

  const setLoading = (loading: boolean) =>
    setState(prev => ({
      ...prev,
      loading
    }));

  const setNetworkId = async (networkTypeSelect: ICtxWalletNetworks["networkTypeSelect"]) => {
    localErrorClear();
    let firstAddress = null;
    const networkId = getChosenNetwork(state.tokenNetworks, networkTypeSelect)?.id || 0;

    if (isTopUp && networkId !== 0) {
      setLoading(true);
      const response = await apiListAddresses({
        token_network: networkId
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      helperApiListAddresses(response).success(address => (firstAddress = address));
    }

    setState(prev => ({
      ...prev,
      networkTypeSelect,
      addressesForQR: firstAddress,
      loading: false
    }));
  };

  const updateQuiteNetworksDefault = async (amount: number) => {
    const response: AxiosResponse = await apiTokensNetworks({
      top_up: isTopUp,
      currency: $const,
      wdr_amount: amount
    });
    if (response.data.error) {
      localErrorHunter(response.data.error);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      helperApiTokenNetworks(response).success((networksDefault: Array<TokensNetwork>) =>
        setState(prev => ({
          ...prev,
          tokenNetworks: networksDefault
        }))
      );
    }
  };

  const setRefresh = (quite: boolean, amount: number) => {
    if (!quite) {
      setState(prev => ({
        ...prev,
        refreshKey: randomId()
      }));
    } else {
      void updateQuiteNetworksDefault(amount);
    }
  };

  const setBankRefresh = async (paymentDetails: PaymentDetails) => {
    const response: AxiosResponse<PaymentFeeApiResponse> = await apiGetPaymentCommission(paymentDetails);
    if (response.data.error) {
      localErrorHunter(response.data.error);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      helperApiTokenNetworks(response).success((networksDefault: Array<TokensNetwork>) =>
        setState(prev => ({
          ...prev,
          tokenNetworks: networksDefault
        }))
      );
    }
  };

  const clearState = changedCurrency =>
    setState(prevState => ({
      ...initState,
      networkTypeSelect: changedCurrency ? null : prevState.networkTypeSelect,
      refreshKey: prevState.refreshKey
    }));

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

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
  }, [$const, state.refreshKey, account]);

  return (
    <CtxWalletNetworks.Provider
      value={{
        ...state,
        setNetworkType: setNetworkId,
        setLoading,
        setRefresh,
        setBankRefresh,
        localErrorInfoBox,
        localErrorClear
      }}
    >
      {children}
    </CtxWalletNetworks.Provider>
  );
};

export default NetworkProvider;
