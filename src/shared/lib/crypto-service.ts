import JSEncrypt from "jsencrypt";
import {AES, enc, PBKDF2, mode, format, pad, HmacSHA256} from 'crypto-js';
import {apiPublicKey, apiRegisterApp, IAppRegistration} from "@/shared/api";

export async function getTransactionSignParams(phone: string, uasToken: string) {
    const {
        publicKey: localPublicKey,
        privateKey: localPrivateKey,
    } = getLocalKeypair();
    const cryptoConfiguration = await getCryptoConfiguration(phone, uasToken, localPublicKey);

    const decrAppPass = decryptRsaMessage(
        cryptoConfiguration.secretePassword,
        localPrivateKey
    );

    if (!decrAppPass) return;

    return ({
        appPass: decrAppPass,
        appUuid: getAppUuid(cryptoConfiguration, decrAppPass),
    });
}

function getAppUuid(cryptoConfiguration: IAppRegistration, decrAppPass: string) {
    const {
        salt,
        appUuid
    } = cryptoConfiguration;

    return decryptAESv2(appUuid, decrAppPass, salt);
}

async function getCryptoConfiguration(
    phone: string,
    uasToken: string,
    localPublicKey: string
): Promise<IAppRegistration> {
    const serverPublicKey = (await apiPublicKey({phoneNumber: phone})).data.publicKey;
    const encryptedLocalPublicKey = encryptRsaMessage(
        serverPublicKey,
        localPublicKey
    );

    if (!encryptedLocalPublicKey) return;

    const {
        data: appRegistration
    } = await apiRegisterApp({
        uasToken: uasToken,
        phoneNumber: phone,
        appPublicKey: encryptedLocalPublicKey
    });

    return appRegistration;
}

function getLocalKeypair(): {
    publicKey: string;
    privateKey: string
} {
    const encrypt = new JSEncrypt({
        default_key_size: '1024'
    });

    const privateKey = encrypt.getPrivateKey()
        .replace('-----BEGIN RSA PRIVATE KEY-----\n', '')
        .replace('-----END RSA PRIVATE KEY-----', '')
        .replace(/\r?\n|\r/g, '');

    const publicKey = encrypt.getPublicKey()
        .replace('-----BEGIN PUBLIC KEY-----\n', '')
        .replace('-----END PUBLIC KEY-----', '')
        .replace(/\r?\n|\r/g, '');

    return ({
        publicKey: publicKey,
        privateKey: privateKey
    });
}

function base64url(source: any): string {
    let encodedSource = enc.Base64.stringify(source);

    return encodedSource
        .replace(/=+$/, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

function decryptRsaMessage(message: string, key: string): string | false {
    const decrypt = new JSEncrypt();
    decrypt.setPrivateKey(key);

    return decrypt.decrypt(message);
}

function encryptRsaMessage(key: string, message: string): string | false {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(key);

    return encrypt.encrypt(message);
}

function decryptAESv2(encryptedMessage: string, password: string, salt: string): string {
    const parsedSalt = enc.Hex.parse(salt);

    const key = PBKDF2(password, parsedSalt, {
        keySize: 256 / 32,
        iterations: 1024
    });

    const iv = enc.Hex.parse(encryptedMessage.substring(0, 32));
    const encrypted = enc.Hex.parse(encryptedMessage.substring(32, encryptedMessage.length));

    const decrypted = AES.decrypt(encrypted.toString(), key, {
        iv,
        mode: mode.CBC,
        padding: pad.Pkcs7,
        format: format.Hex
    });

    return decrypted.toString(enc.Utf8);
}

export function generateJWT(data: any, key: string): string {
    const header = {
        'alg': 'HS256',
        'typ': 'JWT',
    };
    const encodedHeader = base64url(enc.Utf8.parse(JSON.stringify(header)));
    const encodedData = base64url(enc.Utf8.parse(JSON.stringify(data)));
    const token = encodedHeader + '.' + encodedData;
    const signature = base64url(HmacSHA256(token, key));
    return token + '.' + signature;
}
