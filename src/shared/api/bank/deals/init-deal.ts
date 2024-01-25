import {AXIOS_INSTANCE as $axios} from "@/shared/lib/(orval)axios";

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
  return $axios.post<DealConfirmCodeResp>(`/api/v1/accounts/deals`, {
    accountIds: [accountId],
    turn
  }, {
    signal
  });
}
