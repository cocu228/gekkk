import dayjs from 'dayjs';
import {memo, useContext, useEffect, useState} from 'react';
import SecondaryTabGroup from "@/shared/ui/tabs-group/secondary";
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
    const {currency} = useParams()
    
    
    const walletPage = useMatch(`wallet/${currency}`)   
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
        document.addEventListener("scroll", scrollHandler)
        return function (){
            document.addEventListener("scroll", scrollHandler)
        }
        
    }, [])

    
    if(md && isWalletPage){
        return(
            <>
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
                                    </div>
                                </>
                            )
                        }else{
                            return(
                                <>
                                    <div className={styles.InfoMobile}>
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
        )
    }
    return (
        <div id={"History"} className="wrapper">
            {/* <h3 className=" font-bold">{title}</h3> */}

            <SecondaryTabGroup tabs={getSecondaryTabsAsRecord(historyTabs)} activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === TabKey.CUSTOM && (
                <div className='flex flex-col mt-3 mb-3'>
                    {t("enter_period")}

                    <div className='flex grow-0 max-w-[400px] p-2'>
                        <RangePicker
                            className='w-full'
                            value={customDate}
                            onChange={setCustomDate}
                        />
                        <Button
                            className='ml-3'
                            disabled={loading || !customDate}
                            onClick={() => requestHistory()}
                        >{t("apply")}</Button>
                    </div>
                </div>
            )}

            <GTable>
                <GTable.Head className={styles.TableHead}>
                    <GTable.Row>
                        {['Info', 'Amount'].map(label =>
                            <GTable.Col className="text-center">
                                <div className='ellipsis ellipsis-md' data-text={label}>
                                    <span>{label}</span>
                                </div>
                            </GTable.Col>
                        )}
                    </GTable.Row>
                </GTable.Head>
                <GTable.Body className={styles.TableBody}>
                    {listHistory.length > 0 ? listHistory.map((item) => {
                        return (
                            <GTable.Row cols={2} className={styles.Row + ' hover:font-medium'}>
                                <TransactionInfo infoList={item}>
                                    <GTable.Col>
                                        <div className="ellipsis ellipsis-md">
                                            <span className="">{formatForCustomer(item.datetime)} {item.tx_type_text}</span>                                            
                                        </div>
                                        <div className="ellipsis ellipsis-md">
                                            {item.tag}
                                        </div>
                                    </GTable.Col>

                                    <GTable.Col>
                                        <div className={"text-right "+(item.tx_type === 3 && item.partner_info === "" ? "text-orange" : "")}>
                                            {item.status_text}
                                        </div>
                                        <div className='text-base font-mono text-right'>
                                            <span className={`${[15, 16].includes(item.tx_type)
                                                ? 'text-gray-600'
                                                : item.is_income
                                                    ? 'text-green'
                                                    : 'text-red-800'}`}>
                                                {[15, 16].includes(item.tx_type) ? '' : !item.is_income ? '-' : '+'}
                                                {+item.result_amount} {item.currency}
                                            </span>
                                        </div>
                                    </GTable.Col>
                                </TransactionInfo>
                            </GTable.Row>
                        );
                    }) : (
                        <div className={styles.Row}>
                            <span>{t("no_have_any_transaction")}</span>
                        </div>
                    )}
                </GTable.Body>
            </GTable>
            {!loading && listHistory.length >= 10 && !allTxVisibly && 
                <div className="row mt-3">
                    <div className="col flex justify-center relative">
                        {lazyLoading ? 
                            <Loader className={" w-[24px] h-[24px] top-[4px]"} /> 
                            :
                            <span onClick={requestMoreHistory} className="text-gray-400 cursor-pointer inline-flex items-center">
                                See more 
                                <img
                                    className="ml-2" width={10} height={8}
                                    src="/img/icon/ArrowPlainDown.svg"
                                    alt="ArrowPlainDown" 
                                />
                            </span>
                        }
                    </div>
                </div>
            }
        </div>
    );
})

export default History;
