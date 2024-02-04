/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Gekcore broker API
 * Generic electronic key multi-cryptocurrency broker wallet platform with a built-in exchange.<br/>
                    Build version 2.0.3-20240131-1134.6014+fe39a7223f04358cae814e56f02cf607fc156ef3<br/><br/>
                    Данные ответов всех API содержаться в поле <b>result</b> JSON-RPC формата.<br/>
                    http ответ сервера всегда имеет код <b>200(OK)</b>, если обработка запроса прошла в штатном режиме.<br/>
                    В случае предсказуемых/обработанных ошибок, поле <b>error</b> содержит код(<b>code</b>) и описание(<b>message</b>) ошибки.<br/>
                    Поле <b>id</b> - используется для проброса идентификатора(<b>nonce</b>) запроса в некоторых критичных сценариях для исключения возможных повторов.<br/><br/>
                    <b>Полный список кодов ошибок(в самих API могут быть не указаны):</b><br/><b>10001</b> - Wallet not found<br/><b>10002</b> - There is no client with that external_id in the system<br/><b>10003</b> - The wallet is blocked by the bank. Please, contact the bank's support<br/><b>10004</b> - Limiting the maximum number of wallet addresses per network type<br/><b>10005</b> - The account is not in the system<br/><b>10006</b> - Imposible to transfer to the same account<br/><b>10007</b> - Balance not enough<br/><b>10008</b> - Token network not found<br/><b>10009</b> - Room not found<br/><b>10010</b> - Order not found<br/><b>10011</b> - Error cancelling the order<br/><b>10012</b> - Error creating the order<br/><b>10013</b> - Amount must be more than zero<br/><b>10014</b> - The amount is invalid<br/><b>10015</b> - The rate is invalid<br/><b>10016</b> - Error performing transaction<br/><b>10017</b> - Error updating transaction<br/><b>10018</b> - Transaction not found<br/><b>10019</b> - Error cancelling transaction<br/><b>10020</b> - Error creating transaction<br/><b>10021</b> - Transaction for the wallet not found<br/><b>10022</b> - The code has expiredThe code not found<br/><b>10023</b> - Unknown problem<br/><b>10024</b> - The code has been already used<br/><b>10025</b> - Error updating room info<br/><b>10026</b> - Currency not found<br/><b>10027</b> - Code type not supported<br/><b>10028</b> - Invalid assets<br/><b>10029</b> - Key not found<br/><b>10030</b> - Request contains no content<br/><b>10031</b> - Couldn't add session data<br/><b>10032</b> - The address is wrong<br/><b>10033</b> - Couldn't sent transaction to self<br/><b>10034</b> - Internat transfer error<br/><b>10035</b> - The address is within the system but the option auto_inner_transfer is not enabled <br/><b>10036</b> - Bad address<br/><b>10037</b> - Unknown query result<br/><b>10038</b> - The amount is less than minimal allowed for the network<br/><b>10039</b> - The amount is more than maximal allowed for the network<br/><b>10040</b> - The fee is out of date, please try again<br/><b>10041</b> - Not found address transact<br/><b>10042</b> - Amount is more than allowed on this network<br/><b>10043</b> - Withdraw is not allowed on this network<br/><b>10044</b> - Can not withdraw on this network<br/><b>10045</b> - Wallet is deleted<br/><b>10046</b> - Wallet login denied<br/><b>10047</b> - Not found session data<br/><b>10048</b> - Not found template for deposit<br/><b>10049</b> - Can not be exchanged between same currencies<br/><b>10050</b> - empty type_network<br/><b>10051</b> - compeleted address_transact block_num > transact_list.CompliteBlock<br/><b>10052</b> - empty contract_id<br/><b>10053</b> - tx_id is empty<br/><b>10054</b> - The code is invalid<br/><b>10055</b> - Can't open investments linked to that currency<br/><b>10056</b> - Investment not found<br/><b>10057</b> - Investment term is less than the minimum<br/><b>10058</b> - Investment term is more than the maximum<br/><b>10059</b> - Error while creating wallet, try again or contact support<br/><b>10060</b> - Private room creation limit exceeded<br/><b>10061</b> - Room alredy exists<br/><b>10062</b> - Operation forbidden<br/><b>10063</b> - The referral must not be his own agent<br/><b>10064</b> - The code does not match the confirmation code<br/><b>10065</b> - Authentication token has expired<br/><b>10066</b> - Invalid auth token<br/><b>10067</b> - Invalid audience<br/><b>10068</b> - Auth tokent not provided<br/><b>10069</b> - Phone number not provided<br/><b>10070</b> - Invalid issuer<br/><b>10071</b> - income_push_block error<br/><b>10072</b> - Phone number is empty<br/><b>10073</b> - Error sending code<br/><b>10074</b> - Confirmation code is empty<br/><b>10075</b> - Timetick of confirmed transaction is incorrect<br/><b>10076</b> - Transaction has empty From or To<br/><b>10077</b> - Investment amount is less than minimal<br/><b>10078</b> - The reference number is incorrect<br/><b>10079</b> - Unknown problem<br/><b>10080</b> - The string contains unsupported characters<br/><b>10081</b> - Invalid UAS token<br/><b>10082</b> - Fiat tokens are prohibited for internal transfer
 * OpenAPI spec version: v1
 */
