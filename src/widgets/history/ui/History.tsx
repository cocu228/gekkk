import dayjs from "dayjs";
import { memo, useContext, useEffect, useState } from "react";
import Button from "@/shared/ui/button/Button";
import { DatePicker } from "antd";
import { Props, TabKey } from "../model/types";
import { historyTabs } from "../model/helpers";
import {
  formatForApi,
  formatForHistoryMobile,
} from "@/shared/lib/date-helper";
import { startOfMonth } from "date-fns";
import styles from "./style.module.scss";
import TransactionInfo from "@/widgets/history/ui/TransactionInfo";
import { CtxRootData } from "@/processes/RootContext";
import {
  actionResSuccess,
} from "@/shared/lib/helpers";
import Loader from "@/shared/ui/loader";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  GetHistoryTrasactionOut,
  TransactTypeEnum,
} from "@/shared/(orval)api/gek/model";
import { apiGetHistoryTransactions } from "@/shared/(orval)api/gek";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import { useMatch, useSearchParams } from "react-router-dom";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import InfoContent from "./InfoContent";
import useModal from "@/shared/model/hooks/useModal";
import Modal from "@/shared/ui/modal/Modal";

const { RangePicker } = DatePicker;

const History = memo(function ({
  currenciesFilter,
  types,
  includeFiat,
  date,
  currTab,
}: Partial<Props>) {
  const { t } = useTranslation();

  const [selectedItem, setSelectedItem] = useState<GetHistoryTrasactionOut>({})

  const { isModalOpen, showModal, handleCancel } = useModal();
  const { refreshKey } = useContext(CtxRootData);
  const [activeTab, setActiveTab] = useState<string>(currTab ? currTab.Key : historyTabs[0].Key);
  const [listHistory, setListHistory] = useState<GetHistoryTrasactionOut[]>([]);
  const [lastValue, setLastValue] = useState<GetHistoryTrasactionOut>(
    listHistory[listHistory.length - 1]
  );
  const [loading, setLoading] = useState(false);
  const [lazyLoading, setLazyLoading] = useState(false);
  const [allTxVisibly, setAllTxVisibly] = useState(false);
  const [customDate, setCustomDate] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs(startOfMonth(new Date())),
    dayjs(),
  ]);
  const { md } = useContext(BreakpointsContext);
  const [params] = useSearchParams();
  const tab = params.get('tab');
  const currency = params.get('currency');
  const walletPage = currency || tab;
  const isHistoryPage = !!useMatch("history");

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.9,
  });



  useEffect(() => {
    if (md && isIntersecting && !allTxVisibly && !(listHistory?.length < 10) && (lastValue?.next_key !== "::0")) {

      (async () => {
        setLazyLoading(true);

        console.log(lastValue?.next_key);

        const { data } = await apiGetHistoryTransactions({
          currencies: currenciesFilter,
          tx_types: types,
          next_key: lastValue.next_key,
          limit: 10,
          include_fiat: includeFiat,
          end: date ? formatForApi(date[1].toDate()).toString() : null,
          start: date ? formatForApi(date[0].toDate()).toString() : null,
        });

        if (data.result.length < 10) setAllTxVisibly(true);

        setListHistory((prevState) => [...prevState, ...data.result]);
        setLazyLoading(false);
      })();
    }
  }, [isIntersecting]);

  const requestHistory = async (cancelToken = null) => {
    setLoading(true);
    setAllTxVisibly(false);

    if (date)
      console.log(
        formatForApi(date[0].toDate()),
        formatForApi(date[1].toDate())
      );

    const response = await apiGetHistoryTransactions(
      {
        limit: 10,
        tx_types: types,
        currencies: currenciesFilter,
        end: date ? formatForApi(date[1].toDate()).toString() : null,
        start: date ? formatForApi(date[0].toDate()).toString() : null,
        include_fiat: includeFiat,
      },
      { cancelToken }
    );

    actionResSuccess(response).success(() => {
      const { result } = response.data;
      setListHistory(result);
    });

    setLoading(false);
  };

  const requestMoreHistory = async ({
    currencies,
    txTypes,
    hist,
    isFiat,
  }: {
    currencies: string[];
    txTypes: TransactTypeEnum[];
    hist: GetHistoryTrasactionOut[];
    isFiat?: boolean;
  }) => {
    setLazyLoading(true);

    const { data } = await apiGetHistoryTransactions({
      currencies: currencies,
      tx_types: txTypes,
      next_key: lastValue.next_key,
      limit: 10,
      include_fiat: includeFiat,
    });

    if (data.result.length < 10) setAllTxVisibly(true);

    setListHistory((prevState) => [...prevState, ...data.result]);
    setLazyLoading(false);
  };
  useEffect(() => {
    setLastValue(listHistory[listHistory.length - 1]);
  }, [listHistory]);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    (async () => {
      try {
        if (activeTab !== TabKey.CUSTOM) {
          await requestHistory(cancelTokenSource.token);
        } else {
          await requestHistory()
        }
      } catch (err: unknown) {
        console.log(err);
      }
    })();

    return () => cancelTokenSource.cancel();
  }, [refreshKey, activeTab, currenciesFilter]);

  if (!loading && !isHistoryPage && !listHistory.length) {
    return (
      <div
        id="MainContainerHistoryMobile"
        className={styles.MainContainerMobile + " h-[100px] relative"}
      >
        <span>{t("no_transactions_warning")}</span>
      </div>
    );
  }
  if (loading) {
    return (
      <div
        id="MainContainerHistoryMobile"
        className={"h-[100px] relative"}
      >
        <Loader />
      </div>
    );
  }
  if (!md) {
    return (
      <>
        <div id={"History"} className="wrapper max-w-[600px] m-auto">
          {activeTab === TabKey.CUSTOM && (
            <div className="flex flex-col mb-3">
              {t("enter_period")}
              <div className="flex grow-0 p-2">
                <RangePicker
                  className="w-full"
                  value={customDate}
                  onChange={setCustomDate}
                />
                <Button
                  className="ml-3"
                  disabled={loading || !customDate}
                  onClick={() => requestHistory()}
                >
                  {t("apply")}
                </Button>
              </div>
            </div>
          )}
          {listHistory.length > 0 ? (
            listHistory.map((item, index) => {
              const doesPrevDateTimeExist =
                listHistory[index - 1]?.datetime !== undefined;
              return (
                <>
                  {!doesPrevDateTimeExist ? (
                    <div className={styles.DataMobile} key={index}>
                      {formatForHistoryMobile(item.datetime)}
                    </div>
                  ) : (
                    formatForHistoryMobile(listHistory[index].datetime) !==
                    formatForHistoryMobile(
                      listHistory[index - 1].datetime
                    ) && (
                      <div className={styles.DataMobile}>
                        {formatForHistoryMobile(item.datetime)}
                      </div>
                    )
                  )}
                  <TransactionInfo setItem={setSelectedItem} showModal={showModal} item={item}/>
                </>
              );
            })
          ) : (
            <div className={styles.Row}>
              <span>{t("no_have_any_transaction")}</span>
            </div>
          )}
          {!loading && listHistory.length >= 10 && !allTxVisibly && (
            <div className="row mt-3">
              <div className="col flex justify-center relative">
                {lazyLoading ? (
                  <Loader className={" w-[24px] h-[24px] top-[4px]"} />
                ) : (
                  <span
                    onClick={() => {
                      requestMoreHistory({
                        currencies: currenciesFilter,
                        txTypes: types,
                        hist: listHistory,
                      });
                    }}
                    className="text-gray-400 cursor-pointer inline-flex items-center"
                  >
                    {t("see_more")}
                    <img
                      className="ml-2"
                      width={10}
                      height={8}
                      src="/img/icon/ArrowPlainDown.svg"
                      alt="ArrowPlainDown"
                    />
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        <Modal width={450} title={t("transaction_info")} onCancel={handleCancel}
            open={isModalOpen}>
            <InfoContent handleCancel={handleCancel} {...selectedItem} />
        </Modal>
      </>
    );
  }

  return (
    <>
      <div id={"History"} className="wrapper">
        <div
          id="MainContainerHistoryMobile"
          className={styles.MainContainerMobile}
        >
          {listHistory.map((item, index) => {
            const doesPrevDateTimeExist =
              listHistory[index - 1]?.datetime !== undefined;
            return (
              <div ref={ref}>
                {!doesPrevDateTimeExist ? (
                  <div className={styles.DataMobile} key={index}>
                    {formatForHistoryMobile(item.datetime)}
                  </div>
                ) : (
                  formatForHistoryMobile(listHistory[index].datetime) !==
                  formatForHistoryMobile(listHistory[index - 1].datetime) && (
                    <div className={styles.DataMobile}>
                      {formatForHistoryMobile(item.datetime)}
                    </div>
                  )
                )}                
                  <TransactionInfo setItem={setSelectedItem} showModal={showModal} item={item}/>
              </div>
            );
          })}
          {!loading && listHistory.length >= 10 && !allTxVisibly && (
            <div className="row mt-3">
              <div className="col flex justify-center relative">
                {lazyLoading ? (
                  <Loader className={" w-[24px] h-[24px] top-[4px]"} />
                ) : md ? (
                  <Loader className={" w-[24px] h-[24px] top-[4px]"} />
                ) : (
                  <span
                    onClick={() => {
                      requestMoreHistory({
                        currencies: currenciesFilter,
                        txTypes: types,
                        hist: listHistory,
                      });
                    }}
                    className="text-gray-400 cursor-pointer inline-flex items-center"
                  >
                    {t("see_more")}
                    <img
                      className="ml-2"
                      width={10}
                      height={8}
                      src="/img/icon/ArrowPlainDown.svg"
                      alt="ArrowPlainDown"
                    />
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal width={450} title={t("transaction_info")} onCancel={handleCancel}
          open={isModalOpen}>
          <InfoContent handleCancel={handleCancel} {...selectedItem} />
      </Modal>
    </>
  );
});

export default History;
