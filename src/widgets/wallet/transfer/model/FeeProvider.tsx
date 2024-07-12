import { FC, PropsWithChildren, useContext, useMemo } from "react";

import { CtxFeeNetworks, CtxWalletNetworks, ICtxFeeNetworks } from "@/widgets/wallet/transfer/model/context";

// Todo: Refactoring
const FeeProvider: FC<PropsWithChildren> = ({ children }) => {
  const { tokenNetworks, networkTypeSelect } = useContext(CtxWalletNetworks);

  const initState = useMemo<ICtxFeeNetworks>(
    () => ({
      tokenNetworks,
      networkTypeSelect
    }),
    [networkTypeSelect]
  );

  return <CtxFeeNetworks.Provider value={initState}>{children}</CtxFeeNetworks.Provider>;
};

export default FeeProvider;
