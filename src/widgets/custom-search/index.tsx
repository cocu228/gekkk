import styles from './style.module.scss';
import { useContext, useEffect, useState } from 'react';
import { CtxWalletNetworks } from '../wallet/transfer/model/context';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space, Select } from 'antd';
import dayjs from 'dayjs';
import { dateFormat } from './const';
import Button from '@/shared/ui/button/Button';
import { GetHistoryTrasactionOut, TransactTypeEnum } from '@/shared/(orval)api/gek/model';
import { apiAssets, apiGetHistoryTransactions } from '@/shared/(orval)api/gek';
import { formatForApi, formatForHistoryMobile, formatForHistoryTimeMobile } from '@/shared/lib/date-helper';
import { actionResSuccess } from '@/shared/lib/helpers';
import { historyTabs } from '../history/model/helpers';
import { options } from './const';
import axios from 'axios';
import { TabKey } from '../history/model/types';
import { CtxRootData } from '@/processes/RootContext';
import TransactionInfo from '../history/ui/TransactionInfo';
import CurrencySelector from '@/shared/ui/input-currency/ui/currency-selector/CurrencySelector';
import { ISelectTxTypes, ISelectAssets } from './types';
import Loader from '@/shared/ui/loader';

export default function customSearch() {
    const {setNetworkType, networksForSelector, networkTypeSelect} = useContext(CtxWalletNetworks);
    const [date, setDate] = useState<[dayjs.Dayjs,dayjs.Dayjs]>([dayjs('2022-01-01', dateFormat), dayjs('2024-01-01', dateFormat)]);
    const [activeTab, setActiveTab] = useState<string>(historyTabs[0].Key);
    
    const [allAssets, setAllAssets] = useState<ISelectAssets[]>();
    const [selectedAsset, setSelectedAsset] = useState<ISelectAssets>({label: 'Gekkoin EUR', value: 'EURG'});
    const [listHistory, setListHistory] = useState<GetHistoryTrasactionOut[]>([]);
    const [loading, setLoading] = useState(false);
    const [lazyLoading, setLazyLoading] = useState(false);
    const [selectedTx, setSelected] = useState(options[0]);
    const [allTxVisibly, setAllTxVisibly] = useState(false);

    const { refreshKey } = useContext(CtxRootData)

    const handleStartDateChange: DatePickerProps['onChange'] = (newDate, dateString) => {
        setDate([newDate, date[1]]);
    };
    
    const handleFinishDateChange: DatePickerProps['onChange'] = (newDate, dateString) => {
        setDate([date[0], newDate]);

    };

    const handleReset = () => {
        setDate([dayjs('2024-01-01', dateFormat), dayjs('2024-01-01', dateFormat)]);
    };

    const loadAssets = async () => {
        const assets = await apiAssets();
        actionResSuccess(assets).success(() => {
            const {result} = assets.data;
            console.log(result);
            
            const formatedResult = result.map(elem => {
                return {value: elem.code, label: elem.name}
            })
            setAllAssets(formatedResult);
        });
    }

    const requestHistory = async (cancelToken = null) => {
        setLoading(true);

        const start = formatForApi(date[0].toDate());
        const end = formatForApi(date[1].toDate());
        

        const response = await apiGetHistoryTransactions({
            limit: 10,
            tx_types: selectedTx.value,
            end: end.length ? end.toString() : null,
            start: start.length ? start.toString() : null,
            currencies: [selectedAsset.value],
        }, { cancelToken });

        actionResSuccess(response).success(() => {
            const { result } = response.data;
            
            setListHistory(result);
        })

        setLoading(false);
    }

    const applyHandler = () => {
        const cancelTokenSource = axios.CancelToken.source();
        console.log(selectedTx);
        
        (async () => {
            await requestHistory(cancelTokenSource.token);
        })()

        return () => cancelTokenSource.cancel()
    }

    useEffect(() => {
        loadAssets();
        
    }, []);

    useEffect(() => {
        applyHandler();
        
    }, [refreshKey, activeTab]);

    const requestMoreHistory = async () => {  
        setLazyLoading(true)
        const lastValue = listHistory[listHistory.length - 1];

        const { data } = await apiGetHistoryTransactions({
            currencies: [selectedAsset.value],
            tx_types: selectedTx.value,
            next_key: lastValue?.next_key,
            limit: 10,
            // include_fiat: includeFiat,
        });

        if (data.result.length < 10) setAllTxVisibly(true)
        
        

        setListHistory(prevState => ([...prevState, ...data.result]))

        setLazyLoading(false)
    }

    const scrollHandler = async (e) => {               
        
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 10){
            
            await requestMoreHistory();
        }
    }

    useEffect(()=>{
            document.addEventListener("scroll", scrollHandler)
            return function (){
                document.removeEventListener("scroll", scrollHandler)
            }
    }, [])

    
    if (loading) {
        return(
            <div id="MainContainerHistoryMobile" className={styles.MainContainerMobile +" h-[100px] relative"}>
                <Loader/>
            </div>
        )
    }

    return (
        <>
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
                    <div className={`flex flex-row items-center justify-center gap-3 max-h-20 ${styles.selector}`}>
                        <h4 className='w-40'>Type:</h4>
                        <Select className={`w-full`}
                                placeholder={"No data avialible"} 
                                value={selectedTx}
                                onSelect={(_, selectedOption) => {
                                    setSelected(selectedOption);
                                }}
                                options={options}
                                listHeight={500}/>
                    </div>
                    <div className={`flex flex-row items-center justify-center gap-3 max-h-20 ${styles.selector}`}>
                        <h4 className='w-40'>Currency:</h4>
                        <CurrencySelector className='w-4 h-4'/>

                        <Select className={`w-full`}
                                placeholder={"Select currency"} 
                                value={selectedAsset}
                                onSelect={(_,opt) => setSelectedAsset(opt)}
                                options={allAssets}
                                listHeight={500}/>
                    </div>
                    {selectedAsset && selectedAsset.isFiat && <div className={`flex flex-row items-center justify-center gap-3 max-h-20 ${styles.selector}`}>
                        <h4 className='w-40'>Card:</h4>
                        <Select className={`w-full`}
                                placeholder={"No dates avialible"} 
                                value={networkTypeSelect}
                                onSelect={setNetworkType}
                                options={networksForSelector}
                                listHeight={500}/>
                    </div>}
                </div>
                <div className='flex pt-4 gap-5'>
                    <Button size='sm' onClick={() => applyHandler()}>Apply</Button>
                    <Button size='sm' gray={true} className='grey' onClick={handleReset} >Clear</Button>
                </div>
            </form>
        </div>
        <div className={styles.histWrapper}>

            {listHistory.map((item, index) => {
                        const doesPrevDateTimeExist = listHistory[index-1]?.datetime !== undefined

                        if(!doesPrevDateTimeExist){
                            return(
                                <>
                                    <div className={styles.DataMobile}>
                                        {formatForHistoryMobile(item.datetime)}
                                    </div>
                                    <div className={styles.InfoMobile}>
                                        <TransactionInfo infoList={item}>
                                            <div className={styles.TransactionMobile}>
                                                <span className={styles.TypeOfTransactionMobile}>
                                                    {formatForHistoryTimeMobile(item.datetime)} {item.tx_type_text}
                                                </span>
                                                <span className={styles.DescriptionOfTransactionMobile}>
                                                    {item.tag?item.tag:"..."}
                                                </span>
                                            </div>
                                            <div className={styles.StatusAndAmountOfTransactionMobile}>
                                                <span className={styles.StatusMobile}>
                                                    {item.status_text}
                                                </span>
                                                <span className={item.is_income ? styles.IncomeMobile :styles.AmountMobile}>
                                                    {item.is_income?"+":"-"}{item.amount + " " + item.currency}
                                                </span>
                                            </div>
                                            <div className={styles.ArrowBtnMobile}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.75934L1.3125 0.387909L7 6.38791L1.3125 12.3879L0 11.0165L4.375 6.38791L0 1.75934Z" fill="#9D9D9D"/>
                                                </svg>
                                            </div>
                                        </TransactionInfo>
                                    </div>
                                </>
                            )
                        }else if(formatForHistoryMobile(listHistory[index].datetime) !== formatForHistoryMobile(listHistory[index-1].datetime)){
                            return(
                                <>
                                    <div className={styles.DataMobile}>
                                        {formatForHistoryMobile(item.datetime)}
                                    </div>
                                    <div className={styles.InfoMobile}>
                                        <TransactionInfo infoList={item}>
                                            <div className={styles.TransactionMobile}>
                                                <span className={styles.TypeOfTransactionMobile}>
                                                    {formatForHistoryTimeMobile(item.datetime)} {item.tx_type_text}
                                                </span>
                                                <span className={styles.DescriptionOfTransactionMobile}>
                                                    {item.tag?item.tag:"..."}
                                                </span>
                                            </div>
                                            <div className={styles.StatusAndAmountOfTransactionMobile}>
                                                <span className={styles.StatusMobile}>
                                                    {item.status_text}
                                                </span>
                                                <span className={item.is_income ? styles.IncomeMobile :styles.AmountMobile}>
                                                    {item.is_income?"+":"-"}{item.amount + " " + item.currency}
                                                </span>
                                            </div>
                                            <div className={styles.ArrowBtnMobile}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.75934L1.3125 0.387909L7 6.38791L1.3125 12.3879L0 11.0165L4.375 6.38791L0 1.75934Z" fill="#9D9D9D"/>
                                                </svg>
                                            </div>
                                        </TransactionInfo>
                                    </div>
                                </>
                            )
                        }else{
                            return(
                                <>
                                    <div className={styles.InfoMobile}>
                                        <TransactionInfo infoList={item}>
                                            <div className={styles.TransactionMobile}>
                                                <span className={styles.TypeOfTransactionMobile}>
                                                    {formatForHistoryTimeMobile(item.datetime)} {item.tx_type_text}
                                                </span>
                                                <span className={styles.DescriptionOfTransactionMobile}>
                                                    {item.tag?item.tag:"..."}
                                                </span>
                                            </div>
                                            <div className={styles.StatusAndAmountOfTransactionMobile}>
                                                <span className={styles.StatusMobile}>
                                                    {item.status_text}
                                                </span>
                                                <span className={item.is_income ? styles.IncomeMobile :styles.AmountMobile}>
                                                    {item.is_income?"+":"-"}{item.amount + " " + item.currency}
                                                </span>
                                            </div>
                                            <div className={styles.ArrowBtnMobile}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="7" height="13" viewBox="0 0 7 13" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.75934L1.3125 0.387909L7 6.38791L1.3125 12.3879L0 11.0165L4.375 6.38791L0 1.75934Z" fill="#9D9D9D"/>
                                                </svg>
                                            </div>
                                        </TransactionInfo>
                                    </div>
                                </>
                            )
                        }
                    })}
            {!loading && listHistory.length >= 10 && !allTxVisibly && 
                <div className="row mt-3">
                    <div className="col flex justify-center relative">
                        {lazyLoading && <Loader className={" w-[24px] h-[24px] top-[4px]"} />}
                    </div>
                </div>
            }
        </div>
        </>
    );
}