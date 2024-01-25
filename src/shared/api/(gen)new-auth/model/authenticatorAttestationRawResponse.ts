/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * Gekcore broker gate API
 * Generic electronic key multi-cryptocurrency broker wallet platform with a built-in exchange. Gate.<br/>
                    Build version 1.0.2-20240122-1255.5903+dff661a1ef9844ae36d83b0aa1aa317eac259d41<br/><br/>
                    Данные ответов всех API содержаться в поле <b>result</b> JSON-RPC формата.<br/>
                    http ответ сервера всегда имеет код <b>200(OK)</b>, если обработка запроса прошла в штатном режиме.<br/>
                    В случае предсказуемых/обработанных ошибок, поле <b>error</b> содержит код(<b>code</b>) и описание(<b>message</b>) ошибки.<br/>
                    Поле <b>id</b> - используется для проброса идентификатора(<b>nonce</b>) запроса в некоторых критичных сценариях для исключения возможных повторов.<br/><br/>
                    
 * OpenAPI spec version: v1
 */
import type { AuthenticationExtensionsClientOutputs } from './authenticationExtensionsClientOutputs';
import type { ResponseData } from './responseData';
import type { PublicKeyCredentialType } from './publicKeyCredentialType';

export interface AuthenticatorAttestationRawResponse {
  extensions?: AuthenticationExtensionsClientOutputs;
  id?: string | null;
  rawId?: string | null;
  response?: ResponseData;
  type?: PublicKeyCredentialType;
}
