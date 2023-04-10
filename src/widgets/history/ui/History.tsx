import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import SecondaryTabGroup from "@/shared/ui/tab-group/secondary";
import Table from "@/shared/ui/table/Table";
import Button from '@/shared/ui/button/Button';
import { DatePicker } from 'antd';
import {IResHistoryTransactions, apiHistoryTransactions} from "@/shared/api";
import {format, startOfMonth, subDays, subYears} from "date-fns";
import Loader from '@/shared/ui/loader';

const { RangePicker } = DatePicker;

enum TabKey {
    MONTH = 'month',
    DAYS_30 = 'days_30',
    DAYS_90 = 'days_90',
    YEAR = 'year', 
    CUSTOM = 'custom', 
}

type HistoryTab = {
    Key: TabKey;
    Title: string;
    StartDate?: string;
    EndDate?: string;
}

const apiDate = (value: Date) =>
    format(value, 'yyyy-MM-dd');

const historyTabs: Array<HistoryTab> = [
    {
        Key: TabKey.MONTH,
        Title: 'This month',
        StartDate: apiDate(startOfMonth(new Date())),
        EndDate: apiDate(new Date())
    },
    {
        Key: TabKey.DAYS_30,
        Title: 'Last 30 days',
        StartDate: apiDate(subDays(new Date(), 30)),
        EndDate: apiDate(new Date())
    },
    {
        Key: TabKey.DAYS_90,
        Title: 'Last 90 days',
        StartDate: apiDate(subDays(new Date(), 90)),
        EndDate: apiDate(new Date())
    },
    {
        Key: TabKey.YEAR,
        Title: 'This year',
        StartDate: apiDate(subYears(new Date(), 1)),
        EndDate: apiDate(new Date())
    },
    {
        Key: TabKey.CUSTOM,
        Title: 'Custom period',
    }
];

function getTabsAsRecord (tabs: Array<HistoryTab>) {
    let list: Record<string, string> = {};
    
    tabs.forEach(tab => Object.assign(list, {
        [tab.Key]: tab.Title
    }));

    return list;
}

interface Props {
    title?: string,
    currency?: string,
    className?: string
}

function History({title, currency, className}: Props) {
    const [activeTab, setActiveTab] = useState<string>(historyTabs[0].Key);
    const [historyList, setHistoryList] = useState<IResHistoryTransactions[]>(null);
    const [isUserRequest, setUserRequest] = useState(false);
    const [customDate, setCustomDate] = useState<[dayjs.Dayjs, dayjs.Dayjs]>(
        [dayjs(startOfMonth(new Date())), dayjs()]
    )

    useEffect(() => {
        (async () => {
            if (activeTab === TabKey.CUSTOM && !isUserRequest) return;

            setHistoryList(null);

            const {
                StartDate: start = apiDate(customDate[0].toDate()),
                EndDate: end = apiDate(customDate[1].toDate())
            } = historyTabs.find(tab => tab.Key === activeTab);

            const {data} = await apiHistoryTransactions(start.toString(), end.toString(), currency);
            setHistoryList(data)
            setUserRequest(false)
        })();
    }, [activeTab, currency, isUserRequest]);

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
                                disabled={isUserRequest}
                                onClick={() => setUserRequest(true)}
                            >Apply</Button>
                        </div>
                    </div>
                )}

                {!historyList && (
                    <div className='mt-5'>
                        <Loader className='relative'/>
                    </div>
                )}

                {historyList && (
                    <Table
                        data={{
                            labels: [
                                {text: 'Data'},
                                {text: 'Flow of funds'},
                                {text: 'Information'}
                            ],
                            rows: historyList.map((item) => 
                            [
                                {text: format(new Date(item.datetime), "dd MMMM yyyy HH:mm")},
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
