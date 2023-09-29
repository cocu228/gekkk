import dayjs from 'dayjs';
import {useContext, useEffect, useState} from 'react';
import SecondaryTabGroup from "@/shared/ui/tabs-group/secondary";
import Button from '@/shared/ui/button/Button';
import {DatePicker} from 'antd';
import {IResHistoryTransactions, apiHistoryTransactions} from "@/shared/api";
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
// import {CtxCurrencies} from "@/processes/CurrenciesContext";

const {RangePicker} = DatePicker;

function History({currenciesFilter, types = [0, 1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 16]}: Partial<Props>) {

    const {refreshKey} = useContext(CtxRootData);
    const [activeTab, setActiveTab] = useState<string>(historyTabs[0].Key);
    // const {currencies} = useContext(CtxCurrencies);
    const [listHistory, setListHistory] = useState<IResHistoryTransactions[]>([]);
    const {account} = useContext(CtxRootData);
    const [loading, setLoading] = useState(false);
    const [lazyLoading, setLazyLoading] = useState(false);
    const [allTxVisibly, setAllTxVisibly] = useState(false);

    const [customDate, setCustomDate] = useState<[dayjs.Dayjs, dayjs.Dayjs]>(
        [dayjs(startOfMonth(new Date())), dayjs()]
    )

    const requestHistory = async () => {

        setLoading(true)
        setAllTxVisibly(false)

        const {
            StartDate: start = formatForDisplay(customDate[0].toDate()),
            EndDate: end = formatForDisplay(customDate[1].toDate())
        } = historyTabs.find(tab => tab.Key === activeTab);

        const response = await apiHistoryTransactions(
            start.length ? start.toString() : null,
            end.length ? end.toString() : null,
            currenciesFilter,
            types,
            null,
            10
        )

        actionResSuccess(response).success(() => {
            const {result} = response.data
            setListHistory(result)
        })

        setLoading(false)


    }

    const requestMoreHistory = async () => {

        setLazyLoading(true)

        const lastValue = listHistory[listHistory.length - 1];

        const {data} = await apiHistoryTransactions(null, null, currenciesFilter,
            [0, 1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 16], +lastValue.id_transaction, 10)
        if (data.result.length < 10) setAllTxVisibly(true)

        setListHistory(prevState => ([...prevState, ...data.result]))

        setLazyLoading(false)
    }

    useEffect(() => {
        if (activeTab !== TabKey.CUSTOM) {
            setLoading(true);

            (async () => {
                await requestHistory()
            })()
        }
    }, [activeTab, refreshKey, account])


    useEffect(() => {
        if (currenciesFilter) {
            (async () => {
                await requestHistory()
            })()
        }
    }, [currenciesFilter])

    return (
        <div id={"History"} className="wrapper">
            <SecondaryTabGroup tabs={getSecondaryTabsAsRecord(historyTabs)} activeTab={activeTab} setActiveTab={setActiveTab}/>
            {activeTab === TabKey.CUSTOM && (
                <div className='flex flex-col mt-3 mb-5'>
                    Enter period or choose from calendar

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
                        >Apply</Button>
                    </div>
                </div>
            )}

            <GTable>
                <GTable.Head className={styles.TableHead}>
                    <GTable.Row>
                        {['Date', 'Flow of funds', 'Type'].map(label =>
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
                                            {+item.amount} {item.currency}
                                        </span>
                                        </div>
                                    </GTable.Col>

                                    <GTable.Col>
                                        <div data-text={item.tx_type_text} className="ellipsis ellipsis-md">
                                            <div
                                                className={+item.tx_type === 3 && item.partner_info === "" ? "text-orange" : ""}>
                                                {item.tx_type_text}
                                            </div>
                                        </div>
                                    </GTable.Col>
                                </TransactionInfo>
                            </GTable.Row>
                        );
                    }) : (
                        <div className={styles.Row}>
                            <span>You don't have any transaction for this time.</span>
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
}

export default History;
