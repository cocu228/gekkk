import { $axios } from "@/shared/lib/(orval)axios";

import { IResErrors, IResCommission, IResResult } from "./types";

interface IParams {
  account: string;
  beneficiaryName: string | null;
  cardNumber: string | null; // By card number
  fromCardId: string; // From card
  phoneNumber: string; // By phone number
  purpose: string;
  amount: {
    sum: {
      currency: {
        // label: string; Not used
        code: string;
      };
      value: number;
    };
  };

  // Not used
  // sendLinkToRecipient: boolean;
  // transferDetails: string;
}

export const apiPaymentContact = (
  params: Partial<IParams>,
  commission: boolean = false,
  headers: any = null
  // headers: Partial<SignHeaders> = null
) =>
  $axios.post<IResCommission | IResErrors | IResResult>(
    `/api/v1/payment_contact${commission ? "/commission" : ""}`,
    {
      payment_contact: params
    },
    {
      baseURL: import.meta.env.VITE_BANK_API_URL,
      headers: {
        ...headers,
        "X-Confirmation-Type": "SIGN"
      }
    }
  );
