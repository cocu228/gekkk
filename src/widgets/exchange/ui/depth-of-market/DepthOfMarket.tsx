import Decimal from 'decimal.js';
import styles from './style.module.scss';
import {CtxExchangeData} from '../../model/context';
import {useContext, useEffect, useState} from 'react';
import {getCurrencyRounding, uncoverResponse} from '@/shared/lib/helpers';
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import DepthItem from '@/widgets/exchange/ui/depth-of-market/depth-item/DepthItem';
import DepthPrice from "@/widgets/exchange/ui/depth-of-market/depth-price/DepthPrice";
import {ITradeInfo, TradePriceArray, apiGetTradeInfo, apiGetRates} from '@/shared/api';
import { t } from 'i18next';

interface IParams {
    roomKey: string;
    isSwapped: boolean;
    currencyTo: string;
    currencyFrom: string;
}

interface DepthOfMarketState {
    price: number;
    loading: boolean;
    tradeInfo: ITradeInfo;
    rate: Record<string, number>;
}

function DepthOfMarket({
    roomKey,
    isSwapped,
    currencyTo,
    currencyFrom
}: IParams) {
    const initialState: DepthOfMarketState = {
        rate: {},
        price: null,
        loading: false,
        tradeInfo: null
    }

    const {currencies} = useContext(CtxCurrencies);
    const {onPriceCurrenciesSwap} = useContext(CtxExchangeData);
    const [{
        rate,
        price,
        loading,
        tradeInfo
    }, setState] = useState<DepthOfMarketState>(initialState);

    useEffect(() => {
        if (!roomKey && currencyTo && currencyFrom) {
            updateRate();
        }
        
        if (tradeInfo) {
            const asks = tradeInfo.asks[0];
            const bids = tradeInfo.bids[0];

            if (asks && bids) {
                const price = (isSwapped
                        ? asks[0] / asks[1] + bids[0] / bids[1]
                        : asks[2] + bids[2]) / 2;

                let newPrice: number = +price.toFixed(
                    currencies.get(isSwapped ? currencyFrom : currencyTo)?.ordersPrec
                );

                setState(prev => ({
                    ...prev,
                    price: newPrice
                }));
            }
        }
    }, [tradeInfo, isSwapped]);

    useEffect(() => {
        setState(initialState);
        if (currencyFrom && currencyTo) {
            if (!price) setState(prev => ({
                ...prev,
                loading: true
            }));

            updateTradeInfo();
            const interval = setInterval(() => updateTradeInfo(), 10000);

            return () => clearInterval(interval);
        }
    }, [currencyFrom, currencyTo])

    function updateRate() {
        if (!roomKey) {
            setState(prev => ({
                ...prev,
                loading: true
            }));

            (async () => {
                const rate = !isSwapped
                    ? await apiGetRates(currencyTo, currencyFrom)
                    : await apiGetRates(currencyFrom, currencyTo);

                setState(prev => ({
                    ...prev,
                    rate: uncoverResponse(rate) ?? {},
                    loading: false
                }))
            })();
        }
    }
    
    function updateTradeInfo() {
        updateRate();
        
        apiGetTradeInfo(currencyFrom, currencyTo, roomKey)
            .then(({data}) => setState(prev => ({
                    ...prev,
                    tradeInfo: data.result
                })))
            .finally(() => setState(prev => ({
                    ...prev,
                    loading: false
                }))
            );
    }

    // Generates depth of market rows
    const getDepthItems = (
        array: Array<TradePriceArray> = [],
        align: 'top' | 'bottom' = 'top',
        color: 'red' | 'green'
    ) => {
        const rows = Array<JSX.Element>();
        let maxAmount: number;
        let arrLen: number = array.length - 1;

        array.slice(0, 6).forEach((arr, index) => maxAmount = index === 0 ? arr[1] : Math.max(maxAmount, arr[1]))

        for (let i = 0; i <= 5; i++) {
            rows.push(i > arrLen ? (
                <DepthItem
                    color={color}
                    amount={0}
                    percent={new Decimal(0)}
                    price={null}
                />
            ) : (
                <DepthItem
                    color={color}
                    amount={getCurrencyRounding(array[i][0])}
                    percent={new Decimal((array[i][1] / maxAmount) * 100)}
                    price={new Decimal(!isSwapped
                        ? (array[i][2]).toFixed(currencies.get(currencyTo)?.ordersPrec)
                        : (array[i][0] / array[i][1]).toFixed(currencies.get(currencyFrom)?.ordersPrec)
                    )}
                />
            ));
        }

        return align === 'bottom' ? rows.reverse() : rows;
    }

    return (
        <div className={styles.Wrapper}>
            <div className={styles.Head}>
                <div className="flex justify-between font-medium text-md lg:text-sm md:text-xs">
                    <span>{t("price")}</span>
                    <span>{t("amount")}</span>
                </div>
                {(currencyFrom && currencyTo) && (
                    <div className={`flex justify-between items-center ${styles.Pair}`}>
                        <span className="inline-flex items-center gap-1">
                            ({isSwapped
                                ? `${currencyTo}/${currencyFrom}`
                                : `${currencyFrom}/${currencyTo}`
                            })
                            <img
                                width={22}
                                className={`${styles.Icon} cursor-pointer`}
                                src={`/img/icon/ExchangeOrange.svg`}
                                alt="ExchangeIcon"
                                onClick={onPriceCurrenciesSwap}
                            />
                        </span>
                        <span>({currencyFrom})</span>
                    </div>
                )}
            </div>
            <div className={styles.RedWrapper}>
                {getDepthItems(tradeInfo?.asks, 'bottom', 'red')}
            </div>
            <div className="my-auto">
                <DepthPrice
                    loading={loading}
                    currency={isSwapped ? currencyTo : currencyFrom}
                    amount={roomKey
                        ? price
                        : rate[isSwapped ? currencyTo : currencyFrom]
                    }
                />
            </div>
            <div className={styles.GreenWrapper}>
                {getDepthItems(tradeInfo?.bids, 'top', 'green')}
            </div>
        </div>
    );
}

export default DepthOfMarket;
