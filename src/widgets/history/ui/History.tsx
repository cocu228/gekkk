import dayjs from 'dayjs';
import {useContext, useEffect, useState} from 'react';
import SecondaryTabGroup from "@/shared/ui/tabs-group/secondary";
import Button from '@/shared/ui/button/Button';
import {DatePicker} from 'antd';
import {IResHistoryTransactions, apiHistoryTransactions} from "@/shared/api";
import {Props, TabKey} from "../model/types";
import {historyTabs, getTabsAsRecord} from "../model/helpers";
import {formatForDisplay} from "@/shared/lib/date-helper";
import {startOfMonth} from "date-fns";
import styles from "./style.module.scss"
import {GTable} from '@/shared/ui/grid-table/GTable';
import {GTHead} from '@/shared/ui/grid-table/table-head/GTHead';
import {GTRow} from '@/shared/ui/grid-table/table-row/GTRow';
import {GTCol} from '@/shared/ui/grid-table/table-column/GTCol';
import {GTBody} from '@/shared/ui/grid-table/table-body/GTBody';
import TransactionInfo from "@/widgets/history/ui/TransactionInfo";
import {CtxCurrencyData} from '@/app/CurrenciesContext';
import {actionResSuccess} from "@/shared/lib/helpers";
import Loader from "@/shared/ui/loader";

const {RangePicker} = DatePicker;

function History({currency}: Partial<Props>) {

    const {refreshKey} = useContext(CtxCurrencyData);
    const [activeTab, setActiveTab] = useState<string>(historyTabs[0].Key);
    const {currencies} = useContext(CtxCurrencyData);
    const [listHistory, setListHistory] = useState<IResHistoryTransactions[]>([]);
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

        const response = await apiHistoryTransactions(start.toString(), end.toString(), currency, null, null, 10)

        actionResSuccess(response).success(() => {
            const {result} = response.data
            setListHistory(result)
        })

        setLoading(false)


    }

    const requestMoreHistory = async () => {

        setLazyLoading(true)

        const lastValue = listHistory[listHistory.length - 1];

        const {data} = await apiHistoryTransactions(null, null, currency, null, lastValue.id_transaction, 10)
        console.log(data.result.length)
        if (data.result.length < 10) setAllTxVisibly(true)

        setListHistory(prevState => ([...prevState, ...data.result]))

        setLazyLoading(false)
    }

    useEffect(() => {
        if (activeTab !== TabKey.CUSTOM) {
            (async () => {
                await requestHistory()
            })()
        }
    }, [activeTab, refreshKey])


    useEffect(() => {
        (async () => {
            await requestHistory()
        })()
    }, [currency])

    return (
        <div className="wrapper">
            <SecondaryTabGroup tabs={getTabsAsRecord(historyTabs)} activeTab={activeTab} setActiveTab={setActiveTab}/>
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
                            disabled={loading}
                            onClick={() => requestHistory()}
                        >Apply</Button>
                    </div>
                </div>
            )}
            
            <GTable>
                <GTHead className={styles.TableHead}>
                    <GTRow>
                        {['Data', 'Flow of funds', 'Information'].map(label =>
                            <GTCol className="text-start">
                                <div className='ellipsis ellipsis-md' data-text={label}>
                                    <span>{label}</span>
                                </div>
                            </GTCol>
                        )}
                    </GTRow>
                </GTHead>
                <GTBody loading={loading} className={styles.TableBody}>
                    {listHistory.length > 0 ? listHistory.map((item) => {
                        return (
                            <GTRow className={styles.Row}>
                                <GTCol>
                                    <div className="ellipsis ellipsis-md">
                                        <TransactionInfo {...item}/>
                                    </div>
                                </GTCol>

                                <GTCol>
                                    <div>
                                        <span className="text-green">
                                            {+item.amount.toFixed(currencies.get(item.currency)?.roundPrec)} {item.currency}
                                        </span>
                                    </div>
                                </GTCol>

                                <GTCol>
                                    <div data-text={item.tx_type_text} className="ellipsis ellipsis-md">
                                        <div
                                            className={+item.tx_type === 3 && item.partner_info === "" ? "text-orange" : ""}>
                                            {item.tx_type_text}
                                        </div>
                                    </div>
                                </GTCol>
                            </GTRow>
                        );
                    }) : (
                        <div className={styles.Row}>
                            <span>You don't have any transaction for this time.</span>
                        </div>
                    )}
                </GTBody>
            </GTable>
            {listHistory.length >= 10 && !allTxVisibly && <div className="row mt-3">
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
