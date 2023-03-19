import React, {useEffect, useState} from 'react';
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import Filter from "@/shared/ui/filter/Filter";
import Table from "@/shared/ui/table/Table";
import {apiHistoryTransactions} from "@/shared/api";
import {format, isSameSecond, isAfter, isBefore, subDays, subYears} from "date-fns";

const historyFilters = [
    {value: 'month', label: 'This month'},
    {value: '30_days', label: 'Last 30 days'},
    {value: '90_days', label: 'Last 90 days'},
    {value: 'year', label: 'This year'},
    {value: 'custom', label: 'Custom period'},
];

export const sameOrBefore = (d1 = new Date(), d2 = new Date()) => {
    return isSameSecond(d1, d2) || isBefore(d1, d2);
}
export const sameOrAfter = (d1 = new Date(), d2 = new Date()) => {
    return isSameSecond(d1, d2) || isAfter(d1, d2);
}
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

function History() {

    const [selectedOption, setSelectedOption] = useState(historyFilters[0].value);
    const [historyList, setHistoryList] = useState([]);


    useEffect(() => {

        (async () => {
            const {data} = await apiHistoryTransactions()
            setHistoryList(data)
        })()
    }, [])

    let filterList = filter(historyList, selectedOption)

    const sortedList = filterList.map((item) => ([{text: format(new Date(item.datetime), "dd MMMM yyyy HH:mm")}, {
        text: <span className="text-green">{item.amount + " " + item.currency}</span>
    }, {text: ""}]))

    return (
        <div className="wrapper">
            <SectionTitle>History</SectionTitle>
            <div className="bg-white rounded-[6px] p-[15px] shadow-[0_4px_12px_0px_rgba(0,0,0,0.12)]">
                <Filter options={historyFilters} selected={selectedOption} onChange={setSelectedOption}/>
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