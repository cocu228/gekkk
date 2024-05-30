import styles from "./style.module.scss";
import {FC, PropsWithChildren, useContext} from "react";
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import PendingTransactions from "@/widgets/pending-transactions";
import {useBreakpoints} from "@/app/providers/BreakpointsProvider";
import GlobalCtxModalProvider from "@/app/providers/GlobalCtxModalProvider";
import UnconfirmedTransactions from "@/widgets/unconfirmed-transactions";
import ActionConfirmationWindow from "@/widgets/action-confirmation-window/ui/ActionConfirmationWindow";
import {useMatch} from "react-router-dom";
import {IS_GEKKARD_APP, IS_GEKKWALLET_APP} from "@/shared/lib";

const Content: FC<PropsWithChildren> = ({children}) => {
    const {md} = useBreakpoints();
    const isExchange = !!useMatch('/exchange');
    const isPrivateRoom = !!useMatch('/private-room');
    const {currencies} = useContext(CtxCurrencies);

    const isActive = currencies && [...currencies].some(it => {
        const value = it[1].balance?.lock_in_balance;

        return value !== null && value !== 0;
    });

    const isGEKAndGEKW = IS_GEKKARD_APP() || IS_GEKKWALLET_APP()

    return isGEKAndGEKW ? (
        <div className="w-full h-full md:mb-3 mb-10" style={{overflow: 'hidden'}}>
            <GlobalCtxModalProvider>
                {md ? null : (
                    <>
                        {isActive && <UnconfirmedTransactions/>}
                        {!IS_GEKKWALLET_APP() && <PendingTransactions/>}
                    </>
                )}
                {md ? null : <ActionConfirmationWindow/>}
                <div className={`${styles.Content} ${!((isExchange || isPrivateRoom) && md)
                    ? styles.ContentPadding : ''}`}>
                    {children}
                </div>
            </GlobalCtxModalProvider>
        </div>
    ) : (
        <div className="w-full h-full md:mb-3 mb-10" style={{overflow: 'hidden'}}>{children}</div>
    )
}

export default Content;
