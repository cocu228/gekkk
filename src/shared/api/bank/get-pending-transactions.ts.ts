import {$axios} from "@/shared/lib/(orval)axios";

export interface IPendingTransaction {
    reference?: string;
    date?: Date;
    authenticationMethod?: "PIN" | "OTP" | "BIO";
    pan?: string;
    cardApplication?: string;
    cardExpDate?: string;
    nameOnCard?: string;
    originalAmount?: number;
    originalCurrency?: string;
    convertedAmount?: number;
    convertedCurrency?: string;
    threeDSRequestorAppURL?: string;
    merchant?: {
      id: string;
      countryCode: string;
      url: string;
      name: string;
    },
}

export const apiPendingTransactions = ({headers}) =>
    $axios.get<IPendingTransaction[]>('/api/v1/acs3/transactions', {
        baseURL: import.meta.env.VITE_BANK_API_URL,
        headers: {
            ...headers,
            'Cache-Control': 'no-cache'
        }
    });
