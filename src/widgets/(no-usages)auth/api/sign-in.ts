import { $axios } from "@/shared/lib/(orval)axios";

export const apiSignIn = (code: string, sessId: string, phone: string) =>
  $axios.post(
    "/api/v1/signin",
    {
      code,
      sessid: sessId
    },
    {
      headers: {
        Authorization: phone
      }
    }
  );
