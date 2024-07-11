import { Dispatch, SetStateAction } from "react";

import { apiRegisterOptions } from "@/shared/(orval)api/auth";

import { coerceToArrayBuffer, coerceToBase64Url } from "../helpers";

export async function RegisterOption(
  setChallenge: Dispatch<
    SetStateAction<{
      newCredential: string;
      id: string;
    }>
  >,
  setSmsSent: Dispatch<SetStateAction<boolean>>
) {
  try {
    const options = {
      credentials: "include",
      headers: {
        Accept: "application/json"
      }
    };

    const data = await apiRegisterOptions(null, options);

    const makeCredentialOptions = data.data.result;

    const fido2_opt = makeCredentialOptions?.fido2_options;

    console.log("Credential Options Object", makeCredentialOptions);

    if (fido2_opt?.status !== "ok") {
      console.log("Error creating credential options");
      console.log(fido2_opt.errorMessage);
      return;
    }

    // Turn the challenge back into the accepted format of padded base64
    fido2_opt.challenge = coerceToArrayBuffer(fido2_opt.challenge) as unknown as string;
    // Turn ID into a UInt8Array Buffer for some reason
    fido2_opt.user.id = coerceToArrayBuffer(fido2_opt.user.id) as unknown as string;

    //makeCredentialOptions.excludeCredentials = makeCredentialOptions.excludeCredentials.map((c) => {
    //    c.id = coerceToArrayBuffer(c.id);
    //    return c;
    //});
    console.log(fido2_opt.authenticatorSelection.authenticatorAttachment);

    if (fido2_opt.authenticatorSelection.authenticatorAttachment === null)
      fido2_opt.authenticatorSelection.authenticatorAttachment = undefined;

    console.log("Credential Options Formatted", fido2_opt);

    try {
      const newCredential = await navigator.credentials.create({
        publicKey: fido2_opt as unknown as PublicKeyCredentialCreationOptions
      });
      console.log("PublicKeyCredential Created", newCredential);

      try {
        // Todo: @ts-ignore
        // @ts-ignore
        setChallenge({
          newCredential: newCredential as unknown as string,
          id: makeCredentialOptions.challenge_id as unknown as string
        });
        setSmsSent(true);
      } catch (e) {
        console.log(e.message ? e.message : e);
      }
    } catch (e) {
      const msg =
        "Could not create credentials in browser. Probably because the username is already registered with your authenticator. Please change username or authenticator.";
      console.error(msg, e);
    }
  } catch (e) {
    const msg = "Something went really wrong";
    console.error(e, msg);
  }
}

async function registerCredentialWithServer(formData: any, changeKeyList: any, setSmsSent: any) {
  const servPath = import.meta.env.VITE_API_URL;
  const response = await fetch(`${servPath}auth/v1/register_key`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(formData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  changeKeyList(n => !n);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  setSmsSent(false);

  return data.result;
}

export async function RegisterKey(
  newCredential: any,
  challenge_id: any,
  code: any,
  changeKeyList: any,
  setSmsSent: any
) {
  // Move data into Arrays incase it is super long
  const attestationObject = new Uint8Array(newCredential.response.attestationObject);
  const clientDataJSON = new Uint8Array(newCredential.response.clientDataJSON);
  const rawId = new Uint8Array(newCredential.rawId);

  const data = {
    challenge_id,
    code,
    credential_new: {
      id: newCredential.id,
      rawId: coerceToBase64Url(rawId),
      type: newCredential.type,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      extensions: newCredential.getClientExtensionResults(),
      response: {
        attestationObject: coerceToBase64Url(attestationObject),
        clientDataJSON: coerceToBase64Url(clientDataJSON),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        transports: newCredential.response.getTransports()
      }
    }
  };

  let response;
  try {
    response = await registerCredentialWithServer(data, changeKeyList, setSmsSent);
  } catch (e) {
    console.log(e);
  }

  console.log("Credential Object", response);

  // show error
  if (response !== "Success") {
    console.log("Error creating credential");
    //console.log(response.errorMessage);
    //showErrorAlert(response.errorMessage);
    return;
  }

  // show success
}
