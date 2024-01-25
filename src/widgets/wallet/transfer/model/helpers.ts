import {actionSuccessConstructor} from "@/shared/lib/helpers";
import {TNetworksForSelector} from "@/widgets/wallet/transfer/model/types";
import {AxiosResponse} from "axios";
import {TokensNetwork} from "@/shared/(orval)api/shared/model";

export const helperApiTokenNetworks = function (response: AxiosResponse) {
    const result = Array.isArray(response.data.result) &&
        response.data.result

    return actionSuccessConstructor.call(result, typeof Array.isArray(result))
}

export const helperApiListAddresses = function (response: AxiosResponse) {

    const isEmpty = response.data.result.length === 0

    const result = isEmpty ? undefined : response.data.result[0]?.address

    return actionSuccessConstructor.call(result, typeof Array.isArray(response.data.result))
}


export const sortingNetworksForSelector = function (networks: Array<TokensNetwork>): TNetworksForSelector | [] {
    return networks.map(it => ({
        value: it.network_type,
        label: `${it.contract_name === 'Base' ? '' : `${it.contract_name} / `}
        ${!it.network_name ? '' : `${it.network_name} / `} ${it.token_name} ${!it.token_symbol ? '' : `(${it.token_symbol})`}`
    }));
}

// export const getAddressForChose = function (addresses: Array<IResListAddresses>, network: IResTokenNetwork): undefined | IResListAddresses {
//     return addresses.find(item => network.network_type.split(",").some(it => it === item.type_address))
// }

export const getChosenNetwork = function (networks: Array<TokensNetwork>, networkType: number): TokensNetwork {
    return networks?.find(it => it.network_type === networkType);
}


// Блокчейны
// Bitcoin = 10,
// Ethereum = 11,
// Monero = 12,
// Tron = 13,
// BNB_Chain = 14,
// Litecoin = 15,
// Chia = 16,
// Ripple = 17,
// EOS = 18,
// Solana = 19,
// Stellar = 20,
// NEO = 21,
// Dogecoin = 22,
//
// // Биржи
// Binance = 100,
// Kraken = 101,
// WhiteBit = 102,
// Bitfinex = 103,
// Poloniex = 104,
// Exmo = 105,
// Yobit = 106,
// Coinbase = 107,
// Huobi = 108,
// Hitbtc = 109,
// Btse = 110,
//
// // Банки
// PapayaIBAN = 150,
// Sepa = 151,
// Swift = 152,
// CardToCard = 153,
// CryptoWallet = 154,
//
// //Тестовые сети
// EthereumTest = 200,
// EthereumGoerli = 201,
// BNB_ChainTestnet = 202,
// TronShasta = 203,
// BitcoinTest = 204,
// MoneroTest = 205,
// EthereumSepolia = 206
export function isCryptoNetwork(networkType: number): boolean {
    return (networkType >= 10 && networkType < 23)
        || (networkType >= 200 && networkType <= 223);
}
