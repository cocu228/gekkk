import { $axios } from "@/shared/lib/(orval)axios";

export interface IPendingTxStatus {
  status?: string;
  merchantApp?: string;
}

export const apiSetPendingTxStatus = ({ body, headers }) =>
  $axios.post<IPendingTxStatus[]>("/api/v1/acs3/transaction/status", body, {
    baseURL: import.meta.env.VITE_BANK_API_URL,
    headers: {
      ...headers,
      "Cache-Control": "no-cache"
    }
  });
