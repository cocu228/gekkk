type TGetFinalFee = {
  type: {
    number: boolean | null;
    percent: boolean | null;
  };
  value: {
    number: number;
    percent: number;
  };
};
export const getFinalFee = (curFee: number, perFee: number): TGetFinalFee => {
  const result = {
    type: {
      number: false,
      percent: false
    },
    value: {
      number: 0,
      percent: 0
    }
  };

  if (curFee === 0 && perFee === 0) return result;

  result.type.percent = perFee !== 0;
  result.type.number = curFee !== 0;
  result.value.percent = perFee;
  result.value.number = curFee;

  return result;
};

// export const signHeadersGeneration = async (token: string | null = null): Promise<Partial<SignHeaders>> => {
//
//     const header: Pick<SignHeaders, "X-Confirmation-Type"> = {
//         "X-Confirmation-Type": "SIGN",
//     }
//
//     if (token === null) return header
//
//     const {
//         appUuid,
//         appPass
//     } = token ? await getTransactionSignParams() : {appUuid: null, appPass: null};
//
//
//     const jwtPayload = {
//         initiator: getCookieData<{ phone: string }>().phone,
//         confirmationToken: token,
//         exp: Date.now() + 0.5 * 60 * 1000 // + 30sec
//     };
//
//
//     const keys: Omit<SignHeaders, "X-Confirmation-Type"> = {
//         "X-Confirmation-Code": generateJWT(jwtPayload, appPass),
//         "X-Confirmation-Token": token,
//         "X-App-Uuid": appUuid
//     }
//
//     return {
//         ...header,
//         ...keys
//     }
//
// }
