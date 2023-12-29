import $axios, { $AxiosResponse } from "@/shared/lib/(cs)axios";
import { ActiveBonusProgram } from "../bank/deals";

export interface IResProgram {
  startDate: string;
  endDate: string;
  programType: ActiveBonusProgram;
  initBy: number;
}

export const apiGetPrograms = () =>
  $axios.get<$AxiosResponse<Array<IResProgram>>>('/gek/v1/bank/get_programs');
