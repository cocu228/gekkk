import dayjs from 'dayjs';
import {memo, useContext, useEffect, useState} from 'react';
import SecondaryTabGroup from "@/shared/ui/tabs-group/secondary";
import Button from '@/shared/ui/button/Button';
import {DatePicker} from 'antd';
import {Props, TabKey} from "../model/types";
import {historyTabs} from "../model/helpers";
import {formatForCustomer, formatForDisplay} from "@/shared/lib/date-helper";
import {startOfMonth} from "date-fns";
import styles from "./style.module.scss"
import GTable from '@/shared/ui/grid-table/';
import TransactionInfo from "@/widgets/history/ui/TransactionInfo";
import {CtxRootData} from '@/processes/RootContext';
import {actionResSuccess, getSecondaryTabsAsRecord} from "@/shared/lib/helpers";
import Loader from "@/shared/ui/loader";
import axios from "axios";
import { useTranslation } from 'react-i18next';
import {GetHistoryTrasactionOut} from "@/shared/api/(gen)new/model";
import {apiGetHistoryTransactions} from "@/shared/api/(gen)new";

const {RangePicker} = DatePicker;

const History = memo(function ({currenciesFilter, types, includeFiat}: Partial<Props>) {
    const {t} = useTranslation();

    const {refreshKey} = useContext(CtxRootData);
    const [activeTab, setActiveTab] = useState<string>(historyTabs[0].Key);
    // const {currencies} = useContext(CtxCurrencies);
    const [listHistory, setListHistory] = useState<GetHistoryTrasactionOut[]>([]);
    const [loading, setLoading] = useState(false);
    const [lazyLoading, setLazyLoading] = useState(false);
    const [allTxVisibly, setAllTxVisibly] = useState(false);

    const [customDate, setCustomDate] = useState<[dayjs.Dayjs, dayjs.Dayjs]>(
        [dayjs(startOfMonth(new Date())), dayjs()]
    )

    const requestHistory = async (cancelToken = null) => {
        setLoading(true);
        setAllTxVisibly(false);

        const {
            StartDate: start = formatForDisplay(customDate[0].toDate()),
            EndDate: end = formatForDisplay(customDate[1].toDate())
        } = historyTabs.find(tab => tab.Key === activeTab);

        const response = await apiGetHistoryTransactions({
            limit: 10,
            tx_types: types,
            currencies: currenciesFilter,
            end: end.length ? end.toString() : null,
            start: start.length ? start.toString() : null,
            include_fiat: includeFiat,
        }, {
            cancelToken: cancelToken?.token
        });
        
        actionResSuccess(response).success(() => {
            const {result} = response.data;
            setListHistory(result);
        })

        setLoading(false);
    }

    const requestMoreHistory = async () => {

        setLazyLoading(true)

        const lastValue = listHistory[listHistory.length - 1];

        const {data} = await apiGetHistoryTransactions({
            currencies: currenciesFilter,
            tx_types: types,
            next_key: lastValue.next_key,
            limit: 10,
            include_fiat: includeFiat,
        });
        
        if (data.result.length < 10) setAllTxVisibly(true)

        setListHistory(prevState => ([...prevState, ...data.result]))

        setLazyLoading(false)
    }

    useEffect(() => {

        const cancelTokenSource = axios.CancelToken.source();

        (async () => {
            if (activeTab !== TabKey.CUSTOM) {
                await requestHistory(cancelTokenSource)
            }
        })()

        return () => cancelTokenSource.cancel()

    }, [refreshKey, activeTab, currenciesFilter]);

    return (
        <div id={"History"} className="wrapper">
            <SecondaryTabGroup tabs={getSecondaryTabsAsRecord(historyTabs)} activeTab={activeTab} setActiveTab={setActiveTab}/>
            {activeTab === TabKey.CUSTOM && (
                <div className='flex flex-col mt-3 mb-5'>
                    {t("enter_period")}

                    <div className='flex grow-0 max-w-[400px]'>
                        <RangePicker
                            className='mt-2 w-full'
                            value={customDate}
                            onChange={setCustomDate}
                        />

                        <Button
                            className='ml-5'
                            disabled={loading || !customDate}
                            onClick={() => requestHistory()}
                        >{t("apply")}</Button>
                    </div>
                </div>
            )}

            <GTable>
                <GTable.Head className={styles.TableHead}>
                    <GTable.Row>
                        {['Date', 'Flow of funds', 'Description'].map(label =>
                            <GTable.Col className="text-start">
                                <div className='ellipsis ellipsis-md' data-text={label}>
                                    <span>{label}</span>
                                </div>
                            </GTable.Col>
                        )}
                    </GTable.Row>
                </GTable.Head>
                <GTable.Body loading={loading} className={styles.TableBody}>
                    {listHistory.length > 0 ? listHistory.map((item) => {
                        return (
                            <GTable.Row cols={3} className={styles.Row + ' hover:font-medium'}>
                                <TransactionInfo infoList={item}>
                                    <GTable.Col>
                                        <div className="ellipsis ellipsis-md">
                                            <span className="">{formatForCustomer(item.datetime)}</span>
                                        </div>
                                    </GTable.Col>

                                    <GTable.Col>
                                        <div>
                                        <span className={`${[15, 16].includes(item.tx_type)
                                                ? 'text-orange'
                                                : item.is_income
                                                ? 'text-green'
                                                : 'text-red-800'}
                                            `}
                                        >
                                            {[15, 16].includes(item.tx_type)
                                                ? '' : !item.is_income && '-'}
                                            {+item.result_amount} {item.currency}
                                        </span>
                                        </div>
                                    </GTable.Col>

                                    <GTable.Col>
                                        <div data-text={item.tx_type_text} className="ellipsis ellipsis-md">
                                            <div
                                                className={+item.tx_type === 3 && item.partner_info === "" ? "text-orange" : ""}>
                                                {item.tx_type_text}. {item.status_text}. {item.tag} 
                                            </div>
                                        </div>
                                    </GTable.Col>
                                </TransactionInfo>
                            </GTable.Row>
                        );
                    }) : (
                        <div className={styles.Row}>
                            <span>{t("no_have_any_transaction")}</span>
                        </div>
                    )}
                </GTable.Body>
            </GTable>
            {!loading && listHistory.length >= 10 && !allTxVisibly && <div className="row mt-3">
                <div className="col flex justify-center relative">
                    {lazyLoading ? <Loader className={"w-[24px] h-[24px] top-[4px]"}/> :
                        <span onClick={requestMoreHistory}
                              className="text-gray-400 cursor-pointer inline-flex items-center">See more <img
                            className="ml-2" width={10} height={8}
                            src="/img/icon/ArrowPlainDown.svg"
                            alt="ArrowPlainDown"/></span>}
                </div>
            </div>}
        </div>
    );
})

export default History;
