import {$axios} from "@/shared/lib/(orval)axios";

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
  turn: string,
  headers: {
    'X-Confirmation-Code': string;
    'X-Confirmation-Token': string;
  } = null
) => {
  
  return $axios.post<DealSuccessStatusResp | DealErrorStatusResp>(`/api/v1/accounts/deals`, {
    accountIds: [accountId],
    turn
  }, {
    headers
  });
} 
