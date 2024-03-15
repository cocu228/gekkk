import styles from "./style.module.scss";
import {FC, PropsWithChildren, useContext} from "react";
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import UnconfirmedTransactions from "@/widgets/unconfirmed-transactions";
import ModalTrxInfoProvider from "@/widgets/wallet/transfer/withdraw/model/ModalTrxInfoProvider";
import ActionConfirmationWindow from "@/widgets/action-confirmation-window/ui/ActionConfirmationWindow";

const Content: FC<PropsWithChildren> = ({children}): JSX.Element | null => {
    const {currencies} = useContext(CtxCurrencies);

    const isActive = currencies && [...currencies].some(it => {
        const value = it[1].lockInBalance;
        
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
