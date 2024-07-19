import * as elliptic from "elliptic";
import { sha256 } from "js-sha256";

import { apiRegisterOptions } from "@/shared/(orval)api";
import { AuthOptions } from "@/shared/(orval)api/auth/model";

import { coerceToBase64Url } from "../helpers";
// import { useUserInfo } from "../../PersonalInformation/model/";

const servPath = import.meta.env.VITE_API_URL;
export async function ChangePass(
  phoneNumber: string,
  newPass: string,
  confirmCode: string,
  makeAssertionOptions: AuthOptions,
  challenge: string
) {
  // @ts-ignore
  makeAssertionOptions.challenge = Uint8Array.from(atob(challenge), c => c.charCodeAt(0));

  const passKey = sha256(`${phoneNumber + newPass + makeAssertionOptions.fido2_options.rp.id}`);

  const EdDSA = elliptic.eddsa;
  const ec = new EdDSA("ed25519");
  //@ts-ignore
  const key = ec.keyFromSecret(passKey);
  const pub = key.getPublic();
  const signature = key.sign(makeAssertionOptions.challenge).toBytes();
  console.log(key.verify(makeAssertionOptions.challenge, signature));

  const data = {
    challenge_id: makeAssertionOptions.challenge_id,
    code: confirmCode,
    public_key: coerceToBase64Url(pub),
    signature: coerceToBase64Url(signature)
  };

  let response;
  try {
    const res = await fetch(`${servPath}auth/v1/register_key`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    response = await res.json();
  } catch (e) {
    throw e;
  }

  console.log("Assertion Object", response);

  // show error
  if (response.result !== "Success") {
    console.log("Error doing assertion");
    //console.log(response.errorMessage);
    return;
  }
}

export async function RegisterOptionsToChangePass(
  setOptions: (option: AuthOptions) => void,
  setChallenge: (challenge: string) => void,
  setSent: (isSend: boolean) => void
) {
  try {
    const options = {
      credentials: "include",
      headers: {
        Accept: "application/json"
      }
    };
    const data = await apiRegisterOptions(null, options);

    const makeAssertionOptions = data.data.result;

    const challenge = makeAssertionOptions.fido2_options.challenge.replace(/-/g, "+").replace(/_/g, "/");

    setOptions(makeAssertionOptions);
    setChallenge(challenge);
    setSent(true);
  } catch (e) {
    console.error(e);
    // const msg = "Something went really wrong";
  }
}