import type {
  AddressTxOutApiResponse,
  ApiResponse,
  CardIListApiResponse,
  ClientDetailsApiResponse,
  ClientProgramIListApiResponse,
  CreateTransferIn,
  CreateTxCodeIn,
  CreateWithdrawIn,
  CreateWithdrawOutApiResponse,
  CurrencysOutListApiResponse,
  FastCloseDepositOutApiResponse,
  GetBalanceOutListApiResponse,
  GetDepositOutApiResponse,
  GetDepositOutListApiResponse,
  GetGekV1AddressTxInfoParams,
  GetGekV1AssetsParams,
  GetGekV1BankGetCardsParams,
  GetGekV1CodeTxInfoParams,
  GetGekV1InvestGetInvestmentsParams,
  GetGekV1ListTxCodesParams,
  GetGekV1MarketGetOrdersParams,
  GetGekV1MarketGetRatesParams,
  GetGekV1MarketGetTradeInfoParams,
  GetGekV1TokensNetworksParams,
  GetGekV1WalletCreateAddressParams,
  GetGekV1WalletGetBalanceParams,
  GetGekV1WalletGetHistoryTransactionsParams,
  GetGekV1WalletGetInfoParams,
  GetGekV1WalletListAddressesParams,
  GetHistoryTrasactionOutListApiResponse,
  GetOrderListOutApiResponse,
  GetOrderListOutListApiResponse,
  GetTradeInfoOutApiResponse,
  NewOrderInfo,
  NewRoomInfo,
  ObjectApiResponse,
  PostGekV1ApplyCodeParams,
  PostGekV1CancelCodeParams,
  PostGekV1InvestCreateInvestmentParams,
  PostGekV1InvestReturnInvestmentParams,
  PostGekV1MarketCancelOrderParams,
  PostGekV1MarketCloseRoomParams,
  PostGekV1WalletCreateWithdrawParams,
  PostGekV1WalletInternalTransferParams,
  PostPubV1AuthParams,
  ReferralOutApiResponse,
  RoomInfoApiResponse,
  RoomInfoListApiResponse,
  SessionDataDTO,
  StringApiResponse,
  StringDecimalDictionaryApiResponse,
  TokensNetworkArrayApiResponse,
  TxCodesOutApiResponse,
  TxCodesOutListApiResponse,
  UpdateTxPartnerInfoIn,
  WalletAddressOutApiResponse,
  WalletAddressOutListApiResponse,
  WalletInfoListApiResponse
} from './model'
import getGekV1BankClientDetailsMutator from '../../lib/(orval)axios';
import getGekV1BankGetCardsMutator from '../../lib/(orval)axios';
import getGekV1BankGetProgramsMutator from '../../lib/(orval)axios';
import getGekV1TokensNetworksMutator from '../../lib/(orval)axios';
import postGekV1ApplyCodeMutator from '../../lib/(orval)axios';
import postGekV1CancelCodeMutator from '../../lib/(orval)axios';
import postGekV1CreateTxCodeMutator from '../../lib/(orval)axios';
import getGekV1ListTxCodesMutator from '../../lib/(orval)axios';
import getGekV1CodeTxInfoMutator from '../../lib/(orval)axios';
import getGekV1AddressTxInfoMutator from '../../lib/(orval)axios';
import getGekV1AssetsMutator from '../../lib/(orval)axios';
import getGekV1InvestGetInvestmentsMutator from '../../lib/(orval)axios';
import postGekV1InvestCreateInvestmentMutator from '../../lib/(orval)axios';
import postGekV1InvestReturnInvestmentMutator from '../../lib/(orval)axios';
import getGekV1MarketGetRatesMutator from '../../lib/(orval)axios';
import getGekV1MarketGetTradeInfoMutator from '../../lib/(orval)axios';
import getGekV1MarketGetOrdersMutator from '../../lib/(orval)axios';
import postGekV1MarketCreateOrderMutator from '../../lib/(orval)axios';
import postGekV1MarketCancelOrderMutator from '../../lib/(orval)axios';
import getGekV1MarketListRoomsMutator from '../../lib/(orval)axios';
import postGekV1MarketCreateRoomMutator from '../../lib/(orval)axios';
import postGekV1MarketCloseRoomMutator from '../../lib/(orval)axios';
import postPubV1AuthMutator from '../../lib/(orval)axios';
import getGekV1ReferralGetReferralsMutator from '../../lib/(orval)axios';
import getGekV1ReferralGetAgentCodeMutator from '../../lib/(orval)axios';
import getGekV1ReferralGetReferralInvestmentsMutator from '../../lib/(orval)axios';
import getGekV1WalletGetInfoMutator from '../../lib/(orval)axios';
import getGekV1WalletGetBalanceMutator from '../../lib/(orval)axios';
import getGekV1WalletCreateAddressMutator from '../../lib/(orval)axios';
import getGekV1WalletListAddressesMutator from '../../lib/(orval)axios';
import postGekV1WalletInternalTransferMutator from '../../lib/(orval)axios';
import postGekV1WalletCreateWithdrawMutator from '../../lib/(orval)axios';
import postGekV1WalletUpdateTxPartnerInfoMutator from '../../lib/(orval)axios';
import getGekV1WalletGetHistoryTransactionsMutator from '../../lib/(orval)axios';



