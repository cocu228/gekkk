import dayjs from 'dayjs';
import {memo, useContext, useEffect, useState} from 'react';
import Button from '@/shared/ui/button/Button';
import {DatePicker} from 'antd';
import {Props, TabKey} from "../model/types";
import {historyTabs} from "../model/helpers";
import {formatForCustomer, formatForApi, formatForHistoryMobile, formatForHistoryTimeMobile} from "@/shared/lib/date-helper";
import {startOfMonth} from "date-fns";
import styles from "./style.module.scss"
import GTable from '@/shared/ui/grid-table/';
import TransactionInfo from "@/widgets/history/ui/TransactionInfo";
import {CtxRootData} from '@/processes/RootContext';
import {actionResSuccess, getSecondaryTabsAsRecord} from "@/shared/lib/helpers";
import Loader from "@/shared/ui/loader";
import axios from "axios";
import {useTranslation} from 'react-i18next';
import {GetHistoryTrasactionOut} from "@/shared/(orval)api/gek/model";
import {apiGetHistoryTransactions} from "@/shared/(orval)api/gek";
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';
import {useMatch, useParams} from 'react-router-dom';

const { RangePicker } = DatePicker;

const History = memo(function ({ currenciesFilter, types, includeFiat }: Partial<Props>) {
    const { t } = useTranslation();

    const { refreshKey } = useContext(CtxRootData);
    const [activeTab, setActiveTab] = useState<string>(historyTabs[0].Key);
    // const {currencies} = useContext(CtxCurrencies);
    const [listHistory, setListHistory] = useState<GetHistoryTrasactionOut[]>([]);
    const [loading, setLoading] = useState(false);
    const [lazyLoading, setLazyLoading] = useState(false);
    const [allTxVisibly, setAllTxVisibly] = useState(false);
    const [customDate, setCustomDate] = useState<[dayjs.Dayjs, dayjs.Dayjs]>(
        [dayjs(startOfMonth(new Date())), dayjs()]
    )
    const {md} = useContext(BreakpointsContext); 
    const {currency, tab} = useParams()
        
    const walletPage = currency || tab  
    const isWalletPage = !!walletPage
    

    
    const requestHistory = async (cancelToken = null) => {
        setLoading(true);
        setAllTxVisibly(false);

        const {
            StartDate: start = formatForApi(customDate[0].toDate()),
            EndDate: end = formatForApi(customDate[1].toDate())
        } = historyTabs.find(tab => tab.Key === activeTab);

        const response = await apiGetHistoryTransactions({
            limit: 10,
            tx_types: types,
            currencies: currenciesFilter,
            end: end.length ? end.toString() : null,
            start: start.length ? start.toString() : null,
            include_fiat: includeFiat,
        }, { cancelToken });

        actionResSuccess(response).success(() => {
            const { result } = response.data;
            setListHistory(result);
        })

        setLoading(false);
    }

    const requestMoreHistory = async () => {  
        setLazyLoading(true)
        const lastValue = listHistory[listHistory.length - 1];

        const { data } = await apiGetHistoryTransactions({
            currencies: currenciesFilter,
            tx_types: types,
            next_key: lastValue?.next_key,
            limit: 10,
            include_fiat: includeFiat,
        });

        if (data.result.length < 10) setAllTxVisibly(true)
        
        

        setListHistory(prevState => ([...prevState, ...data.result]))

        setLazyLoading(false)
    }

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();

        (async () => {
            if (activeTab !== TabKey.CUSTOM) {
                await requestHistory(cancelTokenSource.token);
            }
        })()

        return () => cancelTokenSource.cancel()
    }, [refreshKey, activeTab, currenciesFilter]);

    
    const scrollHandler = (e) => {                
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 10){
            requestMoreHistory()
        }
    }
    useEffect(()=>{
        md &&
            document.addEventListener("scroll", scrollHandler)
            return function (){
                document.removeEventListener("scroll", scrollHandler)
            }
    }, [])

    if(md && !listHistory.length){
        return(
            <div id="MainContainerHistoryMobile" className={styles.MainContainerMobile +" h-[100px] relative"}>
                <Loader/>
            </div>
        )
    }

        return(
            <>
            <div id={"History"} className="wrapper">
                <h2 className=" font-bold pt-3 text-xl">Last transactions</h2>
                <div id="MainContainerHistoryMobile" className={styles.MainContainerMobile}>
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
                </div>
            </>
        )
})

export default History;
