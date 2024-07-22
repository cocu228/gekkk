import { CtxRootData } from "@/processes/RootContext";
import { apiApplyCode } from "@/shared/(orval)api";
import { clearCookie, getCookieData } from "@/shared/lib";
import { useContext, useEffect } from "react";

interface IParams {
  children?: JSX.Element;
}

const AgentCodeHandler = ({ children }: IParams) => {
  const { account } = useContext(CtxRootData);

  useEffect(() => {
    (async () => {
      const { agentCode } = getCookieData<{agentCode: string}>();

      if (account?.date_create && agentCode) {
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - new Date(account?.date_create).getTime();
        
        const sevenDays = 7 * 24 * 60 * 60 * 1000; // 7 Days
        
        if (timeDifference <= sevenDays) {
          await apiApplyCode({code: agentCode});
        }

        clearCookie('agentCode');
      }
    })();
  }, [account]);

  return children;
};

export default AgentCodeHandler;
