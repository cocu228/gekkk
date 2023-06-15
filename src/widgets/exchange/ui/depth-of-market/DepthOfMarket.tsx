import DepthItem from '@/widgets/exchange/ui/depth-of-market/depth-item/DepthItem';
import IconArrowUp from '../../../../shared/ui/icons/IconArrowUp';
import styles from './style.module.scss';
import { ITradeInfo, TradePriceArray, apiGetTradeInfo } from '@/shared/api';
import Loader from '@/shared/ui/loader';
import { useContext, useEffect, useState } from 'react';
import { CtxCurrencyData } from '@/app/CurrenciesContext';
import Decimal from 'decimal.js';

interface IParams {
    currency_from: string;
    currency_to: string;
    room_key: string;
}

enum RateState {
    UP = 0,
    DOWN = 1
}

interface DepthOfMarketState {
    price: number;
    tradeInfo: ITradeInfo;
    loading: boolean;
    rateState: RateState | null;
    isSwapped: boolean;
}

function DepthOfMarket({ currency_from, currency_to, room_key }: IParams) {
    const initialState: DepthOfMarketState = {
        rateState: null,
        price: null,
        tradeInfo: null,
        loading: false,
        isSwapped: false
    }

    const { currencies } = useContext(CtxCurrencyData);
    const [state, setState] = useState<DepthOfMarketState>(initialState);

    useEffect(() => {
        if (!state.tradeInfo) return;

        const { tradeInfo, isSwapped } = state;

        const asks = tradeInfo.asks[0];
        const bids = tradeInfo.bids[0];

        if (!asks || !bids) return;

        const price = (!isSwapped ? asks[2] + bids[2] : (
            asks[1] / asks[0] + bids[1] / bids[0]
        )) / 2;

        let newPrice: number = +price.toFixed(
            currencies.get(isSwapped ? currency_from : currency_to)?.roundPrec
        );

        setState(prev => ({
            ...prev,
            rateState: prev.price > newPrice ? RateState.DOWN : RateState.UP,
            price: newPrice
        }));
    }, [state.isSwapped, state.tradeInfo]);

    useEffect(() => {
        setState(initialState);
        if (currency_from && currency_to) {
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
    }, [currency_from, currency_to])

    function updateDepth() {
        apiGetTradeInfo(currency_from, currency_to, room_key).then(({ data }) => {
            const { asks, bids } = data.result;

            data.result.asks = asks.sort(tradeArraySorter).reverse();
            data.result.bids = bids.sort(tradeArraySorter);

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
                    amount={array[i][1]}
                    percent={new Decimal((array[i][1] / maxAmount) * 100)}
                    price={new Decimal(!state.isSwapped ? array[i][2] : (
                        array[i][1] / array[i][0]
                    ).toFixed(currencies.get(currency_to)?.roundPrec))}
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
                {(currency_from && currency_to) && (
                    <div className={`flex justify-between items-center ${styles.Pair}`}>
                        <span className="inline-flex items-center gap-1">
                            ({state.isSwapped ? `${currency_from}/${currency_to}` : `${currency_to}/${currency_from}`})
                            <img
                                width={22}
                                className={`${styles.Icon} cursor-pointer`}
                                src={`/img/icon/ExchangeOrange.svg`}
                                alt="ExchangeIcon"
                                onClick={() => setState(prev =>
                                ({
                                    ...prev,
                                    isSwapped: !prev.isSwapped
                                })
                                )}
                            />
                        </span>
                        <span>({currency_from})</span>
                    </div>
                )}
            </div>
            <div className={styles.RedWrapper}>
                {getDepthItems(state.tradeInfo?.bids, 'bottom', 'red')}
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
                {getDepthItems(state.tradeInfo?.asks, 'top', 'green')}
            </div>
        </div>
    );
}

const tradeArraySorter = (a: TradePriceArray, b: TradePriceArray) => {
    return a[2] > b[2] ? 1 : -1;
}

export default DepthOfMarket;
