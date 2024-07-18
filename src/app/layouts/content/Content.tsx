import { FC, PropsWithChildren, useContext } from "react";
import { useMatch } from "react-router-dom";

import { CtxCurrencies } from "@/processes/CurrenciesContext";
import PendingTransactions from "@/widgets/pending-transactions";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import CtxGlobalModalProvider from "@/app/providers/CtxGlobalModalProvider";
import UnconfirmedTransactions from "@/widgets/unconfirmed-transactions";
import { IS_GEKKARD_APP, IS_GEKKWALLET_APP } from "@/shared/lib";
import Wrapper from "@/shared/ui/wrapper";

import styles from "./style.module.scss";

const Content: FC<PropsWithChildren> = ({ children }) => {
  const { md } = useBreakpoints();

  const isHistory = !!useMatch("/history");
  const isWallet = !!useMatch("/wallet");
  const isExchange = !!useMatch("/exchange");
  const isPrivateRoom = !!useMatch("/private-room");
  const { currencies } = useContext(CtxCurrencies);

  const isActive =
    currencies &&
    [...currencies].some(it => {
      const value = it[1].balance?.lock_in_balance;

      return value !== null && value !== 0;
    });

  const isGEKAndGEKW = IS_GEKKARD_APP() || IS_GEKKWALLET_APP();
  const isNoPaddingPages = isWallet || isExchange || isPrivateRoom || isHistory;

  return isGEKAndGEKW ? (
    <div className='w-full flex-1 md:mb-0 mb-10'>
      <CtxGlobalModalProvider>
        {md ? null : (
          <>
            {isActive && <UnconfirmedTransactions />}
            {!IS_GEKKWALLET_APP() && <PendingTransactions />}
          </>
        )}
        <div className={`${styles.Content} ${!(md && isNoPaddingPages) ? styles.ContentPadding : ""}`}>
          {md && !isNoPaddingPages ? <Wrapper>{children}</Wrapper> : children}
        </div>
      </CtxGlobalModalProvider>
    </div>
  ) : (
    <div className='w-full d:mb-3 mb-10 flex-1' style={{ overflow: "hidden" }}>
      {children}
    </div>
  );
};

export default Content;
