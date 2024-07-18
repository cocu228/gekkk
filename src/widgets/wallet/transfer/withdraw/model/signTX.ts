import { createHash } from "sha256-uint8array";
import base64url from "base64url";

import { IS_GEKKARD_APP, IS_GEKKWALLET_APP } from "@/shared/lib";

export async function SignTX(signData: string) {
  const hash = createHash().update(signData);
  const chall = hash.digest();
  const rpId = IS_GEKKARD_APP() ? "gekkard" : IS_GEKKWALLET_APP() ? "gekwallet" : "gekkoin";
  const publicKey: PublicKeyCredentialRequestOptions = {
    challenge: chall,
    rpId: `${rpId}.com`,
    allowCredentials: [],
    userVerification: "required"
  };

  // ask browser for credentials (browser will ask connected authenticators)
  let assertedCredential;
  try {
    assertedCredential = await navigator.credentials.get({ publicKey });
  } catch (e) {
    console.log(e);
    return null;
  }

  // Move data into Arrays incase it is super long
  const authData = new Uint8Array(assertedCredential.response.authenticatorData);
  const clientDataJSON = new Uint8Array(assertedCredential.response.clientDataJSON);
  const rawId = new Uint8Array(assertedCredential.rawId);
  const sig = new Uint8Array(assertedCredential.response.signature);
  const userHandle = new Uint8Array(assertedCredential.response.userHandle);
  const data = {
    credential: {
      id: assertedCredential.id,
      rawId: coerceToBase64Url(rawId),
      type: assertedCredential.type,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      extensions: assertedCredential.getClientExtensionResults(),
      response: {
        authenticatorData: coerceToBase64Url(authData),
        clientDataJSON: coerceToBase64Url(clientDataJSON),
        userHandle: userHandle !== null ? coerceToBase64Url(userHandle) : null,
        signature: coerceToBase64Url(sig)
      }
    }
  };
  return base64url(JSON.stringify(data));
}

function coerceToBase64Url(thing) {
  // Array or ArrayBuffer to Uint8Array
  if (Array.isArray(thing)) {
    thing = Uint8Array.from(thing);
  }

  if (thing instanceof ArrayBuffer) {
    thing = new Uint8Array(thing);
  }

  // Uint8Array to base64
  if (thing instanceof Uint8Array) {
    let str = "";
    const len = thing.byteLength;

    for (let i = 0; i < len; i++) {
      str += String.fromCharCode(thing[i]);
    }
    thing = window.btoa(str);
  }

  if (typeof thing !== "string") {
    throw new Error("could not coerce to string");
  }

  // base64 to base64url
  // NOTE: "=" at the end of challenge is optional, strip it off here
  thing = thing.replace(/\+/g, "-").replace(/\//g, "_").replace(/=*$/g, "");

  return thing;
}
