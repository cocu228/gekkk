import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";

import History from "@/widgets/history/ui/History";
import { CtxWalletData } from "@/widgets/wallet/transfer/model/context";

import styles from "./styles.module.css";
import { CtxDisplayHistory } from "./model/CtxDisplayHistory";

interface IParams {
  children?: JSX.Element;
}

const HistoryWrapper = ({ children }: IParams) => {
  const { t } = useTranslation();
  const { $const } = useContext(CtxWalletData);
  const [visible, setVisible] = useState<boolean>(false);

  const displayHistory = (value: boolean = true) => {
    setVisible(value);
  };

  return (
    <CtxDisplayHistory.Provider value={{ displayHistory }}>
      {children}

      {visible && (
        <>
          <span className={styles.Header}>{t("last_transactions")}</span>
          <History key={"LastTxsHistory"} currenciesFilter={[$const]} includeFiat={$const === "EUR"} />
        </>
      )}
    </CtxDisplayHistory.Provider>
  );
};

export default HistoryWrapper;
