import { $axios } from "@/shared/lib/(orval)axios";

export const apiPasswordVerify = (phone: string, password: string, token: string, tokenHeaderName: string) =>
  $axios.post(
    "/api/v1/password/verify",
    {
      phone,
      password
    },
    {
      headers: {
        Authorization: phone,
        [tokenHeaderName]: token
      }
    }
  );
