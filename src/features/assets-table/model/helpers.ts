import {IExchangeToken} from "./types";
import $const from "@/shared/config/coins/constants";
import {storeListAllCryptoName} from "@/shared/store/crypto-assets";

export function tokenSorter(a: IExchangeToken, b: IExchangeToken): number {
    if (a.currency === $const.EURG) return -1;

    return a.name.localeCompare(b.name);
}

export function getTokensList(
    filter: string,
    excludedCurrencies: Array<string>
): IExchangeToken[] {
    const assets = storeListAllCryptoName(state => state.listAllCryptoName)
        .sort((a, b) => a.name.localeCompare(b.name));

    return assets.reduce(function(sortedAssets, asset) {
        if (excludedCurrencies.includes(asset.code)) return sortedAssets;

        if (filter.trim().length &&
            !(asset.code.toLowerCase().includes(filter.toLowerCase()) ||
            asset.name.toLowerCase().includes(filter.toLowerCase()))) {
            return sortedAssets;
        }

        sortedAssets.push({
            currency: asset.code,
            name: asset.name,
            roundTo: asset.round_prec
        })

        return sortedAssets;
    }, Array<IExchangeToken>());
}

export function getGridCols(keys: Array<string>): string {
    return keys.length === 2 ? 'grid-cols-2' :
        keys.length === 3 ? 'grid-cols-3' :
        'grid-cols-4';
}

export function getAlignment(array: Array<string>, key: string): string {
    return array.indexOf(key) === 0 ? 'justify-start' :
        array.indexOf(key) === array.length - 1 ? 'justify-end' :
        'justify-center';
}
