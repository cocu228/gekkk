import styles from './style.module.scss';
import Input from "@/shared/ui/input/Input";
import {useNavigate} from 'react-router-dom';
import {getAlignment, getAssetsRounding} from "../model/helpers";
import {AssetTableKeys} from "../model/types";
import Button from "@/shared/ui/button/Button";
import {evenOrOdd} from "@/shared/lib/helpers";
import $const from "@/shared/config/coins/constants";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import GTable from '@/shared/ui/grid-table/';
import {apiGetRates} from "@/shared/api";
import {useContext, useEffect, useMemo, useState} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import {CtxCurrencyData, ICtxCurrencyData} from '@/app/CurrenciesContext';

interface IParams {
    columnKeys: Array<AssetTableKeys>,
    modal?: boolean,
    className?: string,
    excludedCurrencies?: Array<string>,
    onSelect?: (currency: string) => void
}

const AssetsTable = ({
    onSelect,
    columnKeys = [],
    className = '',
    excludedCurrencies = [],
    modal
}: IParams) => {
    const navigate = useNavigate();
    let maxHeight = modal ? 550 : 1080;
    const { md } = useContext(BreakpointsContext);
    const [searchValue, setSearchValue] = useState<string>('');
    const [rates, setRates] = useState<Record<$const, number>>(null);
    const [ratesLoading, setRatesLoading] = useState<boolean>(columnKeys.includes(AssetTableKeys.PRICE));

    const {currencies} = useContext(CtxCurrencyData);

    const tokensList = useMemo<Array<ICtxCurrencyData>>(() =>
        Array.from(currencies.values())
            .filter(asset => !excludedCurrencies.includes(asset.currency)), [currencies, excludedCurrencies]);

    const filteredTokens = useMemo<Array<ICtxCurrencyData>>(() => (
        tokensList.filter((token) =>
            token.currency?.toLowerCase().includes(searchValue) ||
            token.name?.toLowerCase().includes(searchValue)
        )), [tokensList, searchValue]);

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
                    placeholder="Search name"
                    onChange={(e) => {
                        setSearchValue(e.target.value.trim().toLowerCase());
                    }}
                />
            </div>

            <div style={{ maxHeight: maxHeight }} className='mb-10'>
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
                                 style={{maxHeight: maxHeight}}>
                        {filteredTokens.map((token, index) => (
                            <GTable.Row
                                className={`grid ${styles.Item} ${!evenOrOdd(index) ? "bg-gray-main" : ""} min-h-[56px] md:min-h-[46px] font-medium hover:text-blue-300 hover:cursor-pointer gap-3`}
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
                                                `${getAssetsRounding(rates[token.currency])} €`}</span>
                                        )}

                                        {key === AssetTableKeys.ACTIONS && (
                                            <Button
                                                size={"sm"}
                                                className='w-[60px]'
                                                gray
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/exchange/${token.currency}`)
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

            {!filteredTokens.length && (
                <div className="text-center text-gray-400">
                    {searchValue.length ? `Token "${searchValue}" not found` : 'Tokens not found'}
                </div>
            )}
        </div>
    )
}

export default AssetsTable;
