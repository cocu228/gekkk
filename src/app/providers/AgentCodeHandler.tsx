import { CtxRootData } from "@/processes/RootContext";
import { apiApplyCode } from "@/shared/(orval)api";
import { clearCookie, getCookieData } from "@/shared/lib";
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface IParams {
  children?: JSX.Element;
}

const AgentCodeHandler = ({ children }: IParams) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const agentCodeParam = params.get('code');
  const { account } = useContext(CtxRootData);

  useEffect(() => {
    (async () => {
      const { agentCode: agentCodeCookie } = getCookieData<{agentCode: string}>();
      const agentCode = !!agentCodeCookie
        ? agentCodeCookie
        : !!agentCodeParam
          ? agentCodeParam
          : null;

      if (account?.date_create && agentCode) {
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - new Date(account?.date_create).getTime();
        
        const sevenDays = 7 * 24 * 60 * 60 * 1000; // 7 Days
        
        if (timeDifference <= sevenDays) {
          await apiApplyCode({code: agentCode});
        }

        clearCookie('agentCode');
        
        if (agentCodeParam) {
          navigate('/');
        }
      }
    })();
  }, [account]);

  return children;
};

export default AgentCodeHandler;
