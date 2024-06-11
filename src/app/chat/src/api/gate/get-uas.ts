import { GateApiResponse } from "./types";
import { makeApiRequest } from "../../utils/(cs)axios";

interface IParams {
  phone: string;
  code?: string;
  sessid?: string;
  accountId: string;
  newtoken?: boolean;
}

export interface UasInfo {
  token: string;
  sessid: string;
  timestamp: number;
  expires_in: number;
}

export const apiGetUas = ({
  code,
  phone,
  sessid,
  newtoken,
  accountId
}: IParams) =>
  makeApiRequest<GateApiResponse<UasInfo>>('POST', '/gek/v1/bank/get_uas', null, {
    //@ts-ignore
    baseURL: import.meta.env.VITE_GATE_URL,
    params: {
      code,
      sessid,
      newtoken
    },
    headers: {
        accountId,
        Authorization: phone,
        ApplicationId: "GEKKARD",
        ProductId: "GEKKARD",
    },
    withCredentials: true
  });
