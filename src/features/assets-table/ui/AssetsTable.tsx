import Decimal from "decimal.js";
import Loader from "@/shared/ui/loader";
import styles from './style.module.scss';
import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import { tokenSorter } from "../model/helpers";
import { IExchangeToken } from "../model/types";
import { evenOrOdd } from "@/shared/lib/helpers";
import $const from "@/shared/config/coins/constants";
import { IconCoin } from "@/shared/ui/icons/icon-coin";
import { useContext, useEffect, useState } from "react";
import { apiGetRates, IResMarketAssets } from "@/shared/api";
import { ISortedListBalance } from "@/shared/model/sorting-list-balance";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import { storeListAllCryptoName, storeListAvailableBalance } from "@/shared/store/crypto-assets";

export enum ExcludableColumns {
    PRICE = 'Price',
    BALANCE = 'Balance',
    ACTIONS = 'Actions'
}

interface Params {
    className?: string,
    excludedColumns?: Array<string>,
    excludedCurrencies?: Array<string>,
    onSelect?: (token: IExchangeToken) => void
}

function getTokensList(
    wallets: ISortedListBalance[],
    assets: IResMarketAssets[],
    filter: string,
    excludedCurrencies: Array<string>
): IExchangeToken[] {
    return assets.reduce(function(sortedAssets, asset) {
        if (excludedCurrencies.includes(asset.code)) return sortedAssets;

        if (filter.trim().length &&
            !(asset.code.toLowerCase().includes(filter.toLowerCase()) ||
            asset.name.toLowerCase().includes(filter.toLowerCase()))) {
            return sortedAssets;
        }

        const wallet = wallets.find(w => w.const === asset.code);

        sortedAssets.push({
            balance: wallet ? wallet?.availableBalance : new Decimal(0),
            currency: asset.code,
            name: asset.name,
            roundTo: asset.round_prec
        })

        return sortedAssets;
    }, Array<IExchangeToken>());
}

const AssetsTable = ({
    className = '',
    excludedColumns = [],
    excludedCurrencies = [],
    onSelect
}: Params) => {
    const {md} = useContext(BreakpointsContext);
    const [filter, setFilter] = useState<string>('');
    const [rates, setRates] = useState<Record<$const, number>>();

    const tableColumns = ['Name', ...Object.values(ExcludableColumns)]
        .filter(e => !excludedColumns.includes(e));

    useEffect(() => {
        (async () => {

            const rates = (await apiGetRates()).data;
            setRates(rates);

        })();
    }, []);

    const wallets = storeListAvailableBalance(state => state.sortedListBalance)
        .filter(w => w.availableBalance.comparedTo(0));

    const assets = storeListAllCryptoName(state => state.listAllCryptoName)
        .sort((a, b) => a.name.localeCompare(b.name));

    const tokensList: Array<IExchangeToken> = getTokensList(wallets, assets, filter, excludedCurrencies);

    return (
        <div className={`${className}`}>
            <Input
                className="mb-4"
                placeholder="Search name"
                onChange={(e) => setFilter(e.target.value)}
            />
            
            <TableHead items={tableColumns}/>

            {!rates || !tokensList && (
                <Loader/>
            )}

            <div className={`${styles.ItemsList} ${!md ? "max-h-[1080px] overflow-auto" : ""}`}>
                <TableGroup>
                    {tokensList.sort(tokenSorter).map((item, index) =>
                        <TableRow
                            tableColumns={tableColumns}
                            price={rates ? rates[item.currency].toFixed(2) : 0}
                            index={index}
                            balance={+item.balance.toFixed(item.roundTo)}
                            currency={item.currency}
                            name={item.name}
                            key={"TableRow" + index}
                            onSelect={onSelect}
                        />
                    )}
                </TableGroup>
            </div>

            {!tokensList.length && (
                <div className="text-center text-gray-400 mt-4">
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

const TableHead = ({items}) => {
    const firstCol = index => index === 0
    const lastCol = index => index === (items.length - 1)
    const setClassPosEdge = index => firstCol(index) ? "col-span-5" : lastCol(index) ? "col-span-3" : "col-span-2"

    return (
        <div className="row grid grid-cols-12 mb-2 items-center justify-start">
            {items.map((item, index) => (
                <div key={"TableHead" + index}
                     className={`col flex justify-center ${setClassPosEdge(index)}`}>
                    <span className="text-gray-400 font-medium">{item}</span>
                </div>
            ))}
        </div>
    )
}

const TableRow = ({
    name,
    index,
    price,
    onSelect,
    currency,
    tableColumns,
    balance
}) => {
    const {md} = useContext(BreakpointsContext);

    return (
        <div
            className={`row grid grid-cols-12 ${styles.Item} ${!evenOrOdd(index) ? "bg-gray-main" : ""} font-medium`}
            onClick={onSelect}
        >
            <div data-text={currency} className="col col-span-5 flex items-center gap-3  ellipsis">
                {!md && (
                    <IconCoin width={29} height={29} iconName={currency.toLowerCase().capitalize() + "Icon.svg"} coinName={currency}/>
                )}
                <span>{name}</span>
            </div>

            {tableColumns.includes(ExcludableColumns.PRICE) && (
                <div data-text={price} className="col col-span-2 flex items-center justify-center ellipsis">
                    <span>{price} €</span>
                </div>
            )}

            {tableColumns.includes(ExcludableColumns.BALANCE) && (
                <div data-text={`${balance} ${currency}`} className="col col-span-2 flex items-center justify-center ellipsis">
                    <span>{balance} {currency}</span>
                </div>
            )}

            {tableColumns.includes(ExcludableColumns.ACTIONS) && (
                <div className="col col-span-3 flex items-center justify-end gap-3">
                    <a className="ellipsis" data-text={"Receive"} href="">
                        <img width={14} height={14} src="/img/icon/Download.svg" alt="Download"/>
                    </a>
                    <a className="ellipsis" data-text={"Withdraw"} href="">
                        <img className="rotate-180" width={14} height={14} src="/img/icon/Download.svg" alt="Download"/>
                    </a>
                    <Button size={"sm"} gray>Buy</Button>
                </div>
            )}
        </div>
    )
}

export default AssetsTable;