// eslint-disable-next-line
  type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P,
) => any
  ? P
  : never;


  export const apiBankClientDetails = (
    
 options?: SecondParameter<typeof getGekV1BankClientDetailsMutator>,) => {
      return getGekV1BankClientDetailsMutator<ClientDetailsApiResponse>(
      {url: `/gek/v1/bank/client_details`, method: 'get'
    },
      options);
    }
  
/**
 * @summary Получить банковские карты клиента, привязанные к IBAN счету кошелька
 */
export const apiBankGetCards = (
    params?: GetGekV1BankGetCardsParams,
 options?: SecondParameter<typeof getGekV1BankGetCardsMutator>,) => {
      return getGekV1BankGetCardsMutator<CardIListApiResponse>(
      {url: `/gek/v1/bank/get_cards`, method: 'get',
        params
    },
      options);
    }
  
/**
 * @summary Получить программы клиента, привязанные к IBAN счету
 */
export const apiBankGetPrograms = (
    
 options?: SecondParameter<typeof getGekV1BankGetProgramsMutator>,) => {
      return getGekV1BankGetProgramsMutator<ClientProgramIListApiResponse>(
      {url: `/gek/v1/bank/get_programs`, method: 'get'
    },
      options);
    }
  
/**
 * @summary Получение информации по транспортным сетям для криптовалют
 */
