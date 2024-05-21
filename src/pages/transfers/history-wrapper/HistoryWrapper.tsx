import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
import History from "@/widgets/history/ui/History";
import { useContext, useEffect, useState } from "react";
import { CtxWalletData } from "@/widgets/wallet/transfer/model/context";
import { CtxDisplayHistory } from "./model/CtxDisplayHistory";

interface IParams {
    children?: JSX.Element;
}

const HistoryWrapper = ({children}: IParams) => {
    const {t} = useTranslation();
    const {$const} = useContext(CtxWalletData);
    const [visible, setVisible] = useState<boolean>(false);

    const displayHistory = () => {
        setVisible(true);
    }

    return (
        <CtxDisplayHistory.Provider value={{displayHistory}}>
            {children}

            {visible && <>
                <span className={styles.Header}>{t('last_transactions')}</span>
                <History
                    key={"LastTxsHistory"}
                    currenciesFilter={[$const]}
                    includeFiat={$const === 'EUR'}
                />
            </>}
        </CtxDisplayHistory.Provider>
    );
}

export default HistoryWrapper;
