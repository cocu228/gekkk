import styles from './style.module.scss';
import {apiGetRates} from "@/shared/api";
import Input from "@/shared/ui/input/Input";
import {useNavigate} from 'react-router-dom';
import Button from "@/shared/ui/button/Button";
import {evenOrOdd} from "@/shared/lib/helpers";
import $const from "@/shared/config/coins/constants";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {GTable} from '@/shared/ui/grid-table/GTable';
import {GTRow} from '@/shared/ui/grid-table/table-row/GTRow';
import {getAlignment, getTokensList} from "../model/helpers";
import {AssetTableKeys, IExchangeToken} from "../model/types";
import {useContext, useEffect, useMemo, useState} from "react";
import {GTCol} from '@/shared/ui/grid-table/table-column/GTCol';
import {GTHead} from '@/shared/ui/grid-table/table-head/GTHead';
import {GTBody} from '@/shared/ui/grid-table/table-body/GTBody';
import {storeListAllCryptoName} from '@/shared/store/crypto-assets';
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";

interface IParams {
    className?: string,
    columnKeys?: Array<AssetTableKeys>,
    excludedCurrencies?: Array<string>,
    modal?: boolean,
    onSelect?: (token: IExchangeToken) => void
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
    const {md} = useContext(BreakpointsContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchValue, setSearchValue] = useState<string>('');
    const [rates, setRates] = useState<Record<$const, number>>();
    const assets = storeListAllCryptoName(state => state.listAllCryptoName)
        .sort((a, b) => a.name.localeCompare(b.name));

    const tokensList = useMemo<Array<IExchangeToken>>(() =>
        getTokensList(assets, excludedCurrencies), [assets]);

    const filteredTokens = useMemo<Array<IExchangeToken>>(() => {
        return tokensList.filter((token) =>
            token.currency.toLowerCase().includes(searchValue) ||
            token.name.toLowerCase().includes(searchValue)
        );
    }, [searchValue]);

    useEffect(() => {
        (async () => {
            const {data} = (await apiGetRates());
            setRates(data.result);
            setLoading(false);
        })();
    }, []);

    return (
        <div className={className}>
            <div className={`${md && 'mx-5'} mb-2`}>
                <Input
                    placeholder="Search name"
                    onChange={(e) => {
                        setSearchValue(e.target.value.trim().toLowerCase());
                    }}
                />
            </div>

            <div style={{maxHeight: maxHeight}} className='mb-10'>
                <GTable>
                    <GTHead>
                        <GTRow>
                            {columnKeys.map((item: string) => (
                                <GTCol className={`flex ${getAlignment(columnKeys, item)} my-2`}>
                                    <span className="text-gray-400 font-medium">{item}</span>
                                </GTCol>
                            ))}
                        </GTRow>
                    </GTHead>
                    <GTBody loading={loading} className={styles.ItemsList} style={{maxHeight: maxHeight}}>
                        {filteredTokens.map((token, index) => (
                            <GTRow
                                className={`grid ${styles.Item} ${!evenOrOdd(index) ? "bg-gray-main" : ""} min-h-[56px] font-medium hover:text-blue-300 hover:cursor-pointer gap-3`}
                                onClick={() => onSelect(token)}
                            >
                                {columnKeys.map((key: string) => (
                                    <GTCol className={`flex ${getAlignment(columnKeys, key)}`}>
                                        {key === AssetTableKeys.NAME && (
                                            <div className="flex items-center gap-3">
                                                <IconCoin width={29} height={29} code={token.currency}/>
                                                <span>{(!md || columnKeys.length === 2) ? token.name : token.currency}</span>
                                            </div>
                                        )}

                                        {key === AssetTableKeys.CURRENCY && (
                                            <span>{token.currency}</span>
                                        )}

                                        {key === AssetTableKeys.PRICE && (
                                            <span>{rates ? rates[token.currency].toFixed(2) : 0.00} €</span>
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
                                    </GTCol>
                                ))}
                            </GTRow>
                        ))}
                    </GTBody>
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