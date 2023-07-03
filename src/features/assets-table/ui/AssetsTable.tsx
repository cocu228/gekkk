import styles from './style.module.scss';
import { apiGetRates } from "@/shared/api";
import Input from '@/shared/ui/input/Input';
import {useNavigate} from 'react-router-dom';
import GTable from '@/shared/ui/grid-table/';
import {getAlignment} from "../model/helpers";
import {AssetTableKeys} from "../model/types";
import Button from "@/shared/ui/button/Button";
import $const from "@/shared/config/coins/constants";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {CtxRootData, ICtxCurrencyData} from '@/app/CurrenciesContext';
import {useContext, useEffect, useMemo, useRef, useState} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import {CurrencyFlags, maskCurrencyFlags} from '@/shared/config/mask-currency-flags';
import {evenOrOdd, getCurrencyRounding, getFlagsFromMask, scrollToTop} from "@/shared/lib/helpers";

interface IParams {
    modal?: boolean,
    className?: string,
    balanceFilter?: boolean,
    allowedFlags?: Array<CurrencyFlags>,
    columnKeys: Array<AssetTableKeys>,
    blockedCurrencies?: Array<string>,
    onSelect?: (currency: string) => void
}

function searchTokenFilter (token: ICtxCurrencyData, searchValue: string) {
    return token.currency?.toLowerCase().includes(searchValue) ||
        token.name?.toLowerCase().includes(searchValue);
}

const AssetsTable = ({
    modal,
    balanceFilter,
    className = '',
    columnKeys = [],
    blockedCurrencies,
    allowedFlags,
    onSelect
}: IParams) => {
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const {md} = useContext(BreakpointsContext);
    const {currencies} = useContext(CtxRootData);
    const [searchValue, setSearchValue] = useState<string>('');
    const [rates, setRates] = useState<Record<$const, number>>(null);
    const [ratesLoading, setRatesLoading] = useState<boolean>(columnKeys.includes(AssetTableKeys.PRICE));

    useEffect(()=>{
      if (inputRef && inputRef.current && !md) {
        inputRef.current.focus();
      }
    });

    const assetsFilter = (asset: ICtxCurrencyData) => {
        if (balanceFilter && !asset.availableBalance?.greaterThan(0)) {
            return false;
        }
        
        if (allowedFlags) {
            const flags = getFlagsFromMask(asset.flags, maskCurrencyFlags);
            return Object.values(allowedFlags).some(f => flags[f]);
        }

        return true;
    }

    const tokensList = useMemo<ICtxCurrencyData[]>(() =>
        Array.from(currencies.values()).filter(assetsFilter),
        [currencies, blockedCurrencies, allowedFlags]
    );

    useEffect(() => {
        if (!ratesLoading) return;

        (async () => {
            const { data } = (await apiGetRates());
            setRates(data.result);
            setRatesLoading(false);
        })();
    }, []);

    return (
        <div className={className}>
            <div className={`${md && 'mx-5'} mb-2`}>
                <Input
                    allowClear
                    ref={inputRef}
                    placeholder="Search name"
                    onChange={(e) => {
                        setSearchValue(e.target.value.trim().toLowerCase());
                    }}
                />
            </div>

            <div style={{ maxHeight: modal ? 550 : 1080 }} className='mb-10'>
                <GTable>
                    <GTable.Head>
                        <GTable.Row>
                            {columnKeys.map((item: string) => (
                                <GTable.Col className={`flex ${getAlignment(columnKeys, item)} my-2`}>
                                    <span className="text-gray-400 font-medium">{item}</span>
                                </GTable.Col>
                            ))}
                        </GTable.Row>
                    </GTable.Head>
                    <GTable.Body loading={ratesLoading}
                                 className={`${styles.ItemsList} ${!ratesLoading && styles.Loaded}`}
                                 style={{maxHeight: modal ? 550 : 1080}}>
                        {tokensList
                            .filter((value) => searchTokenFilter(value, searchValue))
                            .map((token, index) => (
                            <GTable.Row
                                className={`
                                    grid
                                    ${styles.Item}
                                    ${blockedCurrencies?.includes(token.currency) ? styles.ItemBlocked : ''}
                                    ${!evenOrOdd(index) ? "bg-gray-main" : ""}
                                    min-h-[56px] md:min-h-[46px] font-medium hover:text-blue-300 hover:cursor-pointer gap-3`
                                }
                                onClick={() => onSelect(token.currency)}
                            >
                                {columnKeys.map((key: string) => (
                                    <GTable.Col className={`flex ${getAlignment(columnKeys, key)}`}>
                                        {key === AssetTableKeys.NAME && (
                                            <div className="flex items-center gap-3">
                                                <IconCoin height={29} className='max-h-[36px]' code={token.currency}/>
                                                <span>{(!md || columnKeys.length === 2) ? token.name : token.currency}</span>
                                            </div>
                                        )}

                                        {key === AssetTableKeys.CURRENCY && (
                                            <span>{token.currency}</span>
                                        )}

                                        {key === AssetTableKeys.PRICE && (
                                            <span>{!rates || rates[token.currency] === 0 ? "—" :
                                                `${getCurrencyRounding(rates[token.currency])} €`}</span>
                                        )}

                                        {key === AssetTableKeys.ACTIONS && (
                                            <Button
                                                size={"sm"}
                                                className='w-[60px]'
                                                gray
                                                onClick={(e) => {
                                                    scrollToTop();
                                                    e.stopPropagation();
                                                    navigate(`/exchange?to=${token.currency}`)
                                                }}
                                            >Buy</Button>
                                        )}
                                    </GTable.Col>
                                ))}
                            </GTable.Row>
                        ))}
                    </GTable.Body>
                </GTable>
            </div>

            {!ratesLoading && !tokensList.length && (
                <div className="text-center text-gray-400">
                    {searchValue.length ? `Token "${searchValue}" not found` : 'Tokens not found'}
                </div>
            )}
        </div>
    )
}

export default AssetsTable;