export const apiTokensNetworks = (
    params?: GetGekV1TokensNetworksParams,
 options?: SecondParameter<typeof getGekV1TokensNetworksMutator>,) => {
      return getGekV1TokensNetworksMutator<TokensNetworkArrayApiResponse>(
      {url: `/gek/v1/tokens_networks`, method: 'get',
        params
    },
      options);
    }
  
/**
 * @summary Обрабатывает/применяет текстовый код
 */
export const apiApplyCode = (
    params?: PostGekV1ApplyCodeParams,
 options?: SecondParameter<typeof postGekV1ApplyCodeMutator>,) => {
      return postGekV1ApplyCodeMutator<ApiResponse>(
      {url: `/gek/v1/apply_code`, method: 'post',
        params
    },
      options);
    }
  
/**
 * @summary Обрабатывает/отменяет код
 */
export const apiCancelCode = (
    params?: PostGekV1CancelCodeParams,
 options?: SecondParameter<typeof postGekV1CancelCodeMutator>,) => {
      return postGekV1CancelCodeMutator<ApiResponse>(
      {url: `/gek/v1/cancel_code`, method: 'post',
        params
    },
      options);
    }
  
/**
 * @summary Создание кода для внутренних переводов средств
 */
export const apiCreateTxCode = (
    createTxCodeIn: CreateTxCodeIn,
 options?: SecondParameter<typeof postGekV1CreateTxCodeMutator>,) => {
      return postGekV1CreateTxCodeMutator<TxCodesOutApiResponse>(
      {url: `/gek/v1/create_tx_code`, method: 'post',
      headers: {'Content-Type': 'application/json', },
      data: createTxCodeIn
    },
      options);
    }
  
/**
 * @summary Получение списка ожидающих транзакций с кодами
 */
export const apiListTxCodes = (
    params?: GetGekV1ListTxCodesParams,
 options?: SecondParameter<typeof getGekV1ListTxCodesMutator>,) => {
      return getGekV1ListTxCodesMutator<TxCodesOutListApiResponse>(
      {url: `/gek/v1/list_tx_codes`, method: 'get',
        params
    },
      options);
    }
  
/**
 * @summary Получение информации из передаваемого кода
 */
export const apiCodeTxInfo = (
    params?: GetGekV1CodeTxInfoParams,
 options?: SecondParameter<typeof getGekV1CodeTxInfoMutator>,) => {
      return getGekV1CodeTxInfoMutator<TxCodesOutApiResponse>(
      {url: `/gek/v1/code_tx_info`, method: 'get',
        params
    },
      options);
    }
  
/**
 * @summary Получение информации об адресной транзакции по внутреннему идентификатору клиентской транзакции
 */
export const apiAddressTxInfo = (
    params?: GetGekV1AddressTxInfoParams,
 options?: SecondParameter<typeof getGekV1AddressTxInfoMutator>,) => {
      return getGekV1AddressTxInfoMutator<AddressTxOutApiResponse>(
      {url: `/gek/v1/address_tx_info`, method: 'get',
        params
    },
      options);
    }
  
/**
 * @summary Получение информации по активам
 */
export const apiAssets = (
    params?: GetGekV1AssetsParams,
 options?: SecondParameter<typeof getGekV1AssetsMutator>,) => {
      return getGekV1AssetsMutator<CurrencysOutListApiResponse>(
      {url: `/gek/v1/assets`, method: 'get',
        params
    },
      options);
    }
  
/**
 * Загружает активные продукты, если не задано ни одной даты.
Если хотябы одна дата задана - то выборка из истории инвест продуктов по дате открытия.
 * @summary Инвестиционные продукты клиента (депозиты)
 */
export const apiGetInvestments = (
    params?: GetGekV1InvestGetInvestmentsParams,
 options?: SecondParameter<typeof getGekV1InvestGetInvestmentsMutator>,) => {
      return getGekV1InvestGetInvestmentsMutator<GetDepositOutListApiResponse>(
      {url: `/gek/v1/invest/get_investments`, method: 'get',
        params
    },
      options);
    }
  
