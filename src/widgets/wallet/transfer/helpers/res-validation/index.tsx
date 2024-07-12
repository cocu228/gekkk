import { AxiosResponse } from "axios";

import { IResCommission, IResErrors, IResResult } from "@/shared/api";

const resValidation = (res: AxiosResponse<IResCommission | IResErrors | IResResult, unknown>) =>
  !(res.data as IResErrors)?.errors;

export default resValidation;
