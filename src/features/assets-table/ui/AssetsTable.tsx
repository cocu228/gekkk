import Loader from '@/shared/ui/loader';
import styles from './style.module.scss';
import {apiGetRates} from "@/shared/api";
import Input from "@/shared/ui/input/Input";
import {useNavigate} from 'react-router-dom';
import Button from "@/shared/ui/button/Button";
import {evenOrOdd} from "@/shared/lib/helpers";
import $const from "@/shared/config/coins/constants";
import {IconCoin} from "@/shared/ui/icons/icon-coin";
import {useContext, useEffect, useState} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import {getAlignment, getTokensList, tokenSorter} from "../model/helpers";
import {AssetTableColumn, AssetTableKeys, IExchangeToken} from "../model/types";

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
    const {md} = useContext(BreakpointsContext);
    const [filter, setFilter] = useState<string>('');
    const [rates, setRates] = useState<Record<$const, number>>();
    const tokensList: Array<IExchangeToken> = getTokensList(filter, excludedCurrencies);

    useEffect(() => {
        (async () => {
            const {data} = (await apiGetRates());
            setRates(data);
        })();
    }, []);

    return (
        <div className={className}>
            <div className={`${md && 'mx-5'} mb-2`}>
                <Input
                    placeholder="Search name"
                    onChange={(e) => setFilter(e.target.value)}
                />

                <TableHead keys={columnKeys}/>
            </div>
            {!rates ? (
                <Loader className='relative mt-10'/>
            ) : (
                <div className={`${styles.ItemsList} ${modal ? `max-h-[550px]` : 'max-h-[1080px]'} overflow-[overlay]`}>
                    <TableGroup>
                        {tokensList.sort(tokenSorter).map((token, index) =>
                            <TableRow
                                index={index}
                                token={token}
                                rates={rates}
                                keys={columnKeys}
                                onSelect={onSelect}
                            />
                        )}
                    </TableGroup>
                </div>
            )}

            {!tokensList.length && (
                <div className="text-center text-gray-400 my-4">
                    {filter.trim().length ? `Token "${filter}" not found` : 'Tokens not found'}
                </div>
            )}
        </div>
    )
}

const TableGroup = ({children}) => {
    return (
        <div>
            {children}
        </div>
    )
}

const TableHead = ({keys}) => {
    return (
        <div
            className={`grid mt-4 items-center`}
            style={{
                gridTemplateColumns: `repeat(${keys.length}, minmax(0, 1fr))`
            }}
        >
            {keys.map((item: string, index: number) => (
                <div key={"TableHead" + index}
                     className={`flex ${getAlignment(keys, item)}`}>
                    <span className="text-gray-400 font-medium">{item}</span>
                </div>
            ))}
        </div>
    )
}

const TableRow = ({
    index,
    token,
    rates,
    keys,
    onSelect
}) => {
    const {md} = useContext(BreakpointsContext);
    const navigate = useNavigate();

    let columns: Array<AssetTableColumn> = [
        {
            key: AssetTableKeys.NAME,
            template: <>
                <div
                    className="flex items-center gap-3"
                >
                    <IconCoin width={29} height={29} code={token.currency}/>
                    <span>{(!md || keys.length === 2) ? token.name : token.currency}</span>
                </div>
            </>
        },
        {
            key: AssetTableKeys.CURRENCY,
            template: <>
                <div className="flex items-center">
                    <span>{token.currency}</span>
                </div>
            </>
        },
        {
            key: AssetTableKeys.PRICE,
            template: <>
                <span>{rates ? rates[token.currency].toFixed(2) : 0.00} €</span>
            </>
        },
        {
            key: AssetTableKeys.ACTIONS,
            template: <>
                <Button
                    size={"sm"}
                    gray
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/exchange/${token.currency}`)
                    }}
                >Buy</Button>
            </>
        }
    ]

    return (
        <div
            className={`grid ${styles.Item} ${!evenOrOdd(index) ? "bg-gray-main" : ""} font-medium hover:text-blue-300 hover:cursor-pointer`}
            onClick={() => onSelect(token)}
            style={{
                gridTemplateColumns: `repeat(${keys.length}, minmax(0, 1fr))`
            }}
        >
            {keys.map((key: string) => {
                return (
                    <div className={`flex items-center gap-3 ${getAlignment(keys, key)}`}>
                        {columns.find(col => col.key === key).template}
                    </div>
                )
            })}
        </div>
    )
}

export default AssetsTable;
