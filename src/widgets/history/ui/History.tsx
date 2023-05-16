import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import SecondaryTabGroup from "@/shared/ui/tabs-group/secondary";
import Button from '@/shared/ui/button/Button';
import {DatePicker} from 'antd';
import {IResHistoryTransactions, apiHistoryTransactions} from "@/shared/api";
import {Props, TabKey} from "../model/types";
import {historyTabs, getTabsAsRecord} from "../model/helpers";
import {formatForCustomer, formatForDisplay} from "@/shared/lib/date-helper";
import {startOfMonth} from "date-fns";
import styles from "./style.module.scss"
import {GTable} from '@/shared/ui/grid-table/GTable';
import {GTHead} from '@/shared/ui/grid-table/table-head/GTHead';
import {GTRow} from '@/shared/ui/grid-table/table-row/GTRow';
import {GTCol} from '@/shared/ui/grid-table/table-column/GTCol';
import {GTBody} from '@/shared/ui/grid-table/table-body/GTBody';
import {storeListAllCryptoName} from '@/shared/store/crypto-assets';
import TransactionInfo from "@/widgets/history/ui/TransactionInfo";

const {RangePicker} = DatePicker;

function History({currency}: Partial<Props>) {

    const [activeTab, setActiveTab] = useState<string>(historyTabs[0].Key);
    
    const assets = storeListAllCryptoName(state => state.listAllCryptoName);

    const [historyList, setHistoryList] = useState<IResHistoryTransactions[]>([]);

    const [loading, setLoading] = useState(false);

    const [customDate, setCustomDate] = useState<[dayjs.Dayjs, dayjs.Dayjs]>(
        [dayjs(startOfMonth(new Date())), dayjs()]
    )

    const requestHistory = async () => {

        setLoading(true)

        const {
            StartDate: start = formatForDisplay(customDate[0].toDate()),
            EndDate: end = formatForDisplay(customDate[1].toDate())
        } = historyTabs.find(tab => tab.Key === activeTab);

        const {data} = await apiHistoryTransactions(start.toString(), end.toString(), currency)

        setHistoryList(data.result)

        setLoading(false)

        return null

    }

    useEffect(() => {
        if (activeTab !== TabKey.CUSTOM) {
            (async () => {
                await requestHistory()
            })()
        }
    }, [activeTab])


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
                    {historyList.length > 0 ? historyList.map((item) => {
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
                                            {+item.amount.toFixed(assets.find(a =>
                                                a.code === item.currency)?.round_prec)} {item.currency}
                                        </span>
                                    </div>
                                </GTCol>

                                <GTCol>
                                    <div data-text={item.type_transaction} className="ellipsis ellipsis-md">
                                        <div
                                            className={+item.type_raw === 3 && item.partner_info === "" ? "text-orange" : ""}>
                                            {item.type_transaction}
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
        </div>
    );
}

export default History;