/**
 * @summary Открытие депозита
 */
export const apiCreateInvestment = (
    params?: PostGekV1InvestCreateInvestmentParams,
 options?: SecondParameter<typeof postGekV1InvestCreateInvestmentMutator>,) => {
      return postGekV1InvestCreateInvestmentMutator<GetDepositOutApiResponse>(
      {url: `/gek/v1/invest/create_investment`, method: 'post',
        params
    },
      options);
    }
  
/**
 * @summary Досрочное закрытие депозита
 */
export const apiReturnInvestment = (
    params?: PostGekV1InvestReturnInvestmentParams,
 options?: SecondParameter<typeof postGekV1InvestReturnInvestmentMutator>,) => {
      return postGekV1InvestReturnInvestmentMutator<FastCloseDepositOutApiResponse>(
      {url: `/gek/v1/invest/return_investment`, method: 'post',
        params
    },
      options);
    }
  
/**
 * Курсы загружаются с внешних бирж и представляют собой среднее между предложением и спросом.
Если нет прямого обмена, то высчитываются через кросс курсы через USDT или BTC.
 * @summary Курсы криптовалют, для пересчета криптовалют и стуктурных депозитов
 */
export const apiGetRates = (
    params: GetGekV1MarketGetRatesParams,
 options?: SecondParameter<typeof getGekV1MarketGetRatesMutator>,) => {
      return getGekV1MarketGetRatesMutator<StringDecimalDictionaryApiResponse>(
      {url: `/gek/v1/market/get_rates`, method: 'get',
        params
    },
      options);
    }
  
/**
 * @summary Информация о направлении торговли
 */
export const apiGetTradeInfo = (
    params?: GetGekV1MarketGetTradeInfoParams,
 options?: SecondParameter<typeof getGekV1MarketGetTradeInfoMutator>,) => {
      return getGekV1MarketGetTradeInfoMutator<GetTradeInfoOutApiResponse>(
      {url: `/gek/v1/market/get_trade_info`, method: 'get',
        params
    },
      options);
    }
  
/**
 * @summary Список ордеров кошелька. Не более 100 за запрос
 */
export const apiGetOrders = (
    params?: GetGekV1MarketGetOrdersParams,
 options?: SecondParameter<typeof getGekV1MarketGetOrdersMutator>,) => {
      return getGekV1MarketGetOrdersMutator<GetOrderListOutListApiResponse>(
      {url: `/gek/v1/market/get_orders`, method: 'get',
        params
    },
      options);
    }
  
/**
 * @summary Создание нового ордера
 */
export const apiCreateOrder = (
    newOrderInfo: NewOrderInfo,
 options?: SecondParameter<typeof postGekV1MarketCreateOrderMutator>,) => {
      return postGekV1MarketCreateOrderMutator<GetOrderListOutApiResponse>(
      {url: `/gek/v1/market/create_order`, method: 'post',
      headers: {'Content-Type': 'application/json', },
      data: newOrderInfo
    },
      options);
    }
  
/**
 * @summary Отмена ордера
 */
export const apiCancelOrder = (
    params?: PostGekV1MarketCancelOrderParams,
 options?: SecondParameter<typeof postGekV1MarketCancelOrderMutator>,) => {
      return postGekV1MarketCancelOrderMutator<ApiResponse>(
      {url: `/gek/v1/market/cancel_order`, method: 'post',
        params
    },
      options);
    }
  
/**
 * @summary Список приватных комнат обмена, доступных клиенту
 */
export const apiListRooms = (
    
 options?: SecondParameter<typeof getGekV1MarketListRoomsMutator>,) => {
      return getGekV1MarketListRoomsMutator<RoomInfoListApiResponse>(
      {url: `/gek/v1/market/list_rooms`, method: 'get'
    },
      options);
    }
  
/**
 * @summary Создание персональной комнаты обмена. Присоединение к комнате через общую функцию применения кода apply_code.
 */
