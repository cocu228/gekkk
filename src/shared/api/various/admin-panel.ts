import { $axios, $AxiosResponse } from "@/shared/lib/(orval)axios";

export const apiAdminPanel = () => $axios.get<$AxiosResponse<any>>("/adm");
