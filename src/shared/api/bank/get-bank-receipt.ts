import { AxiosRequestConfig } from "axios";

import { $axios } from "@/shared/lib/(orval)axios";

export interface IReceiptData {
  id: string;
  amount: string;
  fee: string;
  paymentType: string;
  fromNumber: string;
  fromName: string;
  fromBank: string;
  toNumber: string;
  toName: string;
  toBank: string;
  clientId: string;
  accountId: string;
  description: string;
  executedAt: string;
  referenceNumber: string;
  operationType: string;
  fromPanDisplay: string;
  status:
    | "PROCESSING"
    | "COMPLETED"
    | "BANK_CANCELLED"
    | "INSUFFICIENT_FUNDS"
    | "REFUND"
    | "HOLD"
    | "WAITING_INFO"
    | "UNKNOWN";
  currency: {
    code: string;
    // label: string;
  };
  paymentToRepeat: {
    // fromPhone: string;
    // toPhone: string;
    // account: string;
    // fromCardPan: string;
    // fromCardId: string;
    // beneficiaryName: string;
    // beneficiaryAccount: string;
    // country: string;
    // city: string;
    // address: string;
    // swiftCode: string;
    // beneficiaryBank: string;
    // intermediaryBank: string;
    // intermediarySwift: string;
    // intermediaryAccount: string;
    // commissionType: string;
    // urgency: string;
    // iban: string;
    // phoneNumber: string;
    // cardNumber: string;
    // currencyCode: string;
    // amount: string;
    // purpose: string;
    // transferDetails: string;
    type:
      | "PAYMENT_CARD"
      | "PAYMENT_PHONE"
      | "PAYMENT_SEPA"
      | "PAYMENT_CRYPTO"
      | "PAYMENT_BY_LINK"
      | "TOPUP_BY_CARD"
      | "PAYMENT_ONE_TOUCH"
      | "PAYMENT_SWIFT";
  };
  // openapiData: {
  //   type: string;
  //   toCard: string;
  //   toPhone: string;
  //   subType: string;
  //   externalOwnerID: string;
  //   fromCardPan: string;
  // };
}

export const apiGetBankReceipt = (referenceNumber: string, params?: AxiosRequestConfig) =>
  $axios.get<IReceiptData>(`/api/v2/operations/${referenceNumber}`, {
    ...params,
    baseURL: import.meta.env.VITE_BANK_API_URL
  });
