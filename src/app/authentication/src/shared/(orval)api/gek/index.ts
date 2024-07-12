import type {
  GetGekV1WalletGetInfoParams,
  WalletInfoListApiResponse
  //@ts-ignore
} from "./model";
//@ts-ignore
import getGekV1WalletGetInfoMutator from "../../lib/(orval)axios.ts";

type SecondParameter<T extends (...args: any) => any> = T extends (config: any, args: infer P) => any ? P : never;

export const apiGetInfo = (
  params?: GetGekV1WalletGetInfoParams,
  options?: SecondParameter<typeof getGekV1WalletGetInfoMutator>
) => {
  return getGekV1WalletGetInfoMutator<WalletInfoListApiResponse>(
    {
      url: `/gek/v1/wallet/get_info`,
      method: "get",
      params
    },
    options
  );
};
