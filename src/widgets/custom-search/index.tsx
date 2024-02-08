import styles from './style.module.scss';
// import Select from '@/shared/ui/select/Select';
import { useContext, useEffect, useState } from 'react';
import { CtxWalletNetworks } from '../wallet/transfer/model/context';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space, Select } from 'antd';
import dayjs from 'dayjs';
import { dateFormat } from './const';
import Button from '@/shared/ui/button/Button';
import { GetHistoryTrasactionOut } from '@/shared/(orval)api/gek/model';
import { apiGetHistoryTransactions } from '@/shared/(orval)api/gek';
import { formatForApi } from '@/shared/lib/date-helper';
import { actionResSuccess } from '@/shared/lib/helpers';
import { historyTabs } from '../history/model/helpers';
import { options } from './const';

export default function customSearch() {
    const {setNetworkType, networksForSelector, networkTypeSelect} = useContext(CtxWalletNetworks);
    const [date, setDate] = useState<[dayjs.Dayjs,dayjs.Dayjs]>([dayjs('2024-01-01', dateFormat), dayjs('2024-01-01', dateFormat)]);

    
    const [listHistory, setListHistory] = useState<GetHistoryTrasactionOut[]>([]);
    const [loading, setLoading] = useState(false);
    const [lazyLoading, setLazyLoading] = useState(false);
    const [selected, setSelected] = useState(options[0]);

    const handleStartDateChange: DatePickerProps['onChange'] = (newDate, dateString) => {
        setDate([newDate, date[1]]);
    };
    
    const handleFinishDateChange: DatePickerProps['onChange'] = (newDate, dateString) => {
        setDate([date[0], newDate]);

    };

    const handleReset = () => {
        setDate([dayjs('2024-01-01', dateFormat), dayjs('2024-01-01', dateFormat)]);
    };

    const requestHistory = async (cancelToken = null) => {
        setLoading(true);

        const start = formatForApi(date[0].toDate());
        const end = formatForApi(date[1].toDate());
        

        const response = await apiGetHistoryTransactions({
            limit: 10,
            tx_types: selected.value,
            end: end.length ? end.toString() : null,
            start: start.length ? start.toString() : null,
        }, { cancelToken });

        actionResSuccess(response).success(() => {
            const { result } = response.data;
            setListHistory(result);
        })

        setLoading(false);
    }

    useEffect(() => {
        console.log(listHistory);
        
    }, [listHistory]);

    // const requestMoreHistory = async () => {  
    //     setLazyLoading(true)

    //     const lastValue = listHistory[listHistory.length - 1];

    //     const { data } = await apiGetHistoryTransactions({
    //         currencies: currenciesFilter,
    //         tx_types: types,
    //         next_key: lastValue?.next_key,
    //         limit: 10,
    //         include_fiat: includeFiat,
    //     });

    //     if (data.result.length < 10) setAllTxVisibly(true)

    //     setListHistory(prevState => ([...prevState, ...data.result]))

    //     setLazyLoading(false)
    // }

    return (
        <div className={styles.wrapper}>
            <form className={styles.filters}>
                <h4 className='text-base pt-4'>Enter period or choose from calendar</h4>
                <div>
                    <Space direction="vertical" className='flex flex-row gap-1 font-extrabold pt-4'>
                        <DatePicker  
                            onChange={handleStartDateChange}
                            value={date[0]}
                        />
                        <div className='mb-0'>_</div>
                        <DatePicker  
                            onChange={handleFinishDateChange}
                            value={date[1]}
                        />
                    </Space>
                </div>
                <div className='flex flex-col text-lg pt-4 gap-2'>
                    <div className='flex flex-row items-center justify-center gap-3 '>
                        <h4 className='w-40'>Type:</h4>
                        <Select className={`w-full`}
                                placeholder={"No dates avialible"} 
                                value={networkTypeSelect}
                                onSelect={setNetworkType}
                                options={options}
                                listHeight={500}/>
                    </div>
                    <div className='flex flex-row items-center justify-center gap-3 max-h-20'>
                        <h4 className='w-40'>Currency:</h4>
                        <Select className={`w-full`}
                                placeholder={"No dates avialible"} 
                                value={networkTypeSelect}
                                onSelect={setNetworkType}
                                options={networksForSelector}
                                listHeight={500}/>
                    </div>
                    <div className='flex flex-row items-center justify-center gap-3 max-h-20'>
                        <h4 className='w-40'>Card:</h4>
                        <Select className={`w-full`}
                                placeholder={"No dates avialible"} 
                                value={networkTypeSelect}
                                onSelect={setNetworkType}
                                options={networksForSelector}
                                listHeight={500}/>
                    </div>
                </div>
                <div className='flex pt-4 gap-5'>
                    <Button size='sm'>Apply</Button>
                    <Button size='sm' gray={true} className='grey' onClick={handleReset} >Clear</Button>
                </div>
            </form>
        </div>
    );
}