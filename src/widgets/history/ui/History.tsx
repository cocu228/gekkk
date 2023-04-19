import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import SecondaryTabGroup from "@/shared/ui/tabs-group/secondary";
import Table from "@/shared/ui/table/Table";
import Button from '@/shared/ui/button/Button';
import {DatePicker} from 'antd';
import {apiHistoryTransactions} from "@/shared/api";
import {Props, TabKey} from "../model/types";
import {historyTabs, getTabsAsRecord} from "../model/helpers";
import {formatForDisplay, formatForCustomer} from "@/shared/lib/date-helper";
import {startOfMonth} from "date-fns";
import Loader from '@/shared/ui/loader';

const {RangePicker} = DatePicker;

function History({title, currency, className}: Partial<Props>) {

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
            {title && (
                <SectionTitle>{title}</SectionTitle>
            )}
            <div className={`${className} bg-white rounded-[10px] p-[15px] shadow-[0_4px_12px_0px_rgba(0,0,0,0.12)]`}>
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

                {loading && (
                    <Loader className='relative mt-10'/>
                )}

                {!loading && (
                    <Table
                        data={{
                            labels: [
                                {text: 'Data'},
                                {text: 'Flow of funds'},
                                {text: 'Information'}
                            ],
                            rows: historyList.map((item) =>
                                [
                                    {text: formatForCustomer(item.datetime)},
                                    {
                                        text: <span className="text-green">
                                        {item.amount + " " + item.currency}
                                    </span>
                                    },
                                    {text: ""}
                                ])
                        }}
                        noDataText="You don't have any transactions for this time."
                    />
                )}
            </div>
        </div>
    );
}

export default History;
