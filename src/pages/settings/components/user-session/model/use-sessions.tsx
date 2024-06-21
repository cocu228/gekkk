import { useEffect, useState } from "react";
import { getUnixTime, parseISO } from "date-fns";

import { apiCloseSessions, apiSessions } from "@/shared/(orval)api/auth";
import { UserSession } from "@/shared/(orval)api/auth/model";

export const useSession = () => {
  const [sessions, setSessionsList] = useState<UserSession[]>([]);
  const [sessionClosed, setSessionClosed] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await apiSessions();
        const sortedSeesionsArr: UserSession[] = [...response?.data?.result];
        sortedSeesionsArr.sort((a, b) => getUnixTime(parseISO(b.utc_create)) - getUnixTime(parseISO(a.utc_create)));
        setSessionsList(sortedSeesionsArr);
      } catch (_: unknown) {
        setSessionsList([]);
      }
    })();
  }, [sessionClosed]);

  const closeAllSessions = () => {
    apiCloseSessions().then(() => {
      setSessionClosed(n => !n);
    });
  };

  const closeSession = ({ id }: UserSession) => {
    apiCloseSessions({ id: id }).then(() => {
      setSessionClosed(n => !n);
    });
  };

  return { sessions, closeAllSessions, closeSession };
};
