import axios from "axios";
import { useTranslation } from "react-i18next";
import { memo, useContext, useEffect, useState } from "react";

import Loader from "@/shared/ui/loader";
import useModal from "@/shared/model/hooks/useModal";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { CtxRootData } from "@/processes/RootContext";
import { formatForApi } from "@/shared/lib/date-helper";
import { actionResSuccess } from "@/shared/lib/helpers";
import { apiGetHistoryTransactions } from "@/shared/(orval)api/gek";
import { GetHistoryTrasactionOut } from "@/shared/(orval)api/gek/model";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import { IS_GEKKARD_APP } from "@/shared/lib";
import { Modal } from "@/shared/ui/modal/Modal";

import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import TxInfoModal from "./tx-info-modal/InfoContent";
import TxInfoRow from "./tx-info-row/TxInfoRow";
import { HistoryProps } from "../model/types";
import { formatDate } from "../model/helpers";
import styles from "./style.module.scss";

const History = memo(function ({
  to,
  from,
  types,
  className,
  includeFiat,
  tab = "last_txs",
  currenciesFilter
}: Partial<HistoryProps>) {
  const { t } = useTranslation();
  const { md } = useContext(BreakpointsContext);
  const { refreshKey } = useContext(CtxRootData);
  const [loading, setLoading] = useState(false);
  const { isModalOpen, showModal, handleCancel } = useModal();
  const [lazyLoading, setLazyLoading] = useState<boolean>(false);
  const [allTxVisibly, setAllTxVisibly] = useState<boolean>(false);
  const [listHistory, setListHistory] = useState<GetHistoryTrasactionOut[]>([]);
  const [selectedItem, setSelectedItem] = useState<GetHistoryTrasactionOut>({});
  const [nextKey, setNextKey] = useState<string>(listHistory[listHistory.length - 1]?.next_key);

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.9
  });

  const gekkardMode = IS_GEKKARD_APP();

  const requestHistory = async (cancelToken = null) => {
    setLoading(true);
    setAllTxVisibly(false);

    const response = await apiGetHistoryTransactions(
      {
        limit: 10,
        tx_types: types,
        currencies: currenciesFilter,
        end: to ? formatForApi(to).toString() : null,
        start: from ? formatForApi(from).toString() : null,
        include_fiat: gekkardMode ? includeFiat : false
      },
      { cancelToken }
    );

    actionResSuccess(response).success(() => {
      const { result } = response.data;
      setListHistory(result);
    });

    setLoading(false);
  };

  const requestMoreHistory = async () => {
    setLazyLoading(true);

    const { data } = await apiGetHistoryTransactions({
      limit: 10,
      tx_types: types,
      next_key: nextKey,
      currencies: currenciesFilter,
      include_fiat: gekkardMode ? includeFiat : false
    });

    if (data.result.length < 10) {
      setAllTxVisibly(true);
    }

    setListHistory(prevState => [...prevState, ...data.result]);
    setLazyLoading(false);
  };

  const onUpdateTxInfo = (txId: string, senderName: string) => {
    const tx = listHistory.find(t => t.id_transaction === txId);
    tx.partner_info = senderName;
  };

  useEffect(() => {
    if (md && isIntersecting && !allTxVisibly && !(listHistory?.length < 10) && nextKey !== "::0") {
      (async () => {
        setLazyLoading(true);

        const { data } = await apiGetHistoryTransactions({
          limit: 10,
          tx_types: types,
          next_key: nextKey,
          currencies: currenciesFilter,
          end: to ? formatForApi(to).toString() : null,
          include_fiat: gekkardMode ? includeFiat : false,
          start: from ? formatForApi(from).toString() : null
        });

        if (data.result.length < 10) {
          setAllTxVisibly(true);
        }

        setListHistory(prevState => [...prevState, ...data.result]);
        setLazyLoading(false);
      })();
    }
  }, [isIntersecting]);

  useEffect(() => {
    setNextKey(listHistory[listHistory.length - 1]?.next_key);
  }, [listHistory]);

  useEffect(() => {
    // eslint-disable-next-line import/no-named-as-default-member
    const cancelTokenSource = axios.CancelToken.source();

    (async () => {
      await requestHistory(cancelTokenSource.token);
    })();

    return () => cancelTokenSource.cancel();
  }, [refreshKey, tab, currenciesFilter]);

  return loading ? (
    <Loader className='h-[100px] relative' />
  ) : (
    <>
      <div id={"History"} className={`${styles.Container} ${className}`}>
      <div className={styles.NoTransactions}>{t("no_have_any_transaction")}</div>
        
      </div>

      {/* Tx info modal */}
      <Modal isModalOpen={isModalOpen} onCancel={handleCancel} title={t("transaction_info")}>
        <TxInfoModal {...selectedItem} handleCancel={handleCancel} onUpdateTxInfo={onUpdateTxInfo} />
      </Modal>
    </>
  );
});

export default History;