export const apiCreateRoom = (
    newRoomInfo: NewRoomInfo,
 options?: SecondParameter<typeof postGekV1MarketCreateRoomMutator>,) => {
      return postGekV1MarketCreateRoomMutator<RoomInfoApiResponse>(
      {url: `/gek/v1/market/create_room`, method: 'post',
      headers: {'Content-Type': 'application/json', },
      data: newRoomInfo
    },
      options);
    }
  
/**
 * @summary Закрывает комнату обмена. 
Если пользователь участник - выходит из комнаты, 
если владелец - удаляет комнату и отменяет все ордеры всех клиентов созданные в данной комнате
 */
export const apiCloseRoom = (
    params?: PostGekV1MarketCloseRoomParams,
 options?: SecondParameter<typeof postGekV1MarketCloseRoomMutator>,) => {
      return postGekV1MarketCloseRoomMutator<ApiResponse>(
      {url: `/gek/v1/market/close_room`, method: 'post',
        params
    },
      options);
    }
  
/**
 * Если ключ не задан, он генерируется и возвращается.
Если ключ задан в запросе, то возвращаются данные и удаляются из хранилища.
Если задан ключ и данные, то данные записываются.
 * @summary Передача данных сессии между связанными приложениями, чтобы избежать повторной аутентификации.
 */
export const apiPubV1Auth = (
    sessionDataDTO: SessionDataDTO,
    params?: PostPubV1AuthParams,
 options?: SecondParameter<typeof postPubV1AuthMutator>,) => {
      return postPubV1AuthMutator<ObjectApiResponse | void>(
      {url: `/pub/v1/auth`, method: 'post',
      headers: {'Content-Type': 'application/json', },
      data: sessionDataDTO,
        params
    },
      options);
    }
  
/**
 * Error codes:
(1) - Client not found - The client_id in the header is not found in the database.
 * @summary Партнерская программа / рефералы
 */
export const apiGetReferrals = (
    
 options?: SecondParameter<typeof getGekV1ReferralGetReferralsMutator>,) => {
      return getGekV1ReferralGetReferralsMutator<ReferralOutApiResponse>(
      {url: `/gek/v1/referral/get_referrals`, method: 'get'
    },
      options);
    }
  
/**
 * @summary Партнерская программа / агентский код
 */
export const apiGetAgentCode = (
    
 options?: SecondParameter<typeof getGekV1ReferralGetAgentCodeMutator>,) => {
      return getGekV1ReferralGetAgentCodeMutator<StringApiResponse>(
      {url: `/gek/v1/referral/get_agent_code`, method: 'get'
    },
      options);
    }
  
/**
 * @summary Партнерская программа / информация(выплаты) по реферальным инвестициям
 */
export const apiGetReferralInvestments = (
    
 options?: SecondParameter<typeof getGekV1ReferralGetReferralInvestmentsMutator>,) => {
      return getGekV1ReferralGetReferralInvestmentsMutator<ReferralOutApiResponse>(
      {url: `/gek/v1/referral/get_referral_investments`, method: 'get'
    },
      options);
    }
  
/**
 * @summary Информация о кошельке клиента.
 */
export const apiGetInfo = (
    params?: GetGekV1WalletGetInfoParams,
 options?: SecondParameter<typeof getGekV1WalletGetInfoMutator>,) => {
      return getGekV1WalletGetInfoMutator<WalletInfoListApiResponse>(
      {url: `/gek/v1/wallet/get_info`, method: 'get',
        params
    },
      options);
    }
  
/**
 * @summary Балансы кошелька
 */
export const apiGetBalance = (
    params?: GetGekV1WalletGetBalanceParams,
 options?: SecondParameter<typeof getGekV1WalletGetBalanceMutator>,) => {
      return getGekV1WalletGetBalanceMutator<GetBalanceOutListApiResponse>(
      {url: `/gek/v1/wallet/get_balance`, method: 'get',
        params
    },
      options);
    }
  
/**
 * @summary Создание адреса кошелька
 */
