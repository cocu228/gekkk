import { $axios } from "@/shared/lib";

export interface ISignInResult {
  service_code: string;
  success: boolean;
  phone: string;
  token: string;
  expires_in: number;
}

export const apiSignIn = (code: string, sessId: string, phone: string) =>
  $axios.post<ISignInResult>(
    "/api/v1/signin",
    {
      code,
      sessid: sessId
    },
    {
      baseURL: import.meta.env.VITE_BANK_API_URL,
      headers: {
        Authorization: phone
      }
    }
  );
