import { getUnixTime, parseISO } from "date-fns";
import { useEffect, useState } from "react";

import { UserLoginLog } from "@/shared/(orval)api/auth/model";
import { apiLoginLog } from "@/shared/(orval)api/auth";

export const useLoginList = () => {
  const [data, setData] = useState<UserLoginLog[]>([]);

  useEffect(() => {
    (async () => {
      const response = await apiLoginLog();
      const sortedLoginArr: UserLoginLog[] = [...response?.data?.result];
      sortedLoginArr.sort((a, b) => getUnixTime(parseISO(b.utc_time)) - getUnixTime(parseISO(a.utc_time)));
      setData(sortedLoginArr);
    })();
  }, []);

  return data;
};
