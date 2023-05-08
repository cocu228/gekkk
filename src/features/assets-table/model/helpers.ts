import {IExchangeToken} from "./types";
import {IResMarketAsset} from "@/shared/api";
import $const from "@/shared/config/coins/constants";

export function getTokensList(
    assets: Array<IResMarketAsset>,
    excludedCurrencies: Array<string>
): IExchangeToken[] {

    const result = assets.reduce(function(sortedAssets, asset) {
        if (excludedCurrencies.includes(asset.code)) return sortedAssets;

        sortedAssets.push({
            currency: asset.code,
            name: asset.name,
            roundTo: asset.round_prec
        })

        return sortedAssets;
    }, Array<IExchangeToken>());

    return result.sort((a) => a.currency === $const.EURG ? -1 : 0);
}

export function getAlignment(array: Array<string>, key: string): string {
    return array.indexOf(key) === 0 ? 'md:ml-5 justify-start' :
        array.indexOf(key) === array.length - 1 ? 'md:mr-5 justify-end' :
        'justify-center';
}