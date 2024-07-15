/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Gekcore broker gate API
 * Generic electronic key multi-cryptocurrency broker wallet platform with a built-in exchange. Gate.<br/>
                    Build version 1.0.2-20240704-1325.9097+5f97bdbb757819e601f7f820670a1596eab520f0<br/><br/>
                    Данные ответов всех API содержаться в поле <b>result</b> JSON-RPC формата.<br/>
                    http ответ сервера всегда имеет код <b>200(OK)</b>, если обработка запроса прошла в штатном режиме.<br/>
                    В случае предсказуемых/обработанных ошибок, поле <b>error</b> содержит код(<b>code</b>) и описание(<b>message</b>) ошибки.<br/>
                    Поле <b>id</b> - используется для проброса идентификатора(<b>nonce</b>) запроса в некоторых критичных сценариях для исключения возможных повторов.<br/><br/>
                    
 * OpenAPI spec version: v1
 */

export type PublicKeyCredentialType = (typeof PublicKeyCredentialType)[keyof typeof PublicKeyCredentialType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PublicKeyCredentialType = {
  "public-key": "public-key"
} as const;
