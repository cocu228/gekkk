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
import type { CredentialCreateOptions } from './credentialCreateOptions';

export interface AuthOptions {
  /** /// An ArrayBuffer, TypedArray, or DataView originating from the relying party's server and used as a cryptographic challenge.      /// This value will be signed by the authenticator and the signature will be sent back as part of the AuthenticatorAssertionResponse.signature (available in the response property of the PublicKeyCredential object returned by a successful get() call).     /// */
  challenge?: string | null;
  challenge_id?: number;
  fido2_options?: CredentialCreateOptions;
  /** /// A string that specifies the relying party's identifier (for example "login.example.org"). For security purposes:     /// The calling web app verifies that rpId matches the relying party's origin.     /// The authenticator verifies that rpId matches the rpId of the credential used for the authentication ceremony.     /// If rpId is omitted, it will default to the current origin's domain.     /// */
  rpId?: string | null;
  /** /// This member specifies a time, in milliseconds, that the caller is willing to wait for the call to complete. This is treated as a hint, and MAY be overridden by the client.     /// */
  timeout?: number;
  /** /// This member describes the Relying Party's requirements regarding user verification for the get() operation. Eligible authenticators are filtered to only those capable of satisfying this requirement     /// possible values: preferred, required, discouraged     /// */
  userVerification?: string | null;
}
