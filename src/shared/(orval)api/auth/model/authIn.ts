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
import type { AuthenticatorAssertionRawResponse } from './authenticatorAssertionRawResponse';
import type { AuthenticatorAttestationRawResponse } from './authenticatorAttestationRawResponse';

export interface AuthIn {
  /** challenge id from login_options api */
  challenge_id?: number;
  /**
   * Verification code
   * @nullable
   */
  code?: string | null;
  credential?: AuthenticatorAssertionRawResponse;
  credential_new?: AuthenticatorAttestationRawResponse;
  /** @nullable */
  pass_key_flag?: boolean | null;
  /**
   * EdDSA public_key from user+pass
   * @nullable
   */
  public_key?: string | null;
  /**
   * sign EdDSA challenge (user+pass version, not FIDO2)
   * @nullable
   */
  signature?: string | null;
}
