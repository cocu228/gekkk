import {actionSuccessConstructor} from "@/shared/lib/helpers";
import {IResTokenNetwork} from "@/shared/api";
import {TNetworksForSelector} from "@/widgets/wallet/model/types";
import {AxiosResponse} from "axios";

export const testGekkardAccount = (networksDefault: IResTokenNetwork[], networkIdSelect: number) => Array.isArray(networksDefault) && networksDefault.find(it => it.id === networkIdSelect)?.form_type === 3

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


export const sortingNetworksForSelector = function (networks: Array<IResTokenNetwork>): TNetworksForSelector | [] {
    return networks.map(it => ({
        value: it.id,
        label: `${it.contract_name === 'None' ? '' : `${it.contract_name} / `}
        ${!it.network_name ? '' : `${it.network_name} / `} ${it.token_name} (${it.token_symbol})`
    }))
}

// export const getAddressForChose = function (addresses: Array<IResListAddresses>, network: IResTokenNetwork): undefined | IResListAddresses {
//     return addresses.find(item => network.network_type.split(",").some(it => it === item.type_address))
// }

export const getNetworkForChose = function (networks: Array<IResTokenNetwork>, networkId: number): IResTokenNetwork {
    return networks?.find(it => it.id === networkId)
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


export const formTypeSelect = (networkType: number) => {
    const types = {
        requisites: [151, 152, 153, 154],
        crypto: [
            10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,

            //TEST NETWORKS
            200, 201, 202, 203, 204, 205, 206
        ],
        internal: [150]
    }

    console.log(networkType)


    for (let typeName in types) {
        if (types[typeName].includes(networkType)) {
            return typeName;
        }
    }

    return null;
}

export const TYPES_WALLET_FORM_UI = {

    topUp: {
        gekkardAccount: [150],
        fiat: [151, 152, 153, 154],
        swift: [151, 152, 153, 154],
        sepa: [151, 152, 153, 154],
        qr: [
            10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,

            //TEST NETWORKS
            200, 201, 202, 203, 204, 205, 206
        ]
    },
    withdraw: {
        gekkardAccount: [150],
        fiat: [151, 153, 154],
        swift: [152],
        cardToCard: [153],
        sepa: [151, 154],
        tokenForm: [
            10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
            //TEST NETWORKS
            200, 201, 202, 203, 204, 205, 206
        ]
    }
}
