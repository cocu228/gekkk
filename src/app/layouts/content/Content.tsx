import styles from "./style.module.scss";
import {getCookieData} from "@/shared/lib";
import {FC, PropsWithChildren, useContext} from "react";
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import {useBreakpoints} from "@/app/providers/BreakpointsProvider";
import UnconfirmedTransactions from "@/widgets/unconfirmed-transactions";
import ModalTrxInfoProvider from "@/widgets/wallet/transfer/withdraw/model/ModalTrxInfoProvider";
import ActionConfirmationWindow from "@/widgets/action-confirmation-window/ui/ActionConfirmationWindow";

const Content: FC<PropsWithChildren> = ({children}): JSX.Element | null => {
    const {md} = useBreakpoints();
    const {currencies} = useContext(CtxCurrencies);
    const {notificationsEnabled} = getCookieData<{notificationsEnabled: string}>();

    const isActive = notificationsEnabled === 'true' && !md && currencies
        && [...currencies].some(it => {
        const value = it[1].balance?.lock_in_balance;
        
        return value !== null && value !== 0;
    });

    return (
        <div className="w-full h-full md:mb-3 mb-10" style={{overflow: 'hidden'}}>
            <ModalTrxInfoProvider>
                {isActive && <UnconfirmedTransactions/>}
                <ActionConfirmationWindow/>
                <div className={styles.Content}>
                    {children}
                </div>
            </ModalTrxInfoProvider>
        </div>
    )
}

export default Content;
