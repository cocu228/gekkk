import styles from './style.module.scss';
import { useContext, useEffect, useState } from 'react';
import { CtxWalletNetworks } from '../wallet/transfer/model/context';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space, Select } from 'antd';
import dayjs from 'dayjs';
import { dateFormat } from './const';
import Button from '@/shared/ui/button/Button';
import { Card, GetHistoryTrasactionOut, TransactTypeEnum } from '@/shared/(orval)api/gek/model';
import { apiAssets, apiGetHistoryTransactions } from '@/shared/(orval)api/gek';
import { formatForApi, formatForHistoryMobile, formatForHistoryTimeMobile } from '@/shared/lib/date-helper';
import { actionResSuccess, getFlagsFromMask } from '@/shared/lib/helpers';
import { historyTabs } from '../history/model/helpers';
import { options } from './const';
import axios from 'axios';
import { HistoryTab, TabKey } from '../history/model/types';
import { CtxRootData } from '@/processes/RootContext';
import TransactionInfo from '../history/ui/TransactionInfo';
import CurrencySelector from '@/shared/ui/input-currency/ui/currency-selector/CurrencySelector';
import { ISelectTxTypes, ISelectAssets, ISelectCard } from './types';
import Loader from '@/shared/ui/loader';
import { maskCurrencyFlags } from '@/shared/config/mask-currency-flags';
import { storeActiveCards } from '@/shared/store/active-cards/activeCards';


import History from '../history/ui/History';
import { useTranslation } from 'react-i18next';
import { formatCardNumber } from '../dashboard/model/helpers';
import { useIntersectionObserver } from '../history/hooks/useIntersectionObserver';
import { useBreakpoints } from '@/app/providers/BreakpointsProvider';