export const apiCreateAddress = (
    params?: GetGekV1WalletCreateAddressParams,
 options?: SecondParameter<typeof getGekV1WalletCreateAddressMutator>,) => {
      return getGekV1WalletCreateAddressMutator<WalletAddressOutApiResponse>(
      {url: `/gek/v1/wallet/create_address`, method: 'get',
        params
    },
      options);
    }
  
/**
 * @summary Список адресов кошелька для сети ввода-вывода
 */
export const apiListAddresses = (
    params?: GetGekV1WalletListAddressesParams,
 options?: SecondParameter<typeof getGekV1WalletListAddressesMutator>,) => {
      return getGekV1WalletListAddressesMutator<WalletAddressOutListApiResponse>(
      {url: `/gek/v1/wallet/list_addresses`, method: 'get',
        params
    },
      options);
    }
  
export const apiInternalTransfer = (
    createTransferIn: CreateTransferIn,
    params?: PostGekV1WalletInternalTransferParams,
 options?: SecondParameter<typeof postGekV1WalletInternalTransferMutator>,) => {
      return postGekV1WalletInternalTransferMutator<CreateWithdrawOutApiResponse>(
      {url: `/gek/v1/wallet/internal_transfer`, method: 'post',
      headers: {'Content-Type': 'application/json', },
      data: createTransferIn,
        params
    },
      options);
    }
  
/**
 * @summary Создание заявки на вывод средств с кошелька клиента.
Если целевой адрес найден среди внутренних адресов и задано разрешение, то преобразуется во внутренний перевод (комиссии могут отличаться).
При выводе на внешние кошельки генерируется и высылается код на номер телефона, действующий в течении минуты. 
В возврате будет указаны txId, confirmationStatusCode и его строковое представление confirmationStatusText.
confirmationCode указывает на статус подтверждения транзакции (необходимо подтвердить смс кодом, пином или статус подтвержден)
txId - идентификатор транзакции, который нужно выслать для подтверждения в качестве параметра confirmationTimetick.
confirmationCode - код подтверждения от пользователя.
 */
export const apiCreateWithdraw = (
    createWithdrawIn: CreateWithdrawIn,
    params?: PostGekV1WalletCreateWithdrawParams,
 options?: SecondParameter<typeof postGekV1WalletCreateWithdrawMutator>,) => {
      return postGekV1WalletCreateWithdrawMutator<CreateWithdrawOutApiResponse>(
      {url: `/gek/v1/wallet/create_withdraw`, method: 'post',
      headers: {'Content-Type': 'application/json', },
      data: createWithdrawIn,
        params
    },
      options);
    }
  
/**
 * @summary Обновляет данные об отправителе для транзакции
 */
export const apiUpdateTxPartnerInfo = (
    updateTxPartnerInfoIn: UpdateTxPartnerInfoIn,
 options?: SecondParameter<typeof postGekV1WalletUpdateTxPartnerInfoMutator>,) => {
      return postGekV1WalletUpdateTxPartnerInfoMutator<StringApiResponse>(
      {url: `/gek/v1/wallet/update_tx_partner_info`, method: 'post',
      headers: {'Content-Type': 'application/json', },
      data: updateTxPartnerInfoIn
    },
      options);
    }
  
/**
 * @summary История транзакций кошелька в заданном временном промежутке или условиях фильтрации. Не более 100 за запрос.
Для схемы с ленивой загрузкой отправлять from_tx_id из последней партии транзакции
 */
export const apiGetHistoryTransactions = (
    params?: GetGekV1WalletGetHistoryTransactionsParams,
 options?: SecondParameter<typeof getGekV1WalletGetHistoryTransactionsMutator>,) => {
      return getGekV1WalletGetHistoryTransactionsMutator<GetHistoryTrasactionOutListApiResponse>(
      {url: `/gek/v1/wallet/get_history_transactions`, method: 'get',
        params
    },
      options);
    }
  
