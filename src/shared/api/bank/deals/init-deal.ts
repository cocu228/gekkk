import $axios from "@/shared/lib/(cs)axios";


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
  turn: string,
  signal?: AbortSignal,
) => {

  const payload = {
    accountIds: [accountId],
    turn
  };


  return $axios.post<DealConfirmCodeResp>(`/api/v1/accounts/deals`, payload, {signal});

}