export default function customSearch() {

    const {setNetworkType, networksForSelector, networkTypeSelect} = useContext(CtxWalletNetworks);
    const [date, setDate] = useState<[dayjs.Dayjs,dayjs.Dayjs]>([dayjs('2022-01-01', dateFormat), dayjs('2024-01-01', dateFormat)]);
    const [activeTab, setActiveTab] = useState<string>(historyTabs[0].Key);
    
    const [allAssets, setAllAssets] = useState<ISelectAssets[]>();
    const [selectedAsset, setSelectedAsset] = useState<ISelectAssets>({label: 'GKE Token', value: 'GKE'});
    const [listHistory, setListHistory] = useState<GetHistoryTrasactionOut[]>([]);
    const [selectedCard, setSelectedCard] = useState<string>();
    const loadActiveCards = storeActiveCards((state) => state.getActiveCards);
    const cards = storeActiveCards((state) => state.activeCards);
    const [cardsOptions, setCardsOptions] = useState<ISelectCard[]>([]);

    const {md} = useBreakpoints()

    const [lastValue, setLastValue] = useState<GetHistoryTrasactionOut>(
        listHistory[listHistory.length - 1]
    );

    const { isIntersecting, ref } = useIntersectionObserver({
        threshold: 0.9,
      });
    
    const {t} = useTranslation()

    const translatedOptions = options.map(el=>{
        return {
            ...el,
            label: t(el.t)
        }
    })

    const [loading, setLoading] = useState(false);
    const [lazyLoading, setLazyLoading] = useState(false);
    const [selectedTx, setSelectedTx] = useState(translatedOptions[0]);
    const [allTxVisibly, setAllTxVisibly] = useState(false);

    const [historyData, setHistoryData] = useState({assets: [selectedAsset.value], types: selectedTx.value, includeFiat: selectedAsset.isFiat});
    

    const { refreshKey } = useContext(CtxRootData)

    const handleStartDateChange: DatePickerProps['onChange'] = (newDate, dateString) => {
        setDate([newDate, date[1]]);
    };
    
    const handleFinishDateChange: DatePickerProps['onChange'] = (newDate, dateString) => {
        setDate([date[0], newDate]);

    };

    const handleReset = () => {
        setDate([dayjs('2024-01-01', dateFormat), dayjs('2024-01-01', dateFormat)]);
        setSelectedAsset({label: 'GKE Token', value: 'GKE'});
        setSelectedTx(options[0]);
    };

    const loadAssets = async () => {
        const assets = await apiAssets();
        actionResSuccess(assets).success(() => {
            const {result} = assets.data;
            
            const formatedResult = result.map(elem => {
                const isFiat = getFlagsFromMask(elem.flags, maskCurrencyFlags).fiatCurrency;
                return {value: elem?.code, label: elem?.name, isFiat};
            })
            console.log(formatedResult);
            setAllAssets(formatedResult);
        });
    }


    const applyHandler = () => {
        setHistoryData({assets: [selectedAsset.value], types: selectedTx.value, includeFiat: selectedAsset.isFiat});
    }

    useEffect(() => {        
        (async () => {
            setLoading(true);
            await loadAssets();
            await loadActiveCards();
            setLoading(false);
        })();
        
    }, []);

    useEffect(() => {
        if (cards) {
            const cardsOpts:ISelectCard[] = cards.map(card => ({label: formatCardNumber(card.displayPan), value: card.cardId}))
            setCardsOptions(cardsOpts);
        }
    },[cards])

    useEffect(() => {
        applyHandler();
    }, [refreshKey, activeTab]);

    // useEffect(() => {
    //     console.log(selectedAsset);
    //     console.log(asse);
        
    // },[selectedAsset])


    useEffect(() => {
        if (md && isIntersecting && !allTxVisibly && !(listHistory?.length < 10) && (lastValue?.next_key !== "::0") ) {
    
          (async () => {
            setLazyLoading(true);
    
            console.log(lastValue?.next_key);
            
            const { data } = await apiGetHistoryTransactions({
              currencies: historyData.assets,
              tx_types: historyData.types,
              next_key: lastValue.next_key,
              limit: 10,
              include_fiat: historyData.includeFiat,
              end: date ? formatForApi(date[1].toDate()).toString() : null,
              start: date ? formatForApi(date[0].toDate()).toString() : null,
            });
    
            if (data.result.length < 10) setAllTxVisibly(true);
    
            setListHistory((prevState) => [...prevState, ...data.result]);
            setLazyLoading(false);
          })();
        }
      }, [isIntersecting]);

      useEffect(() => {
        setLastValue(listHistory[listHistory.length - 1]);
      }, [listHistory]);



    
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
                <h4 className='text-base pt-4'>{t("enter_period")}</h4>
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
                <div className='flex flex-col text-lg pt-4 gap-2 w-full'>
                    <div className={`flex flex-row items-center justify-between gap-3 ${styles.selector}`}>
                        <h4 className={styles.selectText}>{t("type")}:</h4>
                        <Select className={styles.select}
                                placeholder={t("no_data_avialible")} 
                                value={selectedTx}
                                onSelect={(_, selectedOption) => {
                                    setSelectedTx(selectedOption);
                                }}
                                options={translatedOptions}
                                listHeight={500}/>
                    </div>
                    <div className={`flex flex-row items-center justify-between gap-3 ${styles.selector}`}>
                        <h4 className={styles.selectText} >{t("currency")}:</h4>
                        <Select className={styles.select}
                                placeholder={t("select_currency")} 
                                value={selectedAsset}
                                onSelect={(_,opt) => setSelectedAsset(opt)}
                                options={allAssets}
                                listHeight={500}/>
                    </div>
                    {selectedAsset.isFiat && <div className={`flex flex-row items-center justify-between gap-3 ${styles.selector}`}>
                        <h4 className={styles.selectText}>{t("card")}:</h4>
                        <Select className={styles.select}
                                placeholder={t("select_card")} 
                                value={selectedCard}
                                onSelect={(_, opt) => setSelectedCard(opt.value)}
                                options={cardsOptions}
                                listHeight={500}/>
                    </div>}
                </div>
                <div className='flex pt-4 gap-5'>
                    <Button size='sm' onClick={() => applyHandler()}>{t("apply")}</Button>
                    <Button size='sm' gray={true} className='grey' onClick={handleReset} >{t("clear")}</Button>
                </div>
            </form>
        </div>
        {allAssets && <History currTab={historyTabs[1]} currenciesFilter={historyData.assets} types={historyData.types} includeFiat={historyData.includeFiat} date={date}/>}
        </>
    );
}