import {useState} from 'react';
import SectionTitle from "@/shared/ui/section-title/SectionTitle";
import Table from "@/shared/ui/table/Table";
import SecondaryTabGroup from '@/shared/ui/tab-group/secondary';
import styles from './style.module.scss';

const historyTabs: Record<string, string> = {
    'month': 'This month',
    '30_days': 'Last 30 days',
    '90_days': 'Last 90 days',
    'year': 'This year',
    'custom': 'Custom period',
};

interface Props {
    title?: string,
    withSurface?: boolean,
    className?: string
}

function History({title, withSurface = true, className}: Props) {
    const [activeTab, setActiveTab] = useState('month');

    return (
        <div className="wrapper">
            {title && (
                <SectionTitle>{title}</SectionTitle>
            )}
            <div className={withSurface ? `bg-white rounded-md p-4 ${className} ${styles.surface}` : ''}>
                <SecondaryTabGroup tabs={historyTabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
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