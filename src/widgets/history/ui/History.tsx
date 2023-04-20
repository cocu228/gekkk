import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import SecondaryTabGroup from "@/shared/ui/tabs-group/secondary";
import Button from '@/shared/ui/button/Button';
import {DatePicker} from 'antd';
import {apiHistoryTransactions} from "@/shared/api";
import {Props, TabKey} from "../model/types";
import {historyTabs, getTabsAsRecord} from "../model/helpers";
import {formatForCustomer, formatForDisplay} from "@/shared/lib/date-helper";
import {startOfMonth} from "date-fns";
import Loader from '@/shared/ui/loader';
import styles from "./style.module.scss"

const {RangePicker} = DatePicker;

function History({currency}: Partial<Props>) {

    const [activeTab, setActiveTab] = useState<string>(historyTabs[0].Key);

    const [historyList, setHistoryList] = useState([]);

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

        setHistoryList(data)

        setLoading(false)

        return null

    }

    useEffect(() => {

        if (activeTab !== TabKey.CUSTOM) {
            (async () => {
                await requestHistory()
            })()
        }

    }, [activeTab, currency])

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
            <div className={`${styles.Table}`}>
                <div className={styles.TableHead}>
                    <div data-text={"Data"} className="col col-span-5 ellipsis">
                        <span>Data</span>
                    </div>
                    <div data-text={"Flow of funds"} className="col col-span-3 ellipsis">
                        <span>Flow of funds</span>
                    </div>
                    <div data-text={"Information"} className="col col-span-4 ellipsis">
                        <span>Information</span>
                    </div>
                </div>
                <div className={styles.TableBody}>
                    {loading ?
                        <Loader/> : historyList.length > 0 ? historyList.map((item, i) =>
                                <TableRow {...item}/>) :
                            <div className={styles.Row}>
                                <span>You don't have any transaction for this time.</span>
                            </div>}
                </div>
            </div>
        </div>
    );
}

const TableRow = ({amount, datetime, type_transaction}) => {
    const dataCustomer = formatForCustomer(datetime)

    return <div className={`row grid grid-cols-12 ${styles.Row} gap-4`}>
        <div data-text={dataCustomer} className="col col-span-5 ellipsis">
            <span>{dataCustomer}</span>
        </div>
        <div data-text={amount} className="col col-span-3 ellipsis">
            <span className="text-green">{amount}</span>
        </div>
        <div data-text={type_transaction} className="col col-span-4 ellipsis">
            <span>{type_transaction}</span>
        </div>
    </div>
}

export default History;
