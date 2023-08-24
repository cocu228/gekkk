import Decimal from 'decimal.js';
import Loader from '@/shared/ui/loader';
import styles from './style.module.scss';
import {RateState} from '../../model/types';
import {CtxExchangeData} from '../../model/context';
import {useContext, useEffect, useState} from 'react';
import {getCurrencyRounding} from '@/shared/lib/helpers';
import IconArrowUp from '../../../../shared/ui/icons/IconArrowUp';
import {ITradeInfo, TradePriceArray, apiGetTradeInfo} from '@/shared/api';
import DepthItem from '@/widgets/exchange/ui/depth-of-market/depth-item/DepthItem';
import {CtxCurrencies} from "@/processes/CurrenciesContext";

interface IParams {
    currencyFrom: string;
    currencyTo: string;
    roomKey: string;
    isSwapped: boolean;
}

interface DepthOfMarketState {
    price: number;
    tradeInfo: ITradeInfo;
    loading: boolean;
    rateState: RateState | null;
}

function DepthOfMarket({ currencyFrom, currencyTo, roomKey, isSwapped }: IParams) {
    const initialState: DepthOfMarketState = {
        rateState: null,
        price: null,
        tradeInfo: null,
        loading: false
    }

    const {currencies} = useContext(CtxCurrencies);
    const {onPriceCurrenciesSwap} = useContext(CtxExchangeData);
    const [state, setState] = useState<DepthOfMarketState>(initialState);

    useEffect(() => {
        if (!state.tradeInfo) return;

        const asks = state.tradeInfo.asks[0];
        const bids = state.tradeInfo.bids[0];

        if (!asks || !bids) return;

        const price = (!isSwapped
            ? asks[2] + bids[2]
            : asks[0] / asks[1] + bids[0] / bids[1]
        ) / 2;

        let newPrice: number = +price.toFixed(
            currencies.get(isSwapped ? currencyFrom : currencyTo)?.ordersPrec
        );

        setState(prev => ({
            ...prev,
            rateState: prev.price > newPrice ? RateState.DOWN : RateState.UP,
            price: newPrice
        }));
    }, [state.tradeInfo, isSwapped]);

    useEffect(() => {
        setState(initialState);
        if (currencyFrom && currencyTo) {
            if (!state.price) setState(prev => ({
                ...prev,
                loading: true
            }));

            updateDepth();
            const interval = setInterval(() => {
                updateDepth();
            }, 10000)

            return () => clearInterval(interval);
        }
    }, [currencyFrom, currencyTo])

    function updateDepth() {
        apiGetTradeInfo(currencyFrom, currencyTo, roomKey).then(({ data }) => {
            const { asks, bids } = data.result;

            data.result.asks = asks;
            data.result.bids = bids;

            setState(prev => ({
                ...prev,
                tradeInfo: data.result
            }));
        }).finally(() => {
            setState(prev => ({
                ...prev,
                loading: false
            }));
        });
    }

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
                    <span>Price</span>
                    <span>Amount</span>
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
                {getDepthItems(state.tradeInfo?.asks, 'bottom', 'red')}
            </div>
            <div className="my-auto">
                <div
                    className={`flex items-center gap-1 my-4 md:my-3.5 font-semibold text-md lg:text-sm md:text-md
                      ${styles.Rate}
                      ${state.rateState === RateState.UP ? styles.RateUp :
                            state.rateState === RateState.DOWN ? styles.RateDown : 'fill-none'}`
                    }
                >
                    {state.loading ? (
                        <Loader className='relative h-[25px] w-[25px]' />
                    ) : (
                        <>
                            <IconArrowUp /> {state.price ?? '-'}
                        </>
                    )}
                </div>
            </div>
            <div className={styles.GreenWrapper}>
                {getDepthItems(state.tradeInfo?.bids, 'top', 'green')}
            </div>
        </div>
    );
}

export default DepthOfMarket;
