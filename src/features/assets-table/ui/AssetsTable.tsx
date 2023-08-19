import styles from './style.module.scss';
import {apiGetRates} from "@/shared/api";
import Input from '@/shared/ui/input/Input';
import {useNavigate} from 'react-router-dom';
import GTable from '@/shared/ui/grid-table/';
import {getAlignment} from "../model/helpers";
import {AssetTableKeys} from "../model/types";
import Button from "@/shared/ui/button/Button";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import ETokensConst from "@/shared/config/coins/constants";
import {CurrencyFlags} from '@/shared/config/mask-currency-flags';
import {CtxRootData, ICtxCurrencyData} from '@/processes/RootContext';
import {useContext, useEffect, useMemo, useRef, useState} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import {evenOrOdd, getCurrencyRounding, scrollToTop} from "@/shared/lib/helpers";

interface IParams {
    modal?: boolean,
    className?: string,
    balanceFilter?: boolean,
    allowedFlags?: Array<CurrencyFlags>,
    columnKeys: Array<AssetTableKeys>,
    blockedCurrencies?: Array<string>,
    onSelect?: (currency: string) => void
}

function searchTokenFilter(currency: ICtxCurrencyData, searchValue: string) {
    return currency.$const?.toLowerCase().includes(searchValue) ||
        currency.name?.toLowerCase().includes(searchValue);
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
    const {lg, md} = useContext(BreakpointsContext);
    const {currencies} = useContext(CtxRootData);
    const [searchValue, setSearchValue] = useState<string>('');
    const [rates, setRates] = useState<Record<ETokensConst, number>>(null);
    const [ratesLoading, setRatesLoading] = useState<boolean>(columnKeys.includes(AssetTableKeys.PRICE));

    useEffect(()=>{
      if (inputRef && inputRef.current && !lg) {
        inputRef.current.focus();
      }
    });

    const assetsFilter = (asset: ICtxCurrencyData) => {
        if (balanceFilter && !asset.availableBalance?.greaterThan(0)) {
            return false;
        }
        
        if (allowedFlags) {
            return Object.values(allowedFlags).some(f => asset.flags[f]);
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
                            .map((currency, index) => (
                            <GTable.Row
                                className={`
                                    grid
                                    ${styles.Item}
                                    ${blockedCurrencies?.includes(currency.$const) ? styles.ItemBlocked : ''}
                                    ${!evenOrOdd(index) ? "bg-gray-main" : ""}
                                    min-h-[56px] lg:min-h-[46px] font-medium hover:text-blue-300 hover:cursor-pointer gap-3`
                                }
                                onClick={() => onSelect(currency.$const)}
                            >
                                {columnKeys.map((key: string) => (
                                    <GTable.Col className={`flex ${getAlignment(columnKeys, key)}`}>
                                        {key === AssetTableKeys.NAME && (
                                            <div className="flex items-center gap-3">
                                                <IconCoin height={29} className='max-h-[36px]' code={currency.$const}/>
                                                <span>{(!lg || columnKeys.length === 2) ? currency.name : currency.$const}</span>
                                            </div>
                                        )}

                                        {key === AssetTableKeys.CURRENCY && (
                                            <span>{currency.$const}</span>
                                        )}

                                        {key === AssetTableKeys.PRICE && (
                                            <span>{!rates || rates[currency.$const] === 0 ? "—" :
                                                `${getCurrencyRounding(rates[currency.$const])} €`}</span>
                                        )}

                                        {key === AssetTableKeys.ACTIONS && (
                                            <Button
                                                size={"sm"}
                                                className='w-[60px]'
                                                gray
                                                onClick={(e) => {
                                                    scrollToTop();
                                                    e.stopPropagation();
                                                    navigate(`/exchange?to=${currency.$const}`)
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
