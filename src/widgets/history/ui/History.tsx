import {useEffect, useState} from 'react';
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import SecondaryTabGroup from "@/shared/ui/tab-group/secondary";
import Table from "@/shared/ui/table/Table";
import {apiHistoryTransactions} from "@/shared/api";
import {sameOrAfter} from "@/shared/lib/date-helper";
import {format, subDays, subYears} from "date-fns";

const historyTabs: Record<string, string> = {
    'month': 'This month',
    '30_days': 'Last 30 days',
    '90_days': 'Last 90 days',
    'year': 'This year',
    'custom': 'Custom period',
};

const filter = (historyList, selectedOption) => {

    switch (selectedOption) {
        case 'month':
            return historyList.filter(item => +format(new Date(item.datetime), "yyyyMM") ===
                +format(new Date(), "yyyyMM"))
        case '30_days':
            return historyList.filter(item => sameOrAfter(new Date(item.datetime), subDays(new Date(), 30)))
        case '90_days':
            return historyList.filter(item => sameOrAfter(new Date(item.datetime), subDays(new Date(), 90)))
        case 'year':
            return historyList.filter(item => sameOrAfter(new Date(item.datetime), subYears(new Date(), 1)))
        case 'custom':
            console.log('custom');
            return [];
        default:
            throw Error("Нет таких значений");
    }
}

interface Props {
    title?: string,
    className?: string
}

function History({title, className}: Props) {
    const [activeTab, setActiveTab] = useState(Object.keys(historyTabs)[0]);
    const [historyList, setHistoryList] = useState([]);

    useEffect(() => {

        (async () => {
            const {data} = await apiHistoryTransactions()
            setHistoryList(data)
        })()
    }, [])

    let filterList = filter(historyList, activeTab)

    const sortedList = filterList.map((item) => ([{text: format(new Date(item.datetime), "dd MMMM yyyy HH:mm")}, {
        text: <span className="text-green">{item.amount + " " + item.currency}</span>
    }, {text: ""}]))

    return (
        <div className="wrapper">
            {title && (
                <SectionTitle>{title}</SectionTitle>
            )}
            <div className={`${className} bg-white rounded-[10px] p-[15px] shadow-[0_4px_12px_0px_rgba(0,0,0,0.12)]`}>
                <SecondaryTabGroup tabs={historyTabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
                <Table
                    data={{
                        labels: [{text: 'Data'}, {text: 'Flow of funds'}, {text: 'Information'}],
                        rows: sortedList
                    }}
                    noDataText="You dont have any history"
                />
            </div>
        </div>
    );
}

export default History;
