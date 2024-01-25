import {ActiveBonusProgram} from "../bank/deals";
import {AXIOS_INSTANCE as $axios, $AxiosResponse} from "@/shared/lib/(orval)axios";

export interface IResProgram {
  startDate: string;
  endDate: string;
  programType: ActiveBonusProgram;
  initBy: number;
}

export const apiGetPrograms = () =>
  $axios.get<$AxiosResponse<Array<IResProgram>>>('/gek/v1/bank/get_programs');
