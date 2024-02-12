/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Gekcore broker gate API
 * Generic electronic key multi-cryptocurrency broker wallet platform with a built-in exchange. Gate.<br/>
                    Build version 1.0.2-20240202-0902.6046+448a20a6398e9e01512eae689a544e39eaf22356<br/><br/>
                    Данные ответов всех API содержаться в поле <b>result</b> JSON-RPC формата.<br/>
                    http ответ сервера всегда имеет код <b>200(OK)</b>, если обработка запроса прошла в штатном режиме.<br/>
                    В случае предсказуемых/обработанных ошибок, поле <b>error</b> содержит код(<b>code</b>) и описание(<b>message</b>) ошибки.<br/>
                    Поле <b>id</b> - используется для проброса идентификатора(<b>nonce</b>) запроса в некоторых критичных сценариях для исключения возможных повторов.<br/><br/>
                    
 * OpenAPI spec version: v1
 */
import type { ErrorObject } from './errorObject';
import type { UserSession } from './userSession';

/**
 * Объект-ответ на запрос к API, содержит в себе данные или детали ошибки
 */
export interface UserSessionListApiResponse {
  error?: ErrorObject;
  /** Идентификатор запроса, если он был или 0 */
  id?: number;
  /** Объект-результат: null, если ошибка */
  result?: UserSession[] | null;
}
