import React, {useState} from 'react';
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import Filter from "@/shared/ui/filter/Filter";
import Table from "@/shared/ui/table/Table";
import styles from './style.module.scss';

const historyFilters = [
    { value: 'month', label: 'This month'},
    { value: '30_days', label: 'Last 30 days'},
    { value: '90_days', label: 'Last 90 days'},
    { value: 'year', label: 'This year'},
    { value: 'custom', label: 'Custom period'},
];

interface Props {
    title?: string,
    withSurface?: boolean
}

function History({title, withSurface = true}: Props) {
    const [selectedOption, setSelectedOption] = useState(historyFilters[0].value);

    return (
        <div className="wrapper">
            {title && (
                <SectionTitle>{title}</SectionTitle>
            )}
            <div className={withSurface ? `bg-bgPrimary rounded-md p-4 ${styles.surface}` : ''}>
                <Filter options={historyFilters} selected={selectedOption} onChange={setSelectedOption}/>
                <Table
                    data={{
                        labels: [{text: 'Data'}, {text: 'Flow of funds'}, {text: 'Information'}],
                        rows: [
                            [
                                {text: '16.05.2022 11:01 AM', options: {nowrap: true}},
                                {text: <span className="text-green">8.00 EUR</span>},
                                {text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores', options: {wFull: true}},
                            ],
                            [
                                {text: '16.05.2022 11:01 AM', options: {nowrap: true}},
                                {text: '-128.00 EUR'},
                                {text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores', options: {wFull: true}},
                            ],
                            [
                                {text: '16.05.2022 11:01 AM', options: {nowrap: true}},
                                {text: <span className="text-green">8.00 EUR</span>},
                                {text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores', options: {wFull: true}},
                            ],
                        ]
                    }}
                    noDataText="You dont have any history"
                />
            </div>
        </div>
    );
}

export default History;