export type ApiBankClientDetailsResult = NonNullable<Awaited<ReturnType<typeof apiBankClientDetails>>>
export type ApiBankGetCardsResult = NonNullable<Awaited<ReturnType<typeof apiBankGetCards>>>
export type ApiBankGetProgramsResult = NonNullable<Awaited<ReturnType<typeof apiBankGetPrograms>>>
export type ApiTokensNetworksResult = NonNullable<Awaited<ReturnType<typeof apiTokensNetworks>>>
export type ApiApplyCodeResult = NonNullable<Awaited<ReturnType<typeof apiApplyCode>>>
export type ApiCancelCodeResult = NonNullable<Awaited<ReturnType<typeof apiCancelCode>>>
export type ApiCreateTxCodeResult = NonNullable<Awaited<ReturnType<typeof apiCreateTxCode>>>
export type ApiListTxCodesResult = NonNullable<Awaited<ReturnType<typeof apiListTxCodes>>>
export type ApiCodeTxInfoResult = NonNullable<Awaited<ReturnType<typeof apiCodeTxInfo>>>
export type ApiAddressTxInfoResult = NonNullable<Awaited<ReturnType<typeof apiAddressTxInfo>>>
export type ApiAssetsResult = NonNullable<Awaited<ReturnType<typeof apiAssets>>>
export type ApiGetInvestmentsResult = NonNullable<Awaited<ReturnType<typeof apiGetInvestments>>>
export type ApiCreateInvestmentResult = NonNullable<Awaited<ReturnType<typeof apiCreateInvestment>>>
export type ApiReturnInvestmentResult = NonNullable<Awaited<ReturnType<typeof apiReturnInvestment>>>
export type ApiGetRatesResult = NonNullable<Awaited<ReturnType<typeof apiGetRates>>>
export type ApiGetTradeInfoResult = NonNullable<Awaited<ReturnType<typeof apiGetTradeInfo>>>
export type ApiGetOrdersResult = NonNullable<Awaited<ReturnType<typeof apiGetOrders>>>
export type ApiCreateOrderResult = NonNullable<Awaited<ReturnType<typeof apiCreateOrder>>>
export type ApiCancelOrderResult = NonNullable<Awaited<ReturnType<typeof apiCancelOrder>>>
export type ApiListRoomsResult = NonNullable<Awaited<ReturnType<typeof apiListRooms>>>
export type ApiCreateRoomResult = NonNullable<Awaited<ReturnType<typeof apiCreateRoom>>>
export type ApiCloseRoomResult = NonNullable<Awaited<ReturnType<typeof apiCloseRoom>>>
export type ApiPubV1AuthResult = NonNullable<Awaited<ReturnType<typeof apiPubV1Auth>>>
export type ApiGetReferralsResult = NonNullable<Awaited<ReturnType<typeof apiGetReferrals>>>
export type ApiGetAgentCodeResult = NonNullable<Awaited<ReturnType<typeof apiGetAgentCode>>>
export type ApiGetReferralInvestmentsResult = NonNullable<Awaited<ReturnType<typeof apiGetReferralInvestments>>>
export type ApiGetInfoResult = NonNullable<Awaited<ReturnType<typeof apiGetInfo>>>
export type ApiGetBalanceResult = NonNullable<Awaited<ReturnType<typeof apiGetBalance>>>
export type ApiCreateAddressResult = NonNullable<Awaited<ReturnType<typeof apiCreateAddress>>>
export type ApiListAddressesResult = NonNullable<Awaited<ReturnType<typeof apiListAddresses>>>
export type ApiInternalTransferResult = NonNullable<Awaited<ReturnType<typeof apiInternalTransfer>>>
export type ApiCreateWithdrawResult = NonNullable<Awaited<ReturnType<typeof apiCreateWithdraw>>>
export type ApiUpdateTxPartnerInfoResult = NonNullable<Awaited<ReturnType<typeof apiUpdateTxPartnerInfo>>>
export type ApiGetHistoryTransactionsResult = NonNullable<Awaited<ReturnType<typeof apiGetHistoryTransactions>>>
