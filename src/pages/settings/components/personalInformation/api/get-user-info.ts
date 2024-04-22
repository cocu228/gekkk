import {$axios} from "@/shared/lib/(orval)axios";
import { IUserInfo } from "../types/types";
export interface IRespGetUserInfo {
    result: IUserInfo;
};


export const apiGetUserInfo = () =>
    $axios.get<IRespGetUserInfo>('/gek/v1/bank/client_details');
