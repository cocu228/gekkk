/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Gekcore broker API
 * Generic electronic key multi-cryptocurrency broker wallet platform with a built-in exchange.<br/>
                    Build version 2.0.3-20240605-0901.7980+4eac482e08e0bfd32fdfe99000c841c288154201<br/><br/>
                    Данные ответов всех API содержаться в поле <b>result</b> JSON-RPC формата.<br/>
                    http ответ сервера всегда имеет код <b>200(OK)</b>, если обработка запроса прошла в штатном режиме.<br/>
                    В случае предсказуемых/обработанных ошибок, поле <b>error</b> содержит код(<b>code</b>) и описание(<b>message</b>) ошибки.<br/>
                    Поле <b>id</b> - используется для проброса идентификатора(<b>nonce</b>) запроса в некоторых критичных сценариях для исключения возможных повторов.<br/><br/>
                    <b>Полный список кодов ошибок(в самих API могут быть не указаны):</b><br/><b>10001</b> - Wallet not found<br/><b>10002</b> - There is no client with that external_id in the system<br/><b>10003</b> - The wallet is blocked by the bank. Please, contact the bank's support<br/><b>10004</b> - Limiting the maximum number of wallet addresses per network type<br/><b>10005</b> - The account is not in the system<br/><b>10006</b> - Imposible to transfer to the same account<br/><b>10007</b> - Balance not enough<br/><b>10008</b> - Token network not found<br/><b>10009</b> - Room not found<br/><b>10010</b> - Order not found<br/><b>10011</b> - Error cancelling the order<br/><b>10012</b> - Error creating the order<br/><b>10013</b> - Amount must be more than zero<br/><b>10014</b> - The amount is invalid<br/><b>10015</b> - The rate is invalid<br/><b>10016</b> - Error performing transaction<br/><b>10017</b> - Error updating transaction<br/><b>10018</b> - Transaction not found<br/><b>10019</b> - Error cancelling transaction<br/><b>10020</b> - Error creating transaction<br/><b>10021</b> - Transaction for the wallet not found<br/><b>10022</b> - The code has expiredThe code not found<br/><b>10023</b> - Unknown problem<br/><b>10024</b> - The code has been already used<br/><b>10025</b> - Error updating room info<br/><b>10026</b> - Currency not found<br/><b>10027</b> - Code type not supported<br/><b>10028</b> - Invalid assets<br/><b>10029</b> - Key not found<br/><b>10030</b> - Request contains no content<br/><b>10031</b> - Couldn't add session data<br/><b>10032</b> - The address is wrong<br/><b>10033</b> - Couldn't sent transaction to self<br/><b>10034</b> - Internat transfer error<br/><b>10035</b> - The address is within the system but the option auto_inner_transfer is not enabled <br/><b>10036</b> - Bad address<br/><b>10037</b> - Unknown query result<br/><b>10038</b> - The amount is less than minimal allowed for the network<br/><b>10039</b> - The amount is more than maximal allowed for the network<br/><b>10040</b> - The fee is out of date, please try again<br/><b>10041</b> - Not found address transact<br/><b>10042</b> - Amount is more than allowed on this network<br/><b>10043</b> - Withdraw is not allowed on this network<br/><b>10044</b> - Can not withdraw on this network<br/><b>10045</b> - Wallet is deleted<br/><b>10046</b> - Wallet login denied<br/><b>10047</b> - Not found session data<br/><b>10048</b> - Not found template for deposit<br/><b>10049</b> - Can not be exchanged between same currencies<br/><b>10050</b> - empty type_network<br/><b>10051</b> - compeleted address_transact block_num > transact_list.CompliteBlock<br/><b>10052</b> - empty contract_id<br/><b>10053</b> - tx_id is empty<br/><b>10054</b> - The code is invalid<br/><b>10055</b> - Can't open investments linked to that currency<br/><b>10056</b> - Investment not found<br/><b>10057</b> - Investment term is less than the minimum<br/><b>10058</b> - Investment term is more than the maximum<br/><b>10059</b> - Error while creating wallet, try again or contact support<br/><b>10060</b> - Private room creation limit exceeded<br/><b>10061</b> - Room alredy exists<br/><b>10062</b> - Operation forbidden<br/><b>10063</b> - The referral must not be his own agent<br/><b>10064</b> - The code does not match the confirmation code<br/><b>10065</b> - Authentication token has expired<br/><b>10066</b> - Invalid auth token<br/><b>10067</b> - Invalid audience<br/><b>10068</b> - Auth tokent not provided<br/><b>10069</b> - Phone number not provided<br/><b>10070</b> - Invalid issuer<br/><b>10071</b> - income_push_block error<br/><b>10072</b> - Phone number is empty<br/><b>10073</b> - Error sending code<br/><b>10074</b> - Confirmation code is empty<br/><b>10075</b> - Timetick of confirmed transaction is incorrect<br/><b>10076</b> - Transaction has empty From or To<br/><b>10077</b> - Investment amount is less than minimal<br/><b>10078</b> - The reference number is incorrect<br/><b>10079</b> - Unknown problem<br/><b>10080</b> - The string contains unsupported characters<br/><b>10081</b> - Invalid UAS token<br/><b>10082</b> - Fiat tokens are prohibited for internal transfer<br/><b>10083</b> - Receiver wallet not found<br/><b>10084</b> - The wallet belongs to different project<br/><b>10085</b> - Indicate the project<br/><b>10086</b> - Unknown project<br/><b>10087</b> - Operation is not allowed<br/><b>10088</b> - Withdraw amount should be greater than 0 and less than 2147483647<br/><b>11001</b> - Wrong operation signature<br/><b>11002</b> - Request speed limit exceeded
 * OpenAPI spec version: v1
 */

export interface SubmitNewDeal {
  accountId?: number;
  /** @nullable */
  deals?: SubmitNewDeal[] | null;
  /** @nullable */
  status?: string | null;
}
