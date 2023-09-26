import $axios from "@/shared/lib/(cs)axios";
import { AxiosResponse } from "axios";
import { DealDesc } from "./helpers";


export interface DealSuccessStatusResp {
  dealsResponse: [
    {
      accountId: string;
      status: string;
      reason: string | null;
    }
  ];
}


export interface DealErrorStatusResp {
  errors: [
    {
      code: number;
      message: string;
      properties: {
        ErrorApi: string;
      };
    }
  ];
}



export const apiConfirmationDeals = (
  accountId: string,
  dealId: string,
  action: string,
  headers: {
    'X-Confirmation-Code': string;
    'X-Confirmation-Token': string;
  } = null
) => {

  const payload = {
    accountIds: [accountId],
    turn: (action === 'start') ? DealDesc[dealId].start : DealDesc[dealId].end
  };

  return $axios.post<DealSuccessStatusResp | DealErrorStatusResp>(`/api/v1/accounts/deals`, payload, { headers });
} 


