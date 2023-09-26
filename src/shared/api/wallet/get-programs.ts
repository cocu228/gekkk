import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";

export interface IResProgram {
  startDate: string;
  endDate: string;
  programType: string;
  initBy: number;
}

export const apiGetPrograms = () =>
  $axios.get<$AxiosResponse<Array<IResProgram>>>('/gek/v1/wallet/get_programs');
