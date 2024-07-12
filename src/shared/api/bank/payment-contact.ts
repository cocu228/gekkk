import { $axios } from "@/shared/lib/(orval)axios";

import { IResErrors, IResCommission, IResResult } from "./types";

import type { PaymentDetails } from "@/shared/(orval)api/gek/model";

export const apiPaymentContact = (
  params: PaymentDetails,
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
