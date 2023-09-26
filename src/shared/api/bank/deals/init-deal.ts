import $axios from "@/shared/lib/(cs)axios";
import { DealDesc } from "./helpers";


export interface DealConfirmCodeResp {
  errors: [
    {
      code: 449;
      message: 'Confirm with a confirmation code';
      type: '',
      properties: {
        confirmationCodeLength: number,
        confirmationToken: string;
      }
    }
  ];
}


export const apiInitDeal = (
  accountId: string,
  dealId: string,
  action: 'start' | 'stop',
  signal?: AbortSignal,
) => {

  const payload = {
    accountIds: [accountId],
    turn: (action === 'start') ? DealDesc[dealId].start : DealDesc[dealId].end,
  };


  return $axios.post<DealConfirmCodeResp>(`/api/v1/accounts/deals`, payload, {signal});

}


