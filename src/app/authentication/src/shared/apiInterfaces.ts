import Swal from 'sweetalert2';

const servPath = "https://gate-dev.gekkard.com:6789/";

/**
 * Объект-ошибки для объекта-ответа
 */
export interface ErrorObject {
    /** Цифровой код ошибки */
    code?: number;
    /** Текстовое сообщение об ошибке */
    readonly message?: string | null;
}
/**
 * Ответы-результаты запросов API в виде текста обозначающие вариант завершения процесса.
Плюс стандартные статические ответы.
 */
export interface ApiResponse<T> {
    error?: ErrorObject | null;
    /** Идентификатор запроса, если он был или 0 */
    id?: number;
    /** Объект-результат: null, если ошибка */
    result?: T | null;
}

/**
* Информация о кошельке пользователя
*/
export interface WalletInfo {
    /** Cчет клиента к которому привязан кошелек, например IBAN или номер счета другого типа */
    account?: string | null;
    /** Идентификатор счета */
    account_id?: string | null;
    /** Текущий выбранный кошелек */
    current?: boolean;
    /** Дата обновления информации по кошельку */
    date_update?: string;
    flags?: number;
    /** Имя клиента или название юридического лица, если счет принадлежит юр лицу */
    name?: string | null;
    /** Номер телефона через который предоставлен доступ к кошельку */
    phone?: string | null;
}

export interface AuthOptions {
    /** An ArrayBuffer, TypedArray, or DataView originating from the relying party's server and used as a cryptographic challenge. 
  This value will be signed by the authenticator and the signature will be sent back as part of the AuthenticatorAssertionResponse.signature (available in the response property of the PublicKeyCredential object returned by a successful get() call). */
    challenge?: string | null;
    challenge_id?: number;
    fido2_options?: CredentialCreateOptions;
    /** A string that specifies the relying party's identifier (for example "login.example.org"). For security purposes:
  The calling web app verifies that rpId matches the relying party's origin.
  The authenticator verifies that rpId matches the rpId of the credential used for the authentication ceremony.
  If rpId is omitted, it will default to the current origin's domain. */
    rpId?: string | null;
    /** This member specifies a time, in milliseconds, that the caller is willing to wait for the call to complete. This is treated as a hint, and MAY be overridden by the client. */
    timeout?: number;
    /** This member describes the Relying Party's requirements regarding user verification for the get() operation. Eligible authenticators are filtered to only those capable of satisfying this requirement
  possible values: preferred, required, discouraged */
    userVerification?: string | null;
    phone?: string | null;
}
export interface CredentialCreateOptions {
    attestation?: AttestationConveyancePreference;
    authenticatorSelection?: any;
    challenge?: string | null;
    errorMessage?: string | null;
    excludeCredentials?: PublicKeyCredentialDescriptor[] | null;
    extensions?: AuthenticationExtensionsClientInputs;
    pubKeyCredParams?: any[] | null;
    rp?: PublicKeyCredentialRpEntity;
    status?: string | null;
    timeout?: number;
    user?: any;
}

export async function GekApi<T>(url: string, init?: RequestInit): Promise<ApiResponse<T>> {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 10000,
        // timerProgressBar: true,
        animation: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });
    Toast.fire({
        icon: "info",
        title: "Request to server..."
    });
    let rez: ApiResponse<T>;

    try {
        var response = await fetch(servPath + url, init);
        rez = response.ok ? await (response.json() as Promise<ApiResponse<T>>) :
            { error: { message: ("Status: " + response.status + ". " + response?.statusText) } } as ApiResponse<T>;
    }
    catch (e) {
        rez = { error: { message: e?.message } } as ApiResponse<T>;
    }
    Toast.close();

    if (!rez.result)
        Swal.fire({
            title: 'Server request error',
            icon: "error",
            text: "Sorry, something went wrong! :(",
            footer: rez.error?.message
        });

    return rez;
}

export const apiGetInfo = async () =>
    await GekApi<WalletInfo[]>('gek/v1/wallet/get_info', {
        credentials: "include",
        headers: {
            'Accept': 'application/json',
        }
    });

export const apiLoginOptions = async () =>
    await GekApi<AuthOptions>('auth/v1/login_options', {
        credentials: "include",
        headers: {
            'Accept': 'application/json',
        }
    });

export const apiLogin = async (data: any) =>
    await GekApi<string>("auth/v1/login", {
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'resolution': ("" + screen.width + "x" + screen.height),
            'device_guid': setAdvCookie()
        }
    });

export function setAdvCookie() {
    let cookieArr = document.cookie.split(";");
    let flag = true;
    let guid;
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if ("device_guid" == cookiePair[0].trim()) {
            flag = false;
            guid = cookiePair[1];
        }
    }
    if (flag) {
        guid = self.crypto.randomUUID();
        document.cookie = "device_guid=" + guid + "; path = /; max-age=" + 365 * 24 * 60 * 60;
    }
    return guid;
}

export const ResetPassword = async (phone: string) =>
    await GekApi<string>('auth/v1/reset_password?phone=' + phone, {
        credentials: "include",
        headers: {
            'Accept': 'application/json'
        }
    });

export const RegisterOptions = async (emailcode?: string | null) =>
    await GekApi<AuthOptions>('auth/v1/register_options' + (emailcode ? ('?code=' + emailcode) : ''), {
        credentials: "include",
        headers: {
            'Accept': 'application/json'
        }
    });

export const RegisterKey = async (data: any) =>
    await GekApi<string>("auth/v1/register_key", {
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

