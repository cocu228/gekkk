import $axios from "@/shared/lib/(cs)axios";


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

  const payload = {
    accountIds: [accountId],
    turn
  };

  return $axios.post<DealSuccessStatusResp | DealErrorStatusResp>(`/api/v1/accounts/deals`, payload, { headers });
} 


