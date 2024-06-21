import { useEffect, useState } from "react";
import { getUnixTime, parseISO } from "date-fns";

import { apiUserKeys } from "@/shared/(orval)api/auth";
import { UserKey } from "@/shared/(orval)api/auth/model";

export const useUserKeys = (keyChanged: boolean) => {
  const [keys, setKeys] = useState<UserKey[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await apiUserKeys();
        const keysArrCurrent: UserKey[] = [];
        const keysArrSort: UserKey[] = [];

        response?.data?.result.map(el => {
          if (el.current) {
            keysArrCurrent.push(el);
          }
        });
        response?.data?.result.map(el => {
          if (!el.current) {
            keysArrSort.push(el);
          }
        });
        keysArrSort.sort((a, b) => getUnixTime(parseISO(b.utc_create)) - getUnixTime(parseISO(a.utc_create)));
        const newArr = keysArrCurrent.concat(keysArrSort);
        console.log(newArr);

        setKeys(newArr);
      } catch (_: unknown) {
        setKeys([]);
      }
    })();
  }, [keyChanged]);

  return keys;
};
