import {ChatConfig} from '../model/types';
import {$ENV_MODE} from "@/shared/lib/helpers";

export const stompConfig = (deviceIdHash: string, chatConfig: ChatConfig) => {
  const brokerURL = import.meta.env[`VITE_SUPPORT_WS_URL_${$ENV_MODE}`];
  const login = chatConfig.phone ? chatConfig.phone : deviceIdHash;

  return {
    brokerURL: brokerURL,
    connectHeaders: {
      login: login,
      passcode: chatConfig.token,
    },
  }
};
