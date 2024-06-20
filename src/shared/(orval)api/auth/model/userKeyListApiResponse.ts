/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Gekcore broker gate API
 * Generic electronic key multi-cryptocurrency broker wallet platform with a built-in exchange. Gate.<br/>
                    Build version 1.0.2-20240603-1400.7918+1d767e41e02f7ade725004459d7957572da17870<br/><br/>
                    Данные ответов всех API содержаться в поле <b>result</b> JSON-RPC формата.<br/>
                    http ответ сервера всегда имеет код <b>200(OK)</b>, если обработка запроса прошла в штатном режиме.<br/>
                    В случае предсказуемых/обработанных ошибок, поле <b>error</b> содержит код(<b>code</b>) и описание(<b>message</b>) ошибки.<br/>
                    Поле <b>id</b> - используется для проброса идентификатора(<b>nonce</b>) запроса в некоторых критичных сценариях для исключения возможных повторов.<br/><br/>
                    
 * OpenAPI spec version: v1
 */
import type { ErrorObject } from "./errorObject";
import type { UserKey } from "./userKey";

/**
 * Объект-ответ на запрос к API, содержит в себе данные или детали ошибки
 */
export interface UserKeyListApiResponse {
  error?: ErrorObject;
  /** Идентификатор запроса, если он был или 0 */
  id?: number;
  /**
   * Объект-результат: null, если ошибка
   * @nullable
   */
  result?: UserKey[] | null;
}
