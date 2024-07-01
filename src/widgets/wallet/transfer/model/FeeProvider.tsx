import React, { FC, useContext, useMemo} from "react";
import { CtxFeeNetworks, CtxWalletNetworks, ICtxFeeNetworks } from "@/widgets/wallet/transfer/model/context";

interface IFeeProviderProps {
  children: React.ReactNode
}

// Todo: Refactoring
const FeeProvider: FC<IFeeProviderProps> = ({ children }) => {
  const { tokenNetworks, networkTypeSelect } = useContext(CtxWalletNetworks);

  const initState = useMemo<ICtxFeeNetworks>(() => ({
      tokenNetworks,
      networkTypeSelect,
    }), [networkTypeSelect]);

  return (
    <CtxFeeNetworks.Provider value={initState}>
      {children}
    </CtxFeeNetworks.Provider>
  )

}

export default FeeProvider;
