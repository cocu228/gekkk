/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Gekcore broker gate API
 * Generic electronic key multi-cryptocurrency broker wallet platform with a built-in exchange. Gate.<br/>
                    Build version 1.0.2-20240619-0742.8547+6a5580d4fe01c954b62a2503611d6d156dcfffa4<br/><br/>
                    Данные ответов всех API содержаться в поле <b>result</b> JSON-RPC формата.<br/>
                    http ответ сервера всегда имеет код <b>200(OK)</b>, если обработка запроса прошла в штатном режиме.<br/>
                    В случае предсказуемых/обработанных ошибок, поле <b>error</b> содержит код(<b>code</b>) и описание(<b>message</b>) ошибки.<br/>
                    Поле <b>id</b> - используется для проброса идентификатора(<b>nonce</b>) запроса в некоторых критичных сценариях для исключения возможных повторов.<br/><br/>
                    
 * OpenAPI spec version: v1
 */

export type Algorithm = typeof Algorithm[keyof typeof Algorithm];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Algorithm = {
  NUMBER_MINUS_65535: -65535,
  NUMBER_MINUS_259: -259,
  NUMBER_MINUS_258: -258,
  NUMBER_MINUS_257: -257,
  NUMBER_MINUS_47: -47,
  NUMBER_MINUS_39: -39,
  NUMBER_MINUS_38: -38,
  NUMBER_MINUS_37: -37,
  NUMBER_MINUS_36: -36,
  NUMBER_MINUS_35: -35,
  NUMBER_MINUS_8: -8,
  NUMBER_MINUS_7: -7,
} as const;